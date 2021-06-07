import { FirestoreService } from './../services/firestore/firestore.service';
import { AngularFirestore, fromDocRef } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { IonRange } from "@ionic/angular";
import { take } from 'rxjs/operators';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-romeria',
  templateUrl: './romeria.page.html',
  styleUrls: ['./romeria.page.scss'],
})
export class RomeriaPage {

  @ViewChild("range", { static: false }) range: IonRange;
  contentLoaded           = false;
  romeria:        boolean = false;
  finished:       boolean = false;
  currentRomeria: any;

  currTitle:    string;
  currSubtitle: string;
  currOption:   string;
  currOptionId: string;

  private currentUserId:String;
  private romeriaActiva:String;
  kmInicial:            String;
  kmCurr:               String;
  kmTotal:              String;
  currtime:             String;
  horas:                String;
  minutos:              String;
  segundos:             String;
  timeout:              String;
  PasosIncial:          String;
  PasosCurr:            String;
  PasosTotal:           String;
  private proposito:    String;
  private puntoPartida: String;
  private tipoRomeria:  String;
  private Play:         boolean;
  private Pause:        boolean;
  private fin:          String;

  subjet:  string;
  mensaje: string;
  imagen:  string;
  url:     string;
  linkPlayStore: any;
  linkAppStore:  any;

  upNextTitle:    string;
  upNextSubtitle: string;
  favourites:     string[] = [];

  //songs
  currAudio: string;

  //progress bar value
  progress: number = 0;

  //toggle for play/pause button
  isPlaying: boolean = false;

  //track of ion-range touch
  isTouched: boolean = false;

  //ion range texts
  currSecsText: string;
  durationText: string;

  //ion range value
  currRangeTime: number;
  maxRangeValue: number;

  //Current song
  currSong: HTMLAudioElement;

  canciones = [
    {
      title: "La Fe de María", 
      subtitle: "Ítala Rodríguez", 
      audio: "/assets/audio/La Fe De María - Ítala Rodriguez.mp3", 
      cancionId: "9qloM8UqudK2rOFqwvoK",
    },
    {
      title: "Oh Salve Reina y Virgen de Los Ángeles", 
      subtitle: "Álvaro Antonio", 
      audio: "/assets/audio/Oh Salve Reina y Virgen de los Angeles.mp3", 
      cancionId: "afQCE18NlquvaHmrHkmI",
    }
  ]

  constructor(private route: ActivatedRoute,private vibra: Vibration,
    private db: AngularFireDatabase,
    private router: Router,
    private firestoreService: FirestoreService,
    private firestore: AngularFirestore,public nativeAudio: NativeAudio, public platform: Platform, private socialSharing: SocialSharing, private file: File) {
    this.currentRomeria = { empty: true }
    //Simulate data loading in
    setTimeout(() => {
      this.contentLoaded = true
    }, 3000);
  }

