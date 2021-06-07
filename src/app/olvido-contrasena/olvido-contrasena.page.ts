import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-olvido-contrasena',
  templateUrl: './olvido-contrasena.page.html',
  styleUrls: ['./olvido-contrasena.page.scss'],
})
export class OlvidoContrasenaPage implements OnInit {

  text = [{ tex: '' }];
  public emai: string;

  correo: FormGroup;

  get email() {
    return this.correo.get('email');
  }

  public errorMessages = {
    email: [
      { type: 'require', message: 'Espacio obligatorio' },
      { type: 'pattern', message: 'Ingresá un correo válido' }
    ]
  };

  constructor(private auth: AuthService,
    public platform: Platform, private formBuilder: FormBuilder, private router: Router,
    private vibra: Vibration) { }

  ngOnInit() {
    //Validar los campos
    this.correo = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,4}$')]]
    })
  }

  //Se envía al correo suministrado el correo para restablecer la contraseña siempre y cuando el correo exista, 
  //sino saldrán alertas indicando el error.
  enviarCorreo() {
    this.vibracion();
    this.emai = this.correo.controls['email'].value;
    if (this.emai != "") {
      this.auth.resetPassword(this.emai).then(() => {
        this.router.navigate(['/iniciar-sesion']);
      }).catch(e => {
        if (e['code'] == 'auth/invalid-email') {
          this.text = [{ tex: 'El correo no es válido. ¡Intentá de nuevo!' }];
        } else if (e['code'] == 'auth/user-not-found') {
          this.text = [{ tex: 'El correo no está registrado. ¡Registrate!' }];
        }
        console.log(e);

      })
    } else {
      this.text = [{ tex: 'Ingresá un correo' }];
    }
  }

  Clean() {
    this.text = [{ tex: '' }];
  }

  vibracion(){
    if (this.platform.is("android")) {
      this.vibra.vibrate([50]);
    }
  }
}
