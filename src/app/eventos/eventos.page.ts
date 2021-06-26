import { async } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { FirestoreService } from './../services/firestore/firestore.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Attribute, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { IonRange } from "@ionic/angular";
import { Vibration } from '@ionic-native/vibration/ngx';
import * as firebase from 'firebase';
import { Reference } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage {

  segment: String
  @ViewChild("range", { static: false }) range: IonRange;

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  contentLoaded = false;

  eventosXUser: any;
  favourites:   string[] = [];
  currOptionId: string;
  eventosRef:   any;
  eventos       = [];
  santoral      = [];
  Eventos:      any;
  dia:          string;
  hora:         string;
  mes:          string;
  nombre:       string;
  uid:          string;
  evento:       Reference;
  usuario:      Reference;

  bookable:     boolean = true;
  linkMisa:     any;
  reservaMisa:  boolean;

  currNombre:    string;
  currDireccion: string;
  currFecha:     string;
  currInfo:      string;
  currReserva:   boolean;
  currLink:      string;
  currUser:      string;

  habilConsejo: boolean;
  habilAnuncio: boolean;
  titulo:       string;
  anuncio1:     string;
  anuncio2:     string;
  anuncio3:     string;
  anuncio4:     string;
  misa:         string;
  horMisa:      string;
  confesion:    string;
  horConfesion: string;
  horaSanta:    string;
  horHoraSanta: string;
  consejo:      string;
  horaConsejo:  string;
  pilaYpiedra:  string;
  horPyP:       string;
  oficina:      string;
  horOficina:   string;

  constructor(public platform: Platform,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    private vibra: Vibration,
    private firestore: AngularFirestore,
    public Toast: ToastController) {

    //Simulate data loading in
    setTimeout(() => {
      this.contentLoaded = true
    }, 2000);

  }

  //Se obtienen los eventos
  getEventos(Eventos) {
    this.eventos = Eventos;
  }

  ngOnInit(){
    //Se obtiene el link para realizar la reserva de la misa
    firebase.firestore().collection('linkApp').doc('EntradasMisa').onSnapshot((linkSnapshot) => {
      const info = linkSnapshot;
      this.linkMisa = info.data().link;
      this.reservaMisa = info.data().reserva;
      this.habilAnuncio = info.data().anuncios;
      this.titulo = info.data().titulo;
      this.anuncio1 = info.data().anuncio1;
      this.anuncio2 = info.data().anuncio2;
      this.anuncio3 = info.data().anuncio3;
      this.anuncio4 = info.data().anuncio4;
      console.log(this.linkMisa);
    });
  }

  ionViewWillUnload() {
    this.segment = "Actividades";
    this.loadFavourites();

    //Se obtiene el link para realizar la reserva de la misa
    firebase.firestore().collection('linkApp').doc('EntradasMisa').onSnapshot((linkSnapshot) => {
      const info = linkSnapshot;
      this.linkMisa = info.data().link;
      this.reservaMisa= info.data().reserva;
      this.habilAnuncio = info.data().anuncios;
      this.titulo = info.data().titulo;
      this.anuncio1 = info.data().anuncio1;
      this.anuncio2 = info.data().anuncio2;
      this.anuncio3 = info.data().anuncio3;
      this.anuncio4 = info.data().anuncio4;
      console.log(this.linkMisa);
    });

    //Se obtienen los eventos de la base de datos
    firebase.firestore().collection('eventos').orderBy('date').onSnapshot((eventoSnapshot) => {
      this.Eventos = [];
      eventoSnapshot.forEach(async (eventoData: any) => {
        // doc.data() is never undefined for query doc snapshots
        const evento = await eventoData;
        console.log(evento.id, " => ", evento.data().date);
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
          },
        );
        console.log(this.eventos);
      });
    });

    /*this.firestoreService.getEventos().pipe(take(1)).subscribe((eventoSnapshot) => {
      this.Eventos =  [];
      eventoSnapshot.forEach(async(eventoData: any) => {
        const evento = await eventoData.payload.doc;
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
          },
        );
      });
    });*/

    //Se obtienen los horarios de la base de datos
    firebase.firestore().collection('horarios').onSnapshot((horarioSnapshot) => {
      horarioSnapshot.forEach(async (horarioData: any) => {
        // doc.data() is never undefined for query doc snapshots
        const horario = await horarioData;
        console.log(horario.id, " => ", horario.data());
        this.misa = horario.data().misas;
        this.horMisa = horario.data().misashorario;
        this.confesion = horario.data().confesiones;
        this.horConfesion = horario.data().confesioneshorario;
        this.horaSanta = horario.data().horasanta;
        this.horHoraSanta = horario.data().horasantahorario;
        this.consejo = horario.data().consejeria;
        this.horaConsejo = horario.data().consejeriahorario;
        this.pilaYpiedra = horario.data().pilaypiedra;
        this.horPyP = horario.data().pilaypiedrahorario;
        this.oficina = horario.data().oficina;
        this.horOficina = horario.data().oficinahorario;
        this.habilConsejo = horario.data().habilitarConsejo;
      });
    });

    /*this.firestoreService.getHorarios().pipe(take(1)).subscribe((horarioSnapshot) => {
      horarioSnapshot.forEach(async(horarioData: any) => {
        const horario = await horarioData.payload.doc;
        this.misa = horario.data().misas;
        this.horMisa = horario.data().misashorario;
        this.confesion = horario.data().confesiones;
        this.horConfesion = horario.data().confesioneshorario;
        this.horaSanta = horario.data().horasanta;
        this.horHoraSanta = horario.data().horasantahorario;
        this.consejo = horario.data().consejeria;
        this.horaConsejo = horario.data().consejeriahorario;
        this.pilaYpiedra = horario.data().pilaypiedra;
        this.horPyP = horario.data().pilaypiedrahorario;
        this.oficina = horario.data().oficina;
        this.horOficina = horario.data().oficinahorario;
      });
    });*/

    /*this.firestoreService.getEventos().subscribe((eventosSnapshot) => {
      var Eventos = [];
        eventosSnapshot.forEach(function(doc) {
            Eventos.push(doc.payload.doc.data());
            console.log(Eventos);
        });
      this.getEventos(Eventos);
    });*/
    //Se obtiene el santoral de la base de datos
    firebase.firestore().collection('santoral').orderBy('orden').onSnapshot((santoralSnapshot) => {
      this.santoral = [];
      santoralSnapshot.forEach(async (santoralData: any) => {
        // doc.data() is never undefined for query doc snapshots
        const santoral = await santoralData;
        console.log(santoral.id, " => ", santoral.data().orden);
        this.santoral.push(
          {
            mes: santoral.data().mes,
            dias: santoral.data().dias
          },
        );
        console.log(this.santoral);
      });
    });
  }

  ionViewWillEnter() {
    this.segment = "Actividades";
    this.loadFavourites();

    //Se obtienen los eventos de la base de datos
    firebase.firestore().collection('eventos').orderBy('date').onSnapshot((eventoSnapshot) => {
      this.eventos = [];
      eventoSnapshot.forEach(async (eventoData: any) => {
        // doc.data() is never undefined for query doc snapshots
        const evento = await eventoData;
        console.log(evento.id, " => ", evento.data().date);
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
          },
        );
        console.log(this.eventos);
      });
    });

    /*this.firestoreService.getEventos().pipe(take(1)).subscribe((eventoSnapshot) => {
      this.Eventos =  [];
      eventoSnapshot.forEach(async(eventoData: any) => {
        const evento = await eventoData.payload.doc;
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
          },
        );
      });
    });*/

    //Se obtienen los horarios de la base de datos
    firebase.firestore().collection('horarios').onSnapshot((horarioSnapshot) => {
      horarioSnapshot.forEach(async (horarioData: any) => {
        // doc.data() is never undefined for query doc snapshots
        const horario = await horarioData;
        console.log(horario.id, " => ", horario.data());
        this.misa = horario.data().misas;
        this.horMisa = horario.data().misashorario;
        this.confesion = horario.data().confesiones;
        this.horConfesion = horario.data().confesioneshorario;
        this.horaSanta = horario.data().horasanta;
        this.horHoraSanta = horario.data().horasantahorario;
        this.consejo = horario.data().consejeria;
        this.horaConsejo = horario.data().consejeriahorario;
        this.pilaYpiedra = horario.data().pilaypiedra;
        this.horPyP = horario.data().pilaypiedrahorario;
        this.oficina = horario.data().oficina;
        this.horOficina = horario.data().oficinahorario;
        this.habilConsejo = horario.data().habilitarConsejo;
      });
    });

    /*this.firestoreService.getHorarios().pipe(take(1)).subscribe((horarioSnapshot) => {
      horarioSnapshot.forEach(async(horarioData: any) => {
        const horario = await horarioData.payload.doc;
        this.misa = horario.data().misas;
        this.horMisa = horario.data().misashorario;
        this.confesion = horario.data().confesiones;
        this.horConfesion = horario.data().confesioneshorario;
        this.horaSanta = horario.data().horasanta;
        this.horHoraSanta = horario.data().horasantahorario;
        this.consejo = horario.data().consejeria;
        this.horaConsejo = horario.data().consejeriahorario;
        this.pilaYpiedra = horario.data().pilaypiedra;
        this.horPyP = horario.data().pilaypiedrahorario;
        this.oficina = horario.data().oficina;
        this.horOficina = horario.data().oficinahorario;
      });
    });*/

    /*this.firestoreService.getEventos().subscribe((eventosSnapshot) => {
      var Eventos = [];
        eventosSnapshot.forEach(function(doc) {
            Eventos.push(doc.payload.doc.data());
            console.log(Eventos);
        });
      this.getEventos(Eventos);
    });*/

    //Se obtiene el santoral de la base de datos
    firebase.firestore().collection('santoral').orderBy('orden').onSnapshot((santoralSnapshot) => {
      this.santoral = [];
      santoralSnapshot.forEach(async (santoralData: any) => {
        // doc.data() is never undefined for query doc snapshots
        const santoral = await santoralData;
        console.log(santoral.id, " => ", santoral.data().orden);
        this.santoral.push(
          {
            mes: santoral.data().mes,
            dias: santoral.data().dias
          },
        );
        console.log(this.santoral);
      });
    });

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
  }

  onChange($event) {
    console.log($event);
  }

  /*//Se miniza el popUp de la misa
  minimize() {
    document.getElementById("PopMisa").style.bottom = "-1000px";
    document.getElementById("headerEve").style.filter = "none";
    document.getElementById("segmentEve").style.filter = "none";
    document.getElementById("footEve").style.filter = "none";
  }

  //Se muestra el popUp de la misa
  popmisa() {
    document.getElementById("PopMisa").style.bottom = "5vh";
    document.getElementById("headerEve").style.filter = "blur(2px)";
    document.getElementById("segmentEve").style.filter = "blur(2px)";
    document.getElementById("footeEve").style.filter = "blur(2px)";
  }*/

  //Se miniza el popUp del evento
  minimize() {
    document.getElementById("PopEvento").style.bottom = "-1000px";
    document.getElementById("headerEve").style.filter = "none";
    document.getElementById("segmentEve").style.filter = "none";
    document.getElementById("footEve").style.filter = "none";
  }

  //Se muestra el popUp del evento
  PopEvento(nombre, direccion, fecha, informacion, reserva, link, optId: string) {
    document.getElementById("PopEvento").style.bottom = "5vh";
    document.getElementById("headerEve").style.filter = "blur(2px)";
    document.getElementById("segmentEve").style.filter = "blur(2px)";
    document.getElementById("footEve").style.filter = "blur(2px)";
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

  //Link para reservar el espacio en la misa
  goMisa() {
    window.open(this.linkMisa);
  }

  //Link para ver más información de un evento
  masInformacion(link) {
    this.vibracion();
    window.open(link);
  }

  //Función para agregar o remover los eventos favoritos del usuario.
  addOrRemoveFavourite() {
    console.log("inside favs");
    const userId = firebase.auth().currentUser.uid;
    if (this.favourites.includes(this.currOptionId)) {
      this.firestoreService.removeFavouriteEvent(userId, this.currOptionId);
      this.favourites = this.favourites.filter(favId => favId !== this.currOptionId);
      //this.presentToastNo();
    }
    else {
      this.vibracion();
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

  vibracion(){
    if (this.platform.is("android")) {
      this.vibra.vibrate([50]);
    }
  }
}