  ionViewWillEnter() {
    //Se obtiene el link de la aplicación en la PlayStore
    firebase.firestore().collection('linkApp').doc('PlayStore').onSnapshot((linkSnapshot) => {
      const link = linkSnapshot;
      this.linkPlayStore = link.data().link;
      console.log(this.linkPlayStore);
    });

    //Se obtiene el link de la aplicación en la AppStore
    firebase.firestore().collection('linkApp').doc('AppStore').onSnapshot((linkSnapshot) => {
      const link = linkSnapshot;
      this.linkAppStore = link.data().link;
      console.log(this.linkAppStore);
    });

    this.favourites = [];
    //Se cargan las canciones favoritas del usuario
    this.firestoreService.getFavouriteSongs(firebase.auth().currentUser.uid).pipe(take(1)).subscribe((songsSnapshot) => {
      songsSnapshot.forEach(async (songData: any) => {
        const songId = await songData.payload.doc.data().cancion.id;
        this.favourites.push(songId);
        console.log(this.favourites);
      });
    });

    //Se carga la información de la romeria activa del usuario.
    firebase.firestore().collection('romerias').doc(firebase.auth().currentUser.uid).onSnapshot((romeriasSnapshot) => {
      const info = romeriasSnapshot.data();
      this.currentRomeria =
    {
      romeriaActiva: info.romeriaActiva,
      play: info.play,
      pause: info.pause,
      finalizada: info.finalizada,
      tipoRomeria: info.tipoRomeria,
      proposito: info.proposito,
      puntoPartida: info.puntoPartida,
      progreso: info.progreso,
      kmConteo: info.kmConteo,
      kmRestantes: info.kmRestantes,
      kmTotal: info.kmTotal,
      timeConteo: info.timeConteo,
      horas: info.horas,
      minutos: info.minutos,
      segundos: info.segundos,
      timeTotalMs: info.timeTotalMs,
      pasosConteo: info.pasosConteo,
      pasosRestantes: info.pasosRestantes,
      pasosTotal: info.pasosTotal
    }
    this.puntoPartida = this.currentRomeria.puntoPartida;
    this.progress = this.currentRomeria.progreso;
    this.proposito = this.currentRomeria.proposito;
    this.romeriaActiva = this.currentRomeria.romeriaActiva;
    this.kmInicial = this.currentRomeria.kmConteo;
    this.kmCurr = this.currentRomeria.kmRestantes;
    this.kmTotal = this.currentRomeria.kmTotal;
    this.currtime = this.currentRomeria.timeConteo;
    this.horas = this.currentRomeria.horas;
    this.minutos = this.currentRomeria.minutos;
    this.segundos = this.currentRomeria.segundos;
    this.timeout = this.currentRomeria.timeTotalMs;
    this.PasosIncial = this.currentRomeria.pasosConteo;
    this.PasosCurr = this.currentRomeria.pasosRestantes;
    this.PasosTotal = this.currentRomeria.pasosTotal;
    });

    //Carga los datos de la romería actual de usuario
    var docRef = firebase.firestore().collection('romerias').doc(firebase.auth().currentUser.uid);
    docRef.onSnapshot((async (doc) => {
      if (doc.exists) {
        firebase.firestore().collection('romerias').doc(firebase.auth().currentUser.uid).onSnapshot((romeriasSnapshot) => {
          const info = romeriasSnapshot.data();
          console.log(info);
          //Se obtienen los datos de la romería actual de usuario
          this.romeria = info.romeriaActiva;
          this.finished = info.finalizada;
          this.Play = info.play;
          this.Pause = info.pause;
          this.tipoRomeria = info.tipoRomeria;
  
          console.log("romeria:" + this.romeria);
          console.log("finalizada:" + this.finished);
  
          if (info.finalizada == false) {
            this.currentRomeria =
            {
              romeriaActiva: info.romeriaActiva,
              finalizada: info.finalizada
            }
            if (this.currentRomeria.romeriaActiva == true) {
              this.romeria = true;
              console.log(this.finished);
              console.log(this.romeria);
              if (this.currentRomeria.romeriaActiva == true) {
                this.finished = false;
              } else {
                this.finished = true;
              }
            }
            else {
              this.romeria = false;
              console.log(this.finished);
              console.log(this.romeria);
              if (this.currentRomeria.romeriaActiva == true) {
                this.finished = false;
              } else {
                this.finished = true;
              }
            }
          }
        });
      } else {
        this.romeria = false;
        this.finished = false;
      }
    }))
  }

  newRomeria() {
    //this.db.database.ref('user/'+this.currentUserId).set({romeria: this.romeria});
    //this.db.database.ref('user/'+this.currentUserId);
    //console.log(this.romeria);
    //this.db.database.ref('user/'+this.currentUserId).push({romeria: this.romeria});
    //var newPostKey = this.db.database.ref('user/'+this.currentUserId).child('romeria').push().key;
    //var updates = {};
    //updates['/romeria/' + newPostKey] = this.data;

    this.vibracion();
    this.router.navigate(['/nueva-romeria']);
  }

  //Lleva al usuario a la ventana continuar-romería
  continuarRomeria() {
    this.vibracion();
    if (this.tipoRomeria == "pasos") {
      if (this.Play == true){
        this.Play = false;
        //update romerías
        const userId = firebase.auth().currentUser.uid;
        const refUser = this.firestore.collection('usuarios').doc(userId);
        const updatedData = {
          usuario: refUser.ref,
          play: this.Play,
          pause: this.Pause,
          romeriaActiva: this.romeriaActiva,
          finalizada: this.finished,
          tipoRomeria: this.tipoRomeria,
          proposito: this.proposito,
          puntoPartida: this.puntoPartida,
          progreso: this.progress,
          kmConteo: this.kmInicial,
          kmRestantes: this.kmCurr,
          kmTotal: this.kmTotal,
          timeConteo: this.currtime,
          horas: this.horas,
          minutos: this.minutos,
          segundos: this.segundos,
          timeTotalMs: this.timeout,
          pasosConteo: this.PasosIncial,
          pasosRestantes: this.PasosCurr,
          pasosTotal: this.PasosTotal
        };
        this.firestoreService.updateRomeria(userId, updatedData);
        this.router.navigate(['/continuar-romeria']);
      } else {
        this.router.navigate(['/continuar-romeria']);
      }
    } else {
      if (this.Play == true && this.Pause == false){
        this.Pause = true;
        //update romerias
        const userId = firebase.auth().currentUser.uid;
        const refUser = this.firestore.collection('usuarios').doc(userId);
        const updatedData = {
          usuario: refUser.ref,
          play: this.Play,
          pause: this.Pause,
          romeriaActiva: this.romeriaActiva,
          finalizada: this.finished,
          tipoRomeria: this.tipoRomeria,
          proposito: this.proposito,
          puntoPartida: this.puntoPartida,
          progreso: this.progress,
          kmConteo: this.kmInicial,
          kmRestantes: this.kmCurr,
          kmTotal: this.kmTotal,
          timeConteo: this.currtime,
          horas: this.horas,
          minutos: this.minutos,
          segundos: this.segundos,
          timeTotalMs: this.timeout,
          pasosConteo: this.PasosIncial,
          pasosRestantes: this.PasosCurr,
          pasosTotal: this.PasosTotal
        };
        this.firestoreService.updateRomeria(userId, updatedData);
        this.router.navigate(['/continuar-romeria']);
      } else {
        this.router.navigate(['/continuar-romeria']);
      }
    }
  }

