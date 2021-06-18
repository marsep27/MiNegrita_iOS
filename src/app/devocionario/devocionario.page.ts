import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { IonRange } from "@ionic/angular";
import { FirestoreService } from '../services/firestore/firestore.service';
import { take } from 'rxjs/operators';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Platform } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-devocionario',
  templateUrl: './devocionario.page.html',
  styleUrls: ['./devocionario.page.scss'],
})
export class DevocionarioPage {

  segment: String
  @ViewChild("range", { static: false }) range: IonRange;

  contentLoaded  = false;
  contentLoaded2 = false;
  contentLoaded3 = false;
  contentLoaded4 = false;

  shareText:     string = "";
  linkPlayStore: any;
  linkAppStore:  any;

  subjet:  string;
  mensaje: string;
  imagen:  string;
  url:     string;

  currTitle:    string;
  currSubtitle: string;
  currText:     string;

  upNextText:     string;
  upNextTitle:    string;
  upNextSubtitle: string;

  oraciones:    any;
  lecturas:     any;
  meditaciones: any;
  canciones:    any;
  favourites:   string[] = [];

  currRoute:    string;
  currOption:   string;
  currOptionId: string;

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

  constructor(private router: Router, 
    private vibra: Vibration, public platform: Platform, private firestoreService: FirestoreService, public nativeAudio: NativeAudio, private socialSharing: SocialSharing, private file: File) {
    //Simulate data loading in
    setTimeout(() => {
      this.contentLoaded = true
    }, 2000);

    setTimeout(() => {
      this.contentLoaded2 = true
    }, 2000);

    setTimeout(() => {
      this.contentLoaded3 = true
    }, 2000);

    setTimeout(() => {
      this.contentLoaded4 = true
    }, 2000);
  }

  ngOnInit() {
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

    //Se obtienen las oraciones de la base de datos
    firebase.firestore().collection('oraciones').orderBy('orden').onSnapshot((oracionesSnapshot) => {
      this.oraciones = [];
      oracionesSnapshot.forEach(async (oracionesData: any) => {
        const oracion = await oracionesData;
        // doc.data() is never undefined for query doc snapshots
        console.log(oracion.id, " => ", oracion.data().title);
        this.oraciones.push(
          {
            title: oracion.data().title,
            subtitle: oracion.data().subtitle,
            days: oracion.data().dias,
            route: oracion.data().route,
            time: oracion.data().time,
            oracionId: oracion.id
          },
        );
      });
    });

    /*this.firestoreService.getOraciones().pipe(take(1)).subscribe((oracionesSnapshot) => {
      this.oraciones =  [];
      oracionesSnapshot.forEach(async(oracionData: any) => {
        const oracion = await oracionData.payload.doc;
        this.oraciones.push(
          {
            title: oracion.data().title,
            subtitle: oracion.data().subtitle,
            days: oracion.data().dias,
            route: oracion.data().route,
            time: oracion.data().time,
            oracionId: oracion.id
          },
        );
      });
    });*/

    //Se obtienen las lesturas de la base de datos
    firebase.firestore().collection('lecturas').orderBy('orden').onSnapshot((lecturasSnapshot) => {
      this.lecturas = [];
      lecturasSnapshot.forEach(async (lecturasData: any) => {
        const lectura = await lecturasData;
        // doc.data() is never undefined for query doc snapshots
        console.log(lectura.id, " => ", lectura.data().title);
        this.lecturas.push(
          {
            title: lectura.data().title,
            subtitle: lectura.data().subtitle,
            text: lectura.data().text,
            lecturaId: lectura.id
          },
        );
      });
    });

    /*this.firestoreService.getLecturas().pipe(take(1)).subscribe((lecturasSnapshot) => {
      this.lecturas =  [];
      lecturasSnapshot.forEach(async(lecturaData: any) => {
        const lectura = await lecturaData.payload.doc;
        this.lecturas.push(
          {
            title: lectura.data().title,
            subtitle: lectura.data().subtitle,
            text: lectura.data().text,
            lecturaId: lectura.id
          },
        );
      });
    });*/

    //Se obtienen las meditaciones de la base de datos
    firebase.firestore().collection('meditaciones').orderBy('orden').onSnapshot((meditacionesSnapshot) => {
      this.meditaciones = [];
      meditacionesSnapshot.forEach(async (meditacionesData: any) => {
        const meditacion = await meditacionesData;
        // doc.data() is never undefined for query doc snapshots
        console.log(meditacion.id, " => ", meditacion.data().title);
        this.meditaciones.push(
          {
            title: meditacion.data().title,
            text: meditacion.data().text,
            meditacionId: meditacion.id
          },
        );
      });
    });

    /*this.firestoreService.getMeditaciones().pipe(take(1)).subscribe((meditacionesSnapshot) => {
      this.meditaciones =  [];
      meditacionesSnapshot.forEach(async(meditacionData: any) => {
        const meditacion = await meditacionData.payload.doc;
        this.meditaciones.push(
          {
            title: meditacion.data().title,
            text: meditacion.data().text,
            meditacionId: meditacion.id
          },
        );
      });
    });*/

    //Se obtienen las canciones de la base de datos
    firebase.firestore().collection('canciones').orderBy('orden').onSnapshot((cancionesSnapshot) => {
      this.canciones = [];
      cancionesSnapshot.forEach(async (cancionesData: any) => {
        const cancion = await cancionesData;
        // doc.data() is never undefined for query doc snapshots
        console.log(cancion.id, " => ", cancion.data().title);
        this.canciones.push(
          {
            title: cancion.data().title,
            subtitle: cancion.data().subtitle,
            time: cancion.data().time,
            audio: cancion.data().audio,
            cancionId: cancion.id
          },
        );
      });
    });

    /*this.firestoreService.getCanciones().pipe(take(1)).subscribe((cancionesSnapshot) => {
      this.canciones =  [];
      cancionesSnapshot.forEach(async(cancionData: any) => {
        const cancion = await cancionData.payload.doc;
        console.log(cancion.data());
        console.log(this.canciones);
        this.canciones.push(
          {
            title: cancion.data().title,
            subtitle: cancion.data().subtitle,
            time: cancion.data().time,
            audio: cancion.data().audio,
            cancionId: cancion.id
          },
        );
      });
    });*/
  }

