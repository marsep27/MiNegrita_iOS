import { Router } from '@angular/router';
import { FormBuilder, Validators, FormsModule, FormGroup } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Component, OnInit } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';
import * as firebase from 'firebase';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {
  loginForm: FormGroup;

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  public errorMessages = {
    email: [
      { type: 'require', message: 'Espacio obligatorio' },
      { type: 'pattern', message: 'Ingresá un correo válido' }
    ],
    password: [
      { type: 'require', message: 'Espacio obligatorio' }
    ]
  };

  text = [{ tex: '' }];
  pass = [{ tex: '' }];
  public cor: String;
  public pas: String;

  constructor(private auth: AngularFireAuth, private fb: FormBuilder,public platform: Platform, private router: Router,private vibra: Vibration) { }

  ngOnInit() {
    //Validar los campos
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,4}$')]],
      password: ["", [Validators.required]]
    })
  }

  //Iniciar el proceso de loging
  login() {
    this.vibracion();
    this.cor = this.loginForm.controls['email'].value;
    this.pas = this.loginForm.controls['password'].value;
    if (this.cor == '') {
      this.text = [{ tex: 'Correo requerido' }];
    } else if (this.pas == '') {
      this.pass = [{ tex: 'Contraseña requerida' }];
    } else {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
        firebase.auth().signInWithEmailAndPassword(
          this.loginForm.controls['email'].value,
          this.loginForm.controls['password'].value
        ).then(userData => {
          var user = firebase.auth().currentUser;
          console.log(userData);
          console.log(user);
          console.log(user.uid);
          console.log(user.providerData);
          //this.router.navigate(['/perfil']);
          this.router.navigateByUrl("/perfil");
        }).catch(e => {
          if (e['code'] == 'auth/invalid-email') {
            this.text = [{ tex: 'El correo no es válido. ¡Intentá de nuevo!' }];
          } else if (e['code'] == 'auth/user-not-found') {
            this.text = [{ tex: 'El correo no está registrado. ¡Registrate!' }];
          } else {
            this.pass = [{ tex: 'Contraseña inválida' }];
          }

          console.log(this.text);
          console.log(e['code']);
        })
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
      console.log(this.loginForm.value)
    }
  }

  Clean() {
    this.text = [{ tex: '' }];
  }
  Clean2() {
    this.pass = [{ tex: '' }];
  }

  vibracion(){
    if (this.platform.is("android")) {
      this.vibra.vibrate([50]);
    }
  }
}