  //Lleva al usuario a la ventana romeria-perfil
  miRomeria() {
    this.vibracion();
    this.router.navigate(['/romeria-perfil'],
    {
      queryParams:{
        page:'romería'
      }
    });
  }

  //Elimina la romería actual de
  deleteRomeria() {
    this.vibracion();
    this.finished = false;
    this.firestoreService.deleteRomeria(firebase.auth().currentUser.uid);
    this.router.navigate(['/romeria']);
  }

  //Función para agregar o remover las devociones favoritas del usuario.
  addOrRemoveFavourite() {
    var userId = firebase.auth().currentUser.uid;
    console.log("inside song");
    console.log(this.currOptionId);
    console.log(this.favourites);
    if (this.favourites.includes(this.currOptionId)) {
      this.firestoreService.removeFavouriteSong(userId, this.currOptionId);
      this.favourites = this.favourites.filter(favId => favId !== this.currOptionId);
    console.log(this.favourites);
    }
    else {
      this.vibracion();
      this.firestoreService.addFavouriteSong(userId, this.currOptionId);
      this.favourites.push(this.currOptionId);
      console.log(this.favourites);
    }

  }

  //Se muestra la canción
  openPlayer(title: string, subTitle: string, song: string, songId: string) {
    this.hideOptionsModal();
    this.currOptionId = songId;
    console.log(this.currOptionId);
    console.log(this.favourites);
    this.currOption = 'song';
    //If a song plays,stop that
    if (this.currSong != null) {
      this.currSong.pause();

    }

    //open full player view
    document.getElementById("playeRo").style.display = "block";
    //set current song details
    this.currTitle = title;
    this.currSubtitle = subTitle;

    //Current song audio
    this.currSong = new Audio(song);

    this.currSong.play().then(() => {
      //Total song duration
      this.durationText = this.sToTime(this.currSong.duration);
      //set max range value (important to show proress in ion-range)
      this.maxRangeValue = Number(this.currSong.duration.toFixed(2).toString().substring(0, 5));

      //set upnext song
      //get current song index
      var index = this.canciones.findIndex(x => x.title == this.currTitle);

      //if current song is the last one then set first song info for upnext song
      if ((index + 1) == this.canciones.length) {
        this.upNextTitle = this.canciones[0].title;
        this.upNextSubtitle = this.canciones[0].subtitle;
      }
      //else set next song info for upnext song
      else {
        this.upNextTitle = this.canciones[index + 1].title;
        this.upNextSubtitle = this.canciones[index + 1].subtitle;
      }
      this.isPlaying = true;
    })

    this.currSong.addEventListener("timeupdate", () => {
      //update some infos as song plays on

      //if ion-range not touched the do update 
      if (!this.isTouched) {

        //update ion-range value
        this.currRangeTime = Number(this.currSong.currentTime.toFixed(2).toString().substring(0, 5));
        //update current seconds text
        this.currSecsText = this.sToTime(this.currSong.currentTime);
        //update progress bar (in miniize view)
        this.progress = (Math.floor(this.currSong.currentTime) / Math.floor(this.currSong.duration));

        //if song ends,play next song
        if (this.currSong.currentTime == this.currSong.duration) {
          this.playNext();
        }
      }
    });
  }

  sToTime(t) {
    return this.padZero(parseInt(String((t / (60)) % 60))) + ":" +
      this.padZero(parseInt(String((t) % 60)));
  }

  padZero(v) {
    return (v < 10) ? "0" + v : v;
  }

  playNext() {
    this.vibracion();
    var index = this.canciones.findIndex(x => x.title == this.currTitle);

    if ((index + 1) == this.canciones.length) {
      this.currOption = 'song';
      this.openPlayer(this.canciones[0].title, this.canciones[0].subtitle, this.canciones[0].audio, this.canciones[0].cancionId);
    }
    else {
      var nextIndex = index + 1;
      this.openPlayer(this.canciones[nextIndex].title, this.canciones[nextIndex].subtitle, this.canciones[nextIndex].audio, this.canciones[nextIndex].cancionId);
    }
  }