  //Función para movilizar las pestañas de los segmentos
  segmentChanged(segment) {
    if (segment == "oraciones") {
      console.log(segment);
      document.getElementById("1").scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    } else if (segment == "lecturas") {
      console.log(segment);
      document.getElementById("2").scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center'
      });
    } else if (segment == "canciones") {
      console.log(segment);
      document.getElementById("3").scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      });
    } else if (segment == "meditaciones") {
      console.log(segment);
      document.getElementById("4").scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    } else {
    }
  }

  ionViewWillEnter() {
    this.segment = "oraciones";
    this.hideOptionsModal();
    this.loadFavourites();
    this.ngOnInit();
  }

  loadFavourites() {
    this.favourites = [];

    //Se cargan las oraciones favoritas del usuario
    this.firestoreService.getFavouritePrayers(firebase.auth().currentUser.uid).pipe(take(1)).subscribe((prayersSnapshot) => {
      prayersSnapshot.forEach(async (prayerData: any) => {
        const prayerId = await prayerData.payload.doc.data().oracion.id;
        this.favourites.push(prayerId);
      });
    });

    //Se cargan las lecturas favoritas del usuario
    this.firestoreService.getFavouriteReadings(firebase.auth().currentUser.uid).pipe(take(1)).subscribe((readingsSnapshot) => {
      readingsSnapshot.forEach(async (readingData: any) => {
        const readingId = await readingData.payload.doc.data().lectura.id;
        this.favourites.push(readingId);
      });
    });

    //Se cargan las canciones favoritas del usuario
    this.firestoreService.getFavouriteSongs(firebase.auth().currentUser.uid).pipe(take(1)).subscribe((songsSnapshot) => {
      songsSnapshot.forEach(async (songData: any) => {
        const songId = await songData.payload.doc.data().cancion.id;
        this.favourites.push(songId);
      });
    });

    //Se cargan las meditaciones favoritas del usuario
    this.firestoreService.getFavouriteMeditations(firebase.auth().currentUser.uid).pipe(take(1)).subscribe((meditationsSnapshot) => {
      meditationsSnapshot.forEach(async (meditationData: any) => {
        const meditationId = await meditationData.payload.doc.data().meditacion.id;
        this.favourites.push(meditationId);
      });
    });
  }

  //Según la ruta cargada, se dirige a la oración contenida
  navigate(route: string) {
    this.router.navigate([route]);
  }

  //Muestra la lectura
  showLectura(title: string, subtitle: string, text: string) {
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

    document.getElementById("lectura").style.display = "block";
  }

  //Se oculta la lectura
  hideLectura() {
    this.vibracion();
    document.getElementById("lectura").style.display = "none";
  }

  //Muestra la siguiente lectura
  showNextReading() {
    this.vibracion();
    var index = this.lecturas.findIndex(x => x.title == this.currTitle);

    if ((index + 1) == this.lecturas.length) {
      this.showLectura(this.lecturas[0].title, this.lecturas[0].subtitle, this.lecturas[0].text);
    }
    else {
      var nextIndex = index + 1;
      this.showLectura(this.lecturas[nextIndex].title, this.lecturas[nextIndex].subtitle, this.lecturas[nextIndex].text);
    }
  }

  //Muestra la meditación
  showMeditation(title: string, text: string) {
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

    document.getElementById("meditacion").style.display = "block";
  }
 
  //Se oculta la meditación
  hideMeditation() {
    this.vibracion();
    document.getElementById("meditacion").style.display = "none";
  }

  //Se muestra la siguiente meditación
  showNextMeditation() {
    this.vibracion();
    var index = this.meditaciones.findIndex(x => x.title == this.currTitle);

    if ((index + 1) == this.meditaciones.length) {
      this.showMeditation(this.meditaciones[0].title, this.meditaciones[0].text);
    }
    else {
      var nextIndex = index + 1;
      this.showMeditation(this.meditaciones[nextIndex].title, this.meditaciones[nextIndex].text);
    }
  }

  //Se oculta la oración
  hidePlayer() {
    this.vibracion();
    document.getElementById("player").style.display = "none";
    this.back();
  }

  //Se muestra la canción
  openPlayer(title: string, subTitle: string, song: string, songId: string) {
    this.hideOptionsModal();
    this.currOptionId = songId;
    this.currOption = 'song';
    //If a song plays,stop that
    if (this.currSong != null) {
      this.currSong.pause();

    }

    //open full player view
    document.getElementById("player").style.display = "block";
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

  //Se muestra un popUp con la información 
  showOptionsModal() {
    this.vibracion();
    document.getElementById("dots-modal").style.display = "block";
    document.getElementById("header").style.filter = "blur(2px)";
    document.getElementById("segment").style.filter = "blur(2px)";
    document.getElementById("foot").style.filter = "blur(2px)";
  }

  //Se muestra un popUp de la oración seleccionada 
  showPrayersOptionsModal(title: string, subtitle: string, route: string, optId: string) {
    this.currTitle = title;
    this.currSubtitle = subtitle;
    this.currRoute = route;
    this.currOption = "prayer";
    this.currOptionId = optId;
    this.showOptionsModal();
  }

  //Se muestra un popUp de la lectura seleccionada
  showReadingsOptionsModal(title: string, subtitle: string, text: string, optId: string) {
    this.currTitle = title;
    this.currSubtitle = subtitle;
    this.currText = text;
    this.currOption = "reading";
    this.currOptionId = optId;
    this.showOptionsModal();
  }

  //Se muestra un popUp de la canción seleccionada
  showSongsOptionsModal(title: string, subtitle: string, audio: string, optId: string) {
    this.currTitle = title;
    this.currSubtitle = subtitle;
    this.currAudio = audio;
    this.currOption = "song";
    this.currOptionId = optId;
    this.showOptionsModal();
  }

  //Se muestra un popUp de la meditación seleccionada
  showMeditationsOptionsModal(title: string, text: string, optId: string) {
    this.currTitle = title;
    this.currSubtitle = "";
    this.currText = text;
    this.currOption = "meditation";
    this.currOptionId = optId;
    this.showOptionsModal();
  }

  //Se oculta el popUp 
  hideOptionsModal() {
    document.getElementById("dots-modal").style.display = "none";
    document.getElementById("header").style.filter = "none";
    document.getElementById("segment").style.filter = "none";
    document.getElementById("foot").style.filter = "none";
  }

  //Según el popUp, se puede ver la meditación seleccionada
  see() {
    this.vibracion();
    switch (this.currOption) {
      case 'prayer':
        this.navigate(this.currRoute);
        break;
      case 'reading':
        this.showLectura(this.currTitle, this.currSubtitle, this.currText);
        break;
      case 'song':
        this.openPlayer(this.currTitle, this.currSubtitle, this.currAudio, this.currOptionId);
        break;
      case 'meditation':
        this.showMeditation(this.currTitle, this.currText);
        break;
    }
  }

  //Función para ir a ver la oración 
  seePrayer() {
    this.navigate(this.currRoute);
  }

  //Función para agregar o remover las devociones favoritas del usuario.
  addOrRemoveFavourite() {
    console.log("inside favs");
    const userId = firebase.auth().currentUser.uid;
    switch (this.currOption) {
      case 'prayer':
        {
          if (this.favourites.includes(this.currOptionId)) {
            this.firestoreService.removeFavouritePrayer(userId, this.currOptionId);
            this.favourites = this.favourites.filter(favId => favId !== this.currOptionId);
          }
          else {
            this.vibracion();
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
            this.vibracion();
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
            this.vibracion();
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
            this.vibracion();
            this.firestoreService.addFavouriteMeditation(userId, this.currOptionId);
            this.favourites.push(this.currOptionId);
          }

        }
        break;
    }
  }

  async resolveLocalFile() {
    switch (this.currOption) {
      case 'prayer':
        return this.file.copyFile(`${this.file.applicationDirectory}www/assets/imágenes`,
          'oraciones.svg', this.file.cacheDirectory, `${new Date().getTime()}.svg`);
        break;
      case 'reading':
        return this.file.copyFile(`${this.file.applicationDirectory}www/assets/imágenes`,
          'Logo.png', this.file.cacheDirectory, `${new Date().getTime()}.svg`);
        break;
      case 'song':
        return this.file.copyFile(`${this.file.applicationDirectory}www/assets/imágenes`,
          'Logo.png', this.file.cacheDirectory, `${new Date().getTime()}.svg`);
        break;
      case 'meditation':
        return this.file.copyFile(`${this.file.applicationDirectory}www/assets/imágenes`,
          'Logo.png', this.file.cacheDirectory, `${new Date().getTime()}.svg`);
        break;
    }
  }

  removeTempFile(name) {
    this.file.removeFile(this.file.cacheDirectory, name);
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

    switch (this.currOption) {
      case 'prayer':
        if (this.platform.is("android")) {
          this.subjet = this.currSubtitle;
          this.mensaje = "Rezá " + this.currSubtitle + " en la app de Mi Negrita: ";
          this.imagen = `${this.file.applicationDirectory}assets/imágenes/oraciones.svg`;
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
          this.subjet = this.currSubtitle;
          this.mensaje = "Rezá " + this.currSubtitle + " en la app de Mi Negrita: ";
          this.imagen = `${this.file.applicationDirectory}assets/imágenes/oraciones.svg`;
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
        break;
      case 'reading':
        if (this.platform.is("android")) {
          this.subjet = this.currTitle;
          this.mensaje = "Leé " + this.currTitle + " en la app de Mi Negrita: ";
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
          this.mensaje = "Leé " + this.currTitle + " en la app de Mi Negrita: ";
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
        break;
      case 'song':
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
        break;
      case 'meditation':
        if (this.platform.is("android")) {
          this.subjet = this.currTitle;
          this.mensaje = "Meditá " + this.currTitle + " en la app de Mi Negrita: ";
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
          this.mensaje = "Meditá " + this.currTitle + " en la app de Mi Negrita: ";
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
        break;
    }

  }

  shareOpt2() {
    var options = {
      message: 'sharing test',
      url: 'https://www.santuarionacional.org/',
    };

    this.socialSharing.shareWithOptions(options);
  }

  vibracion(){
    if (this.platform.is("android")) {
      this.vibra.vibrate([50]);
    }
  }
}
