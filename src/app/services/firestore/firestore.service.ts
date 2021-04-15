import { Injectable } from '@angular/core';
import { snapshotChanges } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { Reference } from '@angular/compiler/src/render3/r3_ast';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  public createUser(data: {userId: string, name: string, lastname: string, avatar: string, intenciones: Array<string>, exvotos: Array<string>}) {
    return this.firestore.collection('usuarios').doc(data.userId).set({
      name: data.name,
      lastname: data.lastname,
      avatar: data.avatar,
      intenciones: data.intenciones,
      exvotos: data.exvotos
    });
  }

  public getUser(userId: string) {
    return this.firestore.collection('usuarios').doc(userId).snapshotChanges();
  }

  public updateUser(userId: string, data: any) {
    return this.firestore.collection('usuarios').doc(userId).set(data);
  }

  public createRomeriaXUser(userId: string, romeriasCompletadas: number, horasTotales: number, pasosTotales: number, kmTotales: number, romeriaActiva: boolean){
    const refUser = this.firestore.collection('usuarios').doc(userId);
    return this.firestore.collection('romeriaxusuario').doc(userId).set({
      usuario: refUser.ref,
      romeriasCompletadas: romeriasCompletadas,
      totalHoras: horasTotales,
      pasosTotales: pasosTotales,
      kmTotales: kmTotales,
      romeriaActiva: romeriaActiva
    });
  }

  public getRomeriaXUser(userId: string){
    return this.firestore.collection('romeriaxusuario').doc(userId).snapshotChanges();
  }

  public updateRomeriaXUser(userId: string, data: any) {
    return this.firestore.collection('romeriaxusuario').doc(userId).set(data);
    
  }

  public getHorarios() {
    return this.firestore.collection('horarios').snapshotChanges();
  }

  public getEventos(){
    return this.firestore.collection('eventos', ref => ref.orderBy('date')).snapshotChanges();
    }

  public addFavouriteEvent(userId: string, EventId: string) {
    const refUser = this.firestore.collection('usuarios').doc(userId);
    const refEvento = this.firestore.collection('eventos').doc(EventId);
    return this.firestore.collection('eventosxpersona').add({
      usuario: refUser.ref,
      evento: refEvento.ref
    });
  }

  public getFavouriteEventDoc(userId: string, eventId: string) {
    const userDoc = this.firestore.collection('usuarios').doc(userId);
    const eventDoc = this.firestore.collection('eventos').doc(eventId);
    return this.firestore.collection('eventosxpersona', ref => ref.where('usuario','==',userDoc.ref).where('evento','==',eventDoc.ref)).snapshotChanges();
  }

  public getFavouriteEvents(userId: string) {
    const userDoc = this.firestore.collection('usuarios').doc(userId);
    return this.firestore.collection('eventosxpersona', ref => ref.where('usuario','==',userDoc.ref)).snapshotChanges();
  }

  public removeFavouriteEvent(userId: string, eventId: string) {
    this.getFavouriteEventDoc(userId, eventId).pipe(take(1)).subscribe((eventSnapshot) => {
      eventSnapshot.forEach(async(eventData: any) => {
        const eventId = await eventData.payload.doc.id;
        return this.firestore.collection('eventosxpersona').doc(eventId).delete();
      });
    });
  }
  
  public getPuntosPartida() {
    return this.firestore.collection('partidasdeinicio', ref => ref.orderBy('orden')).snapshotChanges();
  }

  public deleteRomeria(id: string){
    return this.firestore.collection('romerias').doc(id).delete();
  }
  
  public getListRomerias() {
    return this.firestore.collection('romerias').snapshotChanges();
  }

  public getRomerias(userId: string) {
    //const userDoc = this.firestore.collection('usuarios').doc(userId);
    //return this.firestore.collection('romerias', ref => ref.where('usuario','==',userDoc.ref)).snapshotChanges();
    return this.firestore.collection('romerias').doc(userId).snapshotChanges();
  }

  public createRomeria(userId: string, play: boolean, pause: boolean, romeriaActiva: boolean, finalizada: boolean, tipoRomeria: string, proposito: string, partida: string, progreso: number, kmConteo: number, kmRestantes: number, kmTotal: number, timeConteo: number, horas: number, minutos: number, segundos: number, timeTotal: number, pasosConteo: number, pasosRestantes: number, pasosTotal: number){
    const refUser = this.firestore.collection('usuarios').doc(userId);
    return this.firestore.collection('romerias').doc(userId).set({
      usuario: refUser.ref,
      play: play,
      pause: pause,
      romeriaActiva: romeriaActiva,
      finalizada: finalizada,
      tipoRomeria: tipoRomeria,
      proposito: proposito,
      puntoPartida: partida,
      progreso: progreso,
      kmConteo: kmConteo, 
      kmRestantes: kmRestantes, 
      kmTotal: kmTotal, 
      timeConteo: timeConteo, 
      horas: horas, 
      minutos: minutos,
      segundos: segundos,
      timeTotalMs: timeTotal, 
      pasosConteo: pasosConteo, 
      pasosRestantes: pasosRestantes, 
      pasosTotal: pasosTotal
    });
  }

  public updateRomeria(userId: string, data: any) {
    return this.firestore.collection('romerias').doc(userId).set(data);
  }

  public getOraciones() {
    return this.firestore.collection('oraciones', ref => ref.orderBy('orden')).snapshotChanges();
  }

  public getLecturas() {
    return this.firestore.collection('lecturas', ref => ref.orderBy('orden')).snapshotChanges();
  }

  public getCanciones() {
    return this.firestore.collection('canciones', ref => ref.orderBy('orden')).snapshotChanges();
  }

  public getMeditaciones() {
    return this.firestore.collection('meditaciones', ref => ref.orderBy('orden')).snapshotChanges();
  }



  public addFavouritePrayer(userId: string, prayerId: string) {
    const refUser = this.firestore.collection('usuarios').doc(userId);
    const refPrayer = this.firestore.collection('oraciones').doc(prayerId);
    return this.firestore.collection('oracionesxpersona').add({
      usuario: refUser.ref,
      oracion: refPrayer.ref
    });
  }

  public addFavouriteReading(userId: string, readingId: string) {
    const refUser = this.firestore.collection('usuarios').doc(userId);
    const refReading = this.firestore.collection('lecturas').doc(readingId);
    return this.firestore.collection('lecturasxpersona').add({
      usuario: refUser.ref,
      lectura: refReading.ref
    });
  }

  public addFavouriteSong(userId: string, songId: string) {
    const refUser = this.firestore.collection('usuarios').doc(userId);
    const refSong = this.firestore.collection('canciones').doc(songId);
    return this.firestore.collection('cancionesxpersona').add({
      usuario: refUser.ref,
      cancion: refSong.ref
    });
  }

  public addFavouriteMeditation(userId: string, meditationId: string) {
    const refUser = this.firestore.collection('usuarios').doc(userId);
    const refMeditation = this.firestore.collection('meditaciones').doc(meditationId);
    return this.firestore.collection('meditacionesxpersona').add({
      usuario: refUser.ref,
      meditacion: refMeditation.ref
    });
  }

  public getFavouritePrayerDoc(userId: string, prayerId: string) {
    const userDoc = this.firestore.collection('usuarios').doc(userId);
    const prayerDoc = this.firestore.collection('oraciones').doc(prayerId);
    return this.firestore.collection('oracionesxpersona', ref => ref.where('usuario','==',userDoc.ref).where('oracion','==',prayerDoc.ref)).snapshotChanges();
  }

  public removeFavouritePrayer(userId: string, prayerId: string) {
    this.getFavouritePrayerDoc(userId, prayerId).pipe(take(1)).subscribe((prayersSnapshot) => {
      prayersSnapshot.forEach(async(prayerData: any) => {
        const prayerId = await prayerData.payload.doc.id;
        return this.firestore.collection('oracionesxpersona').doc(prayerId).delete();
      });
    });
  }

  public getFavouriteReadingDoc(userId: string, readingId: string) {
    const userDoc = this.firestore.collection('usuarios').doc(userId);
    const readingDoc = this.firestore.collection('lecturas').doc(readingId);
    return this.firestore.collection('lecturasxpersona', ref => ref.where('usuario','==',userDoc.ref).where('lectura','==',readingDoc.ref)).snapshotChanges();
  }

  public removeFavouriteReading(userId: string, readingId: string) {
    this.getFavouriteReadingDoc(userId, readingId).pipe(take(1)).subscribe((readingSnapshot) => {
      readingSnapshot.forEach(async(readingData: any) => {
        const readingId = await readingData.payload.doc.id;
        return this.firestore.collection('lecturasxpersona').doc(readingId).delete();
      });
    });
  }

  public getFavouriteSongDoc(userId: string, songId: string) {
    const userDoc = this.firestore.collection('usuarios').doc(userId);
    const songDoc = this.firestore.collection('canciones').doc(songId);
    return this.firestore.collection('cancionesxpersona', ref => ref.where('usuario','==',userDoc.ref).where('cancion','==',songDoc.ref)).snapshotChanges();
  }

  public removeFavouriteSong(userId: string, songId: string) {
    this.getFavouriteSongDoc(userId, songId).pipe(take(1)).subscribe((songSnapshot) => {
      songSnapshot.forEach(async(songData: any) => {
        const songId = await songData.payload.doc.id;
        return this.firestore.collection('cancionesxpersona').doc(songId).delete();
      });
    });
  }

  public getFavouriteMeditationDoc(userId: string, meditationId: string) {
    const userDoc = this.firestore.collection('usuarios').doc(userId);
    const meditationDoc = this.firestore.collection('meditaciones').doc(meditationId);
    return this.firestore.collection('meditacionesxpersona', ref => ref.where('usuario','==',userDoc.ref).where('meditacion','==',meditationDoc.ref)).snapshotChanges();
  }

  public removeFavouriteMeditation(userId: string, meditationId: string) {
    this.getFavouriteMeditationDoc(userId, meditationId).pipe(take(1)).subscribe((meditationSnapshot) => {
      meditationSnapshot.forEach(async(meditationData: any) => {
        const meditationId = await meditationData.payload.doc.id;
        return this.firestore.collection('meditacionesxpersona').doc(meditationId).delete();
      });
    });
  }

  public getFavouritePrayers(userId: string) {
    const userDoc = this.firestore.collection('usuarios').doc(userId);
    return this.firestore.collection('oracionesxpersona', ref => ref.where('usuario','==',userDoc.ref)).snapshotChanges();
  }

  public getFavouriteReadings(userId: string) {
    const userDoc = this.firestore.collection('usuarios').doc(userId);
    return this.firestore.collection('lecturasxpersona', ref => ref.where('usuario','==',userDoc.ref)).snapshotChanges();
  }

  public getFavouriteSongs(userId: string) {
    const userDoc = this.firestore.collection('usuarios').doc(userId);
    return this.firestore.collection('cancionesxpersona', ref => ref.where('usuario','==',userDoc.ref)).snapshotChanges();
  }

  public getFavouriteMeditations(userId: string) {
    const userDoc = this.firestore.collection('usuarios').doc(userId);
    return this.firestore.collection('meditacionesxpersona', ref => ref.where('usuario','==',userDoc.ref)).snapshotChanges();
  }
  
}
