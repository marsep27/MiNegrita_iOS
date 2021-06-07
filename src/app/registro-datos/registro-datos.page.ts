import { NavigationExtras, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Vibration } from '@ionic-native/vibration/ngx';
import * as firebase from 'firebase';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-registro-datos',
  templateUrl: './registro-datos.page.html',
  styleUrls: ['./registro-datos.page.scss']
})
export class RegistroDatosPage implements OnInit {

  get name() {
    return this.registrationForm.get('name');
  }

  get lastname() {
    return this.registrationForm.get('lastname');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  public errorMessages = {
    name: [
      { type: 'require', message: 'Espacio obligatorio' },
    ],
    lastname: [
      { type: 'require', message: 'Espacio obligatorio' },
    ],
    email: [
      { type: 'require', message: 'Espacio obligatorio' },
      { type: 'pattern', message: 'Ingresá un correo válido' }
    ],
    password: [
      { type: 'require', message: 'Espacio obligatorio' },
      { type: 'minlength', message: 'Mínimo 6 caracteres' }
    ]
  };

  public initPlace: String;
  public day:       String;
  public month:     String;

  nom =  [{ tex: '' }];
  ape =  [{ tex: '' }];
  text = [{ tex: '' }];
  pass = [{ tex: '' }];
  public nam:  String;
  public last: String;
  public texx: String;
  public pas:  String;


  disableButtonContinuar: boolean = true;
  isComplete:             boolean = false;
  registrationForm:       FormGroup;

  constructor(
    private auth: AngularFireAuth,
    private formBuilder: FormBuilder,
    public platform: Platform,
    private db: AngularFireDatabase,
    private router: Router,private vibra: Vibration) { }

  public submit() {
    console.log(this.registrationForm.value);
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  //Verifica que los campos sean llenados y requeridos
  register() {
    this.vibracion();
    this.nam = this.registrationForm.controls['name'].value;
    this.last = this.registrationForm.controls['lastname'].value;
    this.texx = this.registrationForm.controls['email'].value;
    this.pas = this.registrationForm.controls['password'].value;
    if (this.nam == '') {
      this.nom = [{ tex: 'Nombre requerido' }];
    } else if (this.last == '') {
      this.ape = [{ tex: 'Apellidos requeridos' }];
    } else if (this.texx == '') {
      this.text = [{ tex: 'Correo requerido' }];
    } else if (this.pas == '') {
      this.pass = [{ tex: 'Contraseña requerida' }];
    } else {

      let user = {
        email: this.registrationForm.controls['email'].value,
        password: this.registrationForm.controls['password'].value
      }
      //Crea el usuario
      this.auth.createUserWithEmailAndPassword(user.email, user.password)
        .then(userData => {
          console.log(userData);
          console.log(this.registrationForm.value);
          this.router.navigate(['/registro-cuenta'],
            {
              queryParams: {
                userData: userData.user.uid,
                name: this.registrationForm.controls['name'].value,
                lastname: this.registrationForm.controls['lastname'].value,
                email: this.registrationForm.controls['email'].value,
                password: this.registrationForm.controls['password'].value,
                provedor: 'email',
                page: 'datos'
              }
            });
            }
          ).catch(e => {
          if (e['code'] == 'auth/invalid-email') {
            this.text = [{ tex: 'El correo no es válido. ¡Intentá de nuevo!' }];
          } else if (e['code'] == 'auth/email-already-in-use') {
            this.text = [{ tex: 'El correo está registrado, intentá con otro correo.' }];
          } else {
            this.pass = [{ tex: 'Contraseña inválida' }];
          }
          console.log(this.text);
          console.log(e);
        })
    }
  }


  Clean() {
    this.nom = [{ tex: '' }];
  }

  Clean2() {
    this.ape = [{ tex: '' }];
  }

  Clean3() {
    this.text = [{ tex: '' }];
  }

  Clean4() {
    this.pass = [{ tex: '' }];
  }

  //Ir a la siguiente parte de registro-cuenta
  Next() {
    const extras: NavigationExtras = {
      queryParams: {
        datos: JSON.stringify(this.registrationForm)
      }
    };
    this.router.navigate(['/registro-cuenta' + this.registrationForm.controls['email'].value + this.registrationForm.controls['email'].value], extras);
  }

  change() {
    this.isComplete = true;
    this.disableButton();
  }

  disableButton() {
    if (this.isComplete == true) {
      this.disableButtonContinuar = false;
    }
  }

  initPlaceChange($event) {
    this.initPlace = $event.target.value;
  }
  dayChange($event) {
    this.day = $event.target.value;
  }
  monthChange($event) {
    this.month = $event.target.value;
  }

  ciudadComplete($event) {
    this.isComplete = true;
    this.disableButton();
  }

  vibracion(){
    if (this.platform.is("android")) {
      this.vibra.vibrate([50]);
    }
  }
}