  //play previous song
  playPrev() {
    this.vibracion();
    //get current song index
    var index = this.canciones.findIndex(x => x.title == this.currTitle);

    //if current song is the first one, then play last song
    if (index == 0) {
      var lastIndex = this.canciones.length - 1;
      this.currOption = 'song';
      this.openPlayer(this.canciones[lastIndex].title, this.canciones[lastIndex].subtitle, this.canciones[lastIndex].audio, this.canciones[lastIndex].cancionId);
    }
    // else play previous song
    else {
      var prevIndex = index - 1;
      this.currOption = 'song';
      this.openPlayer(this.canciones[prevIndex].title, this.canciones[prevIndex].subtitle, this.canciones[prevIndex].audio, this.canciones[prevIndex].cancionId);
    }
  }

  //pause current song
  pause() {
    this.vibracion();
    this.currSong.pause();
    this.isPlaying = false;
  }

  //play currently paused song
  play() {
    this.vibracion();
    this.currSong.play();
    this.isPlaying = true;
  }

  //Close current playing song and reset current song info
  back() {
    this.vibracion();
    this.currTitle = "";
    this.currSubtitle = "";
    this.progress = 0;
    this.currSong.pause();
    this.isPlaying = false;
  }

  //On touching ion-range
  touchStart() {
    this.isTouched = true;
    this.currRangeTime = Number(this.range.value);
  }

  //On moving ion-range
  //Update current seconds text
  touchMove() {
    this.currSecsText = this.sToTime(this.range.value);
  }

  //On touch released/end
  touchEnd() {
    this.isTouched = false;
    this.currSong.currentTime = Number(this.range.value);
    this.currSecsText = this.sToTime(this.currSong.currentTime)
    this.currRangeTime = Number(this.currSong.currentTime.toFixed(2).toString().substring(0, 5));

    if (this.isPlaying) {
      this.currSong.play();
    }
  }

  //Se muestra un popUp de la canción seleccionada
  showSongsOptionsModal(title: string, subtitle: string, audio: string, optId: string) {
    this.currTitle = title;
    this.currSubtitle = subtitle;
    this.currAudio = audio;
    this.currOption = "song";
    this.currOptionId = optId;
    console.log(this.currOptionId);
    console.log(this.favourites);
    document.getElementById("dots-modal-ro").style.display = "block";
    document.getElementById("headRo").style.filter = "blur(2px)";
    document.getElementById("fin").style.filter = "blur(2px)";
    document.getElementById("footRo").style.filter = "blur(2px)";
  }

  //Se oculta el popUp 
  hideOptionsModal() {
    document.getElementById("dots-modal-ro").style.display = "none";
    document.getElementById("headRo").style.filter = "none";
    document.getElementById("fin").style.filter = "none";
    document.getElementById("footRo").style.filter = "none";
  }

  share(titulo) {
    if (this.platform.is("android")) {
      this.subjet = this.currTitle;
      this.mensaje = "Escuchá " + this.currTitle + " en la app de Mi Negrita: ";
      this.imagen = `${this.file.applicationDirectory}assets/imágenes/Logo.png`;
      this.url = this.linkPlayStore;
      console.log(this.url);
      var options = {
        message: this.mensaje,
        subjet: this.subjet,
        files: this.imagen,
        url: this.url,
        chooserTitle: this.subjet
      }
      this.socialSharing.shareWithOptions(options);
    } else if (this.platform.is("ios")) {
      this.subjet = this.currTitle;
      this.mensaje = "Escuchá " + this.currTitle + " en la app de Mi Negrita: ";
      this.imagen = `${this.file.applicationDirectory}assets/imágenes/Logo.png`;
      this.url = this.linkAppStore;
      console.log(this.url);
      var options = {
        message: this.mensaje,
        subjet: this.subjet,
        files: this.imagen,
        url: this.url,
        chooserTitle: this.subjet
      }
      this.socialSharing.shareWithOptions(options);
    }
    //this.socialSharing.shareViaFacebook(this.mensaje, this.imagen, this.url);
    //this.socialSharing.share(this.mensaje, this.subjet, this.imagen, this.url);
  }

  //Se oculta la oración
  hidePlayer() {
    document.getElementById("playeRo").style.display = "none";
    this.back();
  }

  see(){
    this.vibracion();
    this.openPlayer(this.currTitle, this.currSubtitle, this.currAudio, this.currOptionId);
    console.log(this.currOptionId);
    console.log(this.favourites);
  }

  vibracion(){
    if (this.platform.is("android")) {
      this.vibra.vibrate([50]);
    }
  }
}
