import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { IonRange } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Component, ViewChild } from '@angular/core';
import * as firebase from 'firebase';
import { FirestoreService } from '../services/firestore/firestore.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {

  @ViewChild("range", { static: false }) range: IonRange;

  contentLoaded = false;
  romeriaData:    any;
  romeria       = false;
  pasos         = true;

  cerohor = '';
  ceromin = '';
  ceroseg = '';
  horas   = 0;
  minutos = 0;

  name:         string;
  lastName:     string;
  avatar:       string;
  exvotos:      string[];
  intenciones:  string[];
  currOptionId: string;
  bookable:     boolean = true;

  currTitle:    string;
  currSubtitle: string;
  currText:     string;

  upNextText:     string;
  upNextTitle:    string;
  upNextSubtitle: string;

  //songs
  currRoute:  string;
  currOption: string;

  currAudio: string;

  //progress bar value
  progressSong: number = 0;

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

  subjet:        string;
  mensaje:       string;
  imagen:        string;
  url:           string;
  linkPlayStore: any;

  eventos:       any;
  favourites:    string[] = [];
  currNombre:    string;
  currDireccion: string;
  currFecha:     string;
  currInfo:      string;
  currReserva:   string;
  currLink:      string;

  oraciones:    any;
  meditaciones: any;
  canciones:    any;
  lecturas:     any;

  currentRomeria: any;
  currTime:       any;
  timeout:        any;
  progress:       Number;

  constructor(private firestoreService: FirestoreService, private firestore: AngularFirestore, public nativeAudio: NativeAudio, private socialSharing: SocialSharing, public Toast: ToastController) {
    this.name           = "";
    this.lastName       = "";
    this.avatar         = "";
    this.exvotos        = [];
    this.intenciones    = [];
    this.eventos        = [];
    this.oraciones      = [];
    this.lecturas       = [];
    this.canciones      = [];
    this.meditaciones   = [];
    this.currentRomeria = { empty: true }
    this.romeriaData    = { empty: true }
    this.progress       = 0;
    //Simulate data loading in
    setTimeout(() => {
      this.contentLoaded = true
    }, 2000);
  }

  ionViewWillEnter() {
    this.loadUserData();
    this.loadFavourites();
  }

  loadUserData() {
    //Se obtiene el link de la aplicación de la tienda de PlayStore desde la base de datos
    firebase.firestore().collection('linkApp').doc('PlayStore').onSnapshot((linkSnapshot) => {
      const link = linkSnapshot;
      this.linkPlayStore = link.data().link;
      console.log(this.linkPlayStore);
    });

    //Se carga la información del usuario logeado
    this.firestoreService.getUser(firebase.auth().currentUser.uid).pipe(take(1)).subscribe((userSnapshot) => {
      const userData = userSnapshot.payload.data();
      this.getUserInfo(userData);
    });

    //Se carga la información de la romerias realizadas del usuario.
    firebase.firestore().collection('romeriaxusuario').doc(firebase.auth().currentUser.uid).onSnapshot((romSnapshot) => {
      const romeriaData = romSnapshot.data();
      this.getRomeriaData(romeriaData);
    });

    /*this.firestoreService.getRomeriaXUser(firebase.auth().currentUser.uid).pipe(take(1)).subscribe((romSnapshot) => {
      const romeriaData = romSnapshot.payload.data();
      this.getRomeriaData(romeriaData);
    });*/

    //Se obtiene las oraciones favoritas del usuario
    this.firestoreService.getFavouritePrayers(firebase.auth().currentUser.uid).pipe(take(1)).subscribe((prayersSnapshot) => {
      this.oraciones = [];
      prayersSnapshot.forEach(async (prayerData: any) => {
        const prayer = await prayerData.payload.doc.data().oracion.get();
        this.oraciones.push(
          {
            title: prayer.data().title,
            subtitle: prayer.data().subtitle,
            dias: prayer.data().dias,
            route: prayer.data().route,
            time: prayer.data().time,
            id: prayer.id
          }
        );
      });
    });

    //Se obtienen las lecturas favoritas del usuario
    this.firestoreService.getFavouriteReadings(firebase.auth().currentUser.uid).pipe(take(1)).subscribe((readingsSnapshot) => {
      this.lecturas = [];
      readingsSnapshot.forEach(async (readingData: any) => {
        const reading = await readingData.payload.doc.data().lectura.get();
        this.lecturas.push(
          {
            title: reading.data().title,
            subtitle: reading.data().subtitle,
            text: reading.data().text,
            id: reading.id
          }
        );
      });
    });

    //Se obtienen las canciones favoritas del usuario
    this.firestoreService.getFavouriteSongs(firebase.auth().currentUser.uid).pipe(take(1)).subscribe((songsSnapshot) => {
      this.canciones = [];
      songsSnapshot.forEach(async (songData: any) => {
        const song = await songData.payload.doc.data().cancion.get();
        this.canciones.push(
          {
            title: song.data().title,
            subtitle: song.data().subtitle,
            time: song.data().time,
            audio: song.data().audio,
            id: song.id
          }
        );
      });
    });

    //Se obtienen las meditaciones favoritas del usuario
    this.firestoreService.getFavouriteMeditations(firebase.auth().currentUser.uid).pipe(take(1)).subscribe((meditationsSnapshot) => {
      this.meditaciones = [];
      meditationsSnapshot.forEach(async (meditationData: any) => {
        const meditation = await meditationData.payload.doc.data().meditacion.get();
        this.meditaciones.push(
          {
            title: meditation.data().title,
            text: meditation.data().text,
            id: meditation.id
          }
        ); console.log(this.meditaciones);
      });
    });

    //Se obtienen los eventos favoritos del usuario
    this.firestoreService.getFavouriteEvents(firebase.auth().currentUser.uid).pipe(take(1)).subscribe((eventsSnapshot) => {
      this.eventos = [];
      eventsSnapshot.forEach(async (eventData: any) => {
        const evento = await eventData.payload.doc.data().evento.get();
        this.eventos.push(
          {
            nombre: evento.data().nombre,
            direccion: evento.data().direccion,
            fecha: evento.data().fecha,
            dia: evento.data().dia,
            mes: evento.data().mes,
            hora: evento.data().hora,
            informacion: evento.data().informacion,
            reserva: evento.data().reserva,
            link: evento.data().link,
            eventoId: evento.id
          }
        );
      });
    });

    //Se carga la información de la romeria activa del usuario.
    if (this.firestore.collection('romerias').doc(firebase.auth().currentUser.uid)) {
      firebase.firestore().collection('romerias').doc(firebase.auth().currentUser.uid).onSnapshot((romeriasSnapshot) => {
        const info = romeriasSnapshot.data();
        this.getRomeriaInfo(info);
      });
      /*this.firestoreService.getRomerias(firebase.auth().currentUser.uid).pipe(take(1)).subscribe((romeriasSnapshot) => {
        const info = romeriasSnapshot.payload.data();
        this.getRomeriaInfo(info);
      });*/
    }
  }

  loadFavourites() {
    this.favourites = [];

    //Se cargan los eventos favoritos del usuario
    this.firestoreService.getFavouriteEvents(firebase.auth().currentUser.uid).pipe(take(1)).subscribe((eventSnapshot) => {
      eventSnapshot.forEach(async (eventData: any) => {
        const eventId = await eventData.payload.doc.data().evento.id;
        this.favourites.push(eventId);
      });
    });

    //Se cargan las oraciones favoritos del usuario
    this.firestoreService.getFavouritePrayers(firebase.auth().currentUser.uid).pipe(take(1)).subscribe((prayersSnapshot) => {
      prayersSnapshot.forEach(async (prayerData: any) => {
        const prayerId = await prayerData.payload.doc.data().oracion.id;
        this.favourites.push(prayerId);
      });
    });

    //Se cargan las lecturas favoritos del usuario
    this.firestoreService.getFavouriteReadings(firebase.auth().currentUser.uid).pipe(take(1)).subscribe((readingsSnapshot) => {
      readingsSnapshot.forEach(async (readingData: any) => {
        const readingId = await readingData.payload.doc.data().lectura.id;
        this.favourites.push(readingId);
      });
    });

    //Se cargan las canciones favoritos del usuario
    this.firestoreService.getFavouriteSongs(firebase.auth().currentUser.uid).pipe(take(1)).subscribe((songsSnapshot) => {
      songsSnapshot.forEach(async (songData: any) => {
        const songId = await songData.payload.doc.data().cancion.id;
        this.favourites.push(songId);
      });
    });

    //Se cargan las meditaciones favoritos del usuario
    this.firestoreService.getFavouriteMeditations(firebase.auth().currentUser.uid).pipe(take(1)).subscribe((meditationsSnapshot) => {
      meditationsSnapshot.forEach(async (meditationData: any) => {
        const meditationId = await meditationData.payload.doc.data().meditacion.id;
        this.favourites.push(meditationId);
      });
    });

    console.log(this.favourites);
  }

  //Se obtiene la información de la romeria activa del usuario.
  getRomeriaInfo = (info: any) => {
    this.currentRomeria =
    {
      puntoPartida: info.puntoPartida,
      TipoRomeria: info.tipoRomeria,
      progreso: info.progreso,
      pasosConteo: info.pasosConteo,
      pasosRestantes: info.pasosRestantes,
      pasosTotal: info.pasosTotal,
      timeConteo: info.timeConteo,
      timeTotalMs: info.timeTotalMs,
      horas: info.horas,
      minutos: info.minutos
    }

    if (!info.finalizada) {
      this.currentRomeria =
      {
        //conteo: info.conteo,
        //faltante: info.faltante,
        //partida: info.partida,
        //medida: info.medida
        puntoPartida: info.puntoPartida,
        TipoRomeria: info.tipoRomeria,
        progreso: info.progreso,
        pasosConteo: info.pasosConteo,
        pasosRestantes: info.pasosRestantes,
        pasosTotal: info.pasosTotal,
        timeConteo: info.timeConteo,
        timeTotalMs: info.timeTotalMs,
        horas: info.horas,
        minutos: info.minutos
      }
      console.log(this.currentRomeria.timeTotalMs);
      if (this.currentRomeria.TipoRomeria == "horas") {
        this.pasos = false;
        this.calcTimeProgress();
      } else {
        this.pasos = true;
        this.calcStepsProgress();
      }
    }
  }

  //Se obtiene la información de la romerias realizadas del usuario.
  getRomeriaData = (info: any) => {
    this.romeriaData = {
      romeriaActiva: info.romeriaActiva,
    }
    this.romeria = this.romeriaData.romeriaActiva;
    console.log(this.romeria);
    console.log(this.romeriaData.romeriaActiva);
  }

  //Se obtiene la informción del usuario logeado
  getUserInfo = (info: any) => {
    this.name = info.name;
    this.lastName = info.lastname;
    this.avatar = info.avatar;
    this.exvotos = info.exvotos;
    this.intenciones = info.intenciones;
  }

  //Muestra la lectura
  viewLectura(title: string, subtitle: string, text: string) {
    this.hideOptionsModal();
    this.currTitle = title;
    this.currSubtitle = subtitle;
    this.currText = text;
    this.currText = this.currText.split("\\n\\n").join("\n\n");

    var index = this.lecturas.findIndex(x => x.title == this.currTitle);

    if ((index + 1) == this.lecturas.length) {
      this.upNextTitle = this.lecturas[0].title;
      this.upNextSubtitle = this.lecturas[0].subtitle;
      this.upNextText = this.lecturas[0].text;
    }

    else {
      this.upNextTitle = this.lecturas[index + 1].title;
      this.upNextSubtitle = this.lecturas[index + 1].subtitle;
      this.upNextText = this.lecturas[index + 1].text;
    }

    document.getElementById("lecturaPer").style.display = "block";
  }
  
  //Se oculta la lectura
  hideLectura() {
    document.getElementById("lecturaPer").style.display = "none";
  }

  //Muestra la siguiente lectura
  showNextReading() {
    var index = this.lecturas.findIndex(x => x.title == this.currTitle);

    if ((index + 1) == this.lecturas.length) {
      this.viewLectura(this.lecturas[0].title, this.lecturas[0].subtitle, this.lecturas[0].text);
    }
    else {
      var nextIndex = index + 1;
      this.viewLectura(this.lecturas[nextIndex].title, this.lecturas[nextIndex].subtitle, this.lecturas[nextIndex].text);
    }
  }

  //Muestra la meditación
  viewMeditacion(title: string, text: string) {
    this.hideOptionsModal();
    this.currTitle = title;
    this.currText = text;
    this.currText = this.currText.split("\\n\\n").join("\n\n");

    var index = this.meditaciones.findIndex(x => x.title == this.currTitle);


    if ((index + 1) == this.meditaciones.length) {
      this.upNextTitle = this.meditaciones[0].title;
      this.upNextText = this.meditaciones[0].text;
    }

    else {
      this.upNextTitle = this.meditaciones[index + 1].title;
      this.upNextText = this.meditaciones[index + 1].text;
    }

    document.getElementById("meditacionPer").style.display = "block";
  }

  //Se oculta la meditación
  hideMeditation() {
    document.getElementById("meditacionPer").style.display = "none";
  }

  //Se muestra la siguiente meditación
  showNextMeditation() {
    var index = this.meditaciones.findIndex(x => x.title == this.currTitle);

    if ((index + 1) == this.meditaciones.length) {
      this.viewMeditacion(this.meditaciones[0].title, this.meditaciones[0].text);
    }
    else {
      var nextIndex = index + 1;
      this.viewMeditacion(this.meditaciones[nextIndex].title, this.meditaciones[nextIndex].text);
    }
  }

  //Se oculta la oración
  hidePlayer() {
    document.getElementById("playerPer").style.display = "none";
    this.back();
  }

  //Se muestra la canción
  listenSong(title: string, subTitle: string, song: string, songId: string) {
    this.hideOptionsModal();
    this.currOptionId = songId;
    this.currOption = 'song';
    //If a song plays,stop that
    if (this.currSong != null) {
      this.currSong.pause();

    }

    //open full player view
    document.getElementById("playerPer").style.display = "block";
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
        this.progressSong = (Math.floor(this.currSong.currentTime) / Math.floor(this.currSong.duration));

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
    var index = this.canciones.findIndex(x => x.title == this.currTitle);

    if ((index + 1) == this.canciones.length) {
      this.currOption = 'song';
      this.listenSong(this.canciones[0].title, this.canciones[0].subtitle, this.canciones[0].audio, this.canciones[0].id);
    }
    else {
      var nextIndex = index + 1;
      this.listenSong(this.canciones[nextIndex].title, this.canciones[nextIndex].subtitle, this.canciones[nextIndex].audio, this.canciones[nextIndex].id);
    }
  }

  //play previous song
  playPrev() {
    //get current song index
    var index = this.canciones.findIndex(x => x.title == this.currTitle);

    //if current song is the first one, then play last song
    if (index == 0) {
      var lastIndex = this.canciones.length - 1;
      this.currOption = 'song';
      this.listenSong(this.canciones[lastIndex].title, this.canciones[lastIndex].subtitle, this.canciones[lastIndex].audio, this.canciones[lastIndex].id);
    }
    // else play previous song
    else {
      var prevIndex = index - 1;
      this.currOption = 'song';
      this.listenSong(this.canciones[prevIndex].title, this.canciones[prevIndex].subtitle, this.canciones[prevIndex].audio, this.canciones[prevIndex].id);
    }
  }

  //pause current song
  pause() {
    this.currSong.pause();
    this.isPlaying = false;
  }

  //play currently paused song
  play() {
    this.currSong.play();
    this.isPlaying = true;
  }

  //Close current playing song and reset current song info
  back() {
    this.currTitle = "";
    this.currSubtitle = "";
    this.progressSong = 0;
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

  //Función para agregar o remover las devociones favoritas del usuario.
  addOrRemoveFavourite() {
    console.log("inside favs");
    const userId = firebase.auth().currentUser.uid;
    console.log(userId);
    console.log(this.currOption);
    switch (this.currOption) {
      case 'prayer':
        {
          if (this.favourites.includes(this.currOptionId)) {
            this.firestoreService.removeFavouritePrayer(userId, this.currOptionId);
            this.favourites = this.favourites.filter(favId => favId !== this.currOptionId);
          }
          else {
            this.firestoreService.addFavouritePrayer(userId, this.currOptionId);
            this.favourites.push(this.currOptionId);
          }

        }
        break;
      case 'reading':
        {
          if (this.favourites.includes(this.currOptionId)) {
            this.firestoreService.removeFavouriteReading(userId, this.currOptionId);
            this.favourites = this.favourites.filter(favId => favId !== this.currOptionId);
          }
          else {
            this.firestoreService.addFavouriteReading(userId, this.currOptionId);
            this.favourites.push(this.currOptionId);
          }

        }
        break;
      case 'song':
        {
          console.log("inside song");
          if (this.favourites.includes(this.currOptionId)) {
            this.firestoreService.removeFavouriteSong(userId, this.currOptionId);
            this.favourites = this.favourites.filter(favId => favId !== this.currOptionId);
          }
          else {
            this.firestoreService.addFavouriteSong(userId, this.currOptionId);
            this.favourites.push(this.currOptionId);
          }

        }
        break;
      case 'meditation':
        {
          console.log("inside meditation");
          if (this.favourites.includes(this.currOptionId)) {
            this.firestoreService.removeFavouriteMeditation(userId, this.currOptionId);
            this.favourites = this.favourites.filter(favId => favId !== this.currOptionId);
          }
          else {
            this.firestoreService.addFavouriteMeditation(userId, this.currOptionId);
            this.favourites.push(this.currOptionId);
          }

        }
        break;
    }
  }

  //Función para compartir en cualquier red social.
  share(titulo) {

    console.log('sharing to fb');

    //let file = await this.resolveLocalFile();
    //console.log('FILE: ', file);
    //this.socialSharing.shareViaFacebookWithPasteMessageHint('message','https://www.google.com/search?q=shih+tzu&sxsrf=ALeKk02Svl0e4dS82GfZczbCurw7dqr1_Q:1606361859370&source=lnms&tbm=isch&sa=X&ved=2ahUKEwilq4igpJ_tAhU3STABHbOTD9AQ_AUoAXoECA4QAw&biw=1920&bih=1007#imgrc=EGHtm_ykx5jHxM').then(() => {
    //this.removeTempFile(file.name);
    //}).catch(e => {

    //})
    this.subjet = titulo;
    this.mensaje = "Escuchá " + titulo + " en la app de Mi Negrita.";
    this.imagen = "assets/imágenes/canciones.svg";
    this.url = this.linkPlayStore;
    var options = {
      message: this.mensaje,
      subjet: this.subjet,
      files: this.imagen,
      url: this.url,
      chooserTitle: this.subjet
    }
    this.socialSharing.shareWithOptions(options);
    console.log(this.subjet);
    console.log(this.imagen);
    console.log(this.url);
    //this.socialSharing.shareViaFacebook(mensajeSong, imagenSong, urlSong);
    //this.socialSharing.share(mensajeSong, subjetSong, imagenSong, urlSong);
  }

  //Se oculta el popUp 
  hideOptionsModal() {
    document.getElementById("headerPer").style.filter = "none";
    document.getElementById("segmentPer").style.filter = "none";
    document.getElementById("footPer").style.filter = "none";
  }

  //Se miniza el popUp del evento
  minimize2() {
    document.getElementById("PopUpEvento").style.bottom = "-1000px";
    document.getElementById("headerPer").style.filter = "none";
    document.getElementById("segmentPer").style.filter = "none";
    document.getElementById("footPer").style.filter = "none";
  }

  //Se muestra el popUp del evento
  popupEvento(nombre, direccion, fecha, informacion, reserva, link, optId: string) {
    document.getElementById("PopUpEvento").style.bottom = "100px";
    document.getElementById("headerPer").style.filter = "blur(2px)";
    document.getElementById("segmentPer").style.filter = "blur(2px)";
    document.getElementById("footPer").style.filter = "blur(2px)";
    this.currNombre = nombre;
    this.currDireccion = direccion;
    this.currFecha = fecha;
    this.currInfo = informacion;
    this.currReserva = reserva;
    this.currLink = link;
    this.currOptionId = optId;
    this.reserva(this.currReserva);
  }

  //Determina si hay un link para ver más información del evento
  reserva(reserva) {
    if (reserva == true) {
      this.bookable = true;
    } else {
      this.bookable = false;
    }
  }

  //Link para ver más información de un evento
  reservar2(link) {
    window.open(link);
  }

  //Función para agregar o remover los eventos favoritos del usuario.
  addOrRemoveFavouriteEvent() {
    console.log("inside favs");
    const userId = firebase.auth().currentUser.uid;
    if (this.favourites.includes(this.currOptionId)) {
      this.firestoreService.removeFavouriteEvent(userId, this.currOptionId);
      this.favourites = this.favourites.filter(favId => favId !== this.currOptionId);
      //this.presentToastNo();
    }
    else {
      this.firestoreService.addFavouriteEvent(userId, this.currOptionId);
      this.favourites.push(this.currOptionId);
      //this.presentToastYes();
    }
  }

  /*async presentToastYes() {
    const toast = await this.Toast.create({
      header: '¡Evento agregado a mis favoritos!',
      position: "top",
      color: "celeste",
      duration: 2000,
    });
    toast.present();
  }

  async presentToastNo() {
    const toast = await this.Toast.create({
      header: '¡Evento eliminado de mis favoritos!',
      position: "top",
      color: "celeste",
      duration: 2000,
    });
    toast.present();
  }*/

  //Calcula el progreso por tiempo
  calcTimeProgress() {
    //let currentHoursMinutes = this.currentRomeria.conteo.split(":");
    //let currentHours = Number(currentHoursMinutes[0])
    //let currentHoursToMinutes = currentHours*60;
    //let currentMinutes = Number(currentHoursMinutes[1]);
    //let currentTimeInMinutes = currentHoursToMinutes + currentMinutes;

    //let missingHoursMinutes = this.currentRomeria.faltante.split(":");
    //let missingHours = Number(missingHoursMinutes[0])
    //let missingHoursToMinutes = missingHours*60;
    //let missingMinutes = Number(missingHoursMinutes[1]);
    //let missingTimeInMinutes = missingHoursToMinutes + missingMinutes;

    this.horas = this.currentRomeria.horas;
    this.minutos = this.currentRomeria.minutos;
    this.cuentaAtras();

    //let objetivo = currentTimeInMinutes + missingTimeInMinutes;
    this.currTime = this.currentRomeria.timeConteo;
    this.timeout = this.currentRomeria.timeTotalMs;
    //this.progress = currentTimeInMinutes / objetivo;
    this.progress = this.currTime / this.timeout;
    console.log(this.currTime);
    console.log(this.timeout);
    console.log(this.currentRomeria.timeTotalMs);
    console.log(this.progress);
  }

  //Función para contar el tiempo hacia atrás
  cuentaAtras() {
    this.devolvercero(this.horas, this.minutos);
    document.getElementById('CuentaAtrasPer').innerHTML = this.cerohor + this.horas + ':' + this.ceromin + this.minutos;
  }

  //Función que devuelve un cero antes de las horas, minutos o segundos cuando algunos de estos 3 es menor a 10
  devolvercero(horas, minutos) {
    if (horas < 10) {
      this.cerohor = '0';
    } else {
      this.cerohor = '';
    }
    if (minutos < 10) {
      this.ceromin = '0';
    } else {
      this.ceromin = '';
    }
    return this.ceromin;
    return this.cerohor;
  }

  //Calcula el progreso por pasos
  calcStepsProgress() {
    let currentSteps = Number(this.currentRomeria.pasosConteo);
    let missingSteps = Number(this.currentRomeria.pasosRestantes);

    //let objetivo = currentSteps + missingSteps;
    let pasosTotal = this.currentRomeria.pasosTotal;
    //this.progress = currentSteps / objetivo;
    this.progress = currentSteps / pasosTotal;
    console.log(currentSteps);
    console.log(pasosTotal);
    console.log(this.progress);
  }

}
