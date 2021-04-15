import { auth } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { isNullOrUndefined } from 'util';
import { LoadingController } from '@ionic/angular';

import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private AFauth: AngularFireAuth, private router: Router,
    public loadingController: LoadingController) { }

  //Revisa si hay un usurio logeado,
  //si es así, para directamente a perfil.
  //Si no es así, carga la pantalla principal.
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.presentLoading();
    return this.AFauth.authState.pipe(map(auth => {
      if (isNullOrUndefined(auth)) {
        return true
      } else {
        this.router.navigate(['/perfil']);
      }
      //console.log(auth);
      //return true;
    }))

  }

  //Muestra en pantalla por unos segundos un spinner para indicar que la página se está cargando 
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'spinner',
      message: 'Espere por favor...',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
