import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Platform } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registro-intenciones',
  templateUrl: './registro-intenciones.page.html',
  styleUrls: ['./registro-intenciones.page.scss'],
})
export class RegistroIntencionesPage implements OnInit {

  Contador             = 0;
  plural:      boolean = true;
  intenciones: boolean = false;
  datos:       any;
  
  //Botones de los exvotos
  ButtonSaludFisica:      boolean = false;
  ButtonFamilia:          boolean = false;
  ButtonAccionGracias:   boolean = false;
  ButtonSaludEspiritual:  boolean = false;
  ButtonTrabajo:          boolean = false;
  ButtonFavor:            boolean = false;
  ButtonSantidad:         boolean = false;
  ButtonConversion:       boolean = false;
  ButtonPaz:              boolean = false;
  ButtonPerdon:           boolean = false;

  disableButtonContinuar: boolean = true;

  

  intentionName:  string;
  intentionNames: Array<string> = [];
  flag:   boolean = false;
  pasos:  boolean = false;
  tiempo: boolean = false;

  disableButtonSelectio:        boolean = false;
  disableButtonSelect:          boolean = false;
  disableButtonSaludFisica:     boolean = false;
  disableButtonFamilia:         boolean = false;
  disableButtonAccionGracias:  boolean = false;
  disableButtonSaludEspiritual: boolean = false;
  disableButtonTrabajo:         boolean = false;
  disableButtonFavor:           boolean = false;
  disableButtonSantidad:        boolean = false;
  disableButtonConversacion:    boolean = false;
  disableButtonPaz:             boolean = false;
  disableButtonPerdon:          boolean = false;

  constructor(private route: ActivatedRoute,private vibra: Vibration,public platform: Platform,
    private router: Router) { }

  userId:   any;
  name:     any;
  lastName: any;
  email:    any;
  password: any;
  avatar:   any;
  provedor: any;
    
    ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.datos = params;
      console.log(params);
      this.userId = params['userData'];
      this.name = params['name'];
      this.lastName = params['lastname'];
      this.email = params['email'];
      this.password = params['password'];
      this.avatar = params['avatar'];
      this.provedor = params['provedor'];
      console.log(this.userId);
      console.log(this.lastName);
      console.log(this.avatar);
      console.log(this.email);
      console.log(this.password);
    });
    this.check();
  }

  OnConfirmation() {
    this.disableButtonSelectio        = false;
    this.disableButtonSelect          = false;
    this.disableButtonSaludFisica     = false;
    this.disableButtonFamilia         = false;
    this.disableButtonAccionGracias  = false;
    this.disableButtonSaludEspiritual = false;
    this.disableButtonTrabajo         = false;
    this.disableButtonFavor           = false;
    this.disableButtonSantidad        = false;
    this.disableButtonConversacion    = false;
    this.disableButtonPaz             = false;
    this.disableButtonPerdon          = false;

    if (this.flag == true) {
      this.pasos = true;
    }
    else {
      this.tiempo = true;
    }

  }

  //Según el botón seleccionado se corrobora si hay mínimo un botón seleccionado, 
  //si es así se podrá seleccionar otro botón más pero nunca ningún botón.
  //Siempre irá a check()
  change(buttonName: string) {
    if (buttonName == 'Familia') {
      if (this.ButtonFamilia == false) {
        if (this.Contador != 3) {
          this.ButtonFamilia = true;
          this.Contador = this.Contador + 1;
          this.addIntention(buttonName);
          this.check();
        }
      } else {
        this.ButtonFamilia = false;
        this.Contador = this.Contador - 1;
        this.removeIntention(buttonName);
        this.check();
      }
    } else if (buttonName == 'Salud Física') {
      if (this.ButtonSaludFisica == false) {
        if (this.Contador != 3) {
          this.ButtonSaludFisica = true;
          this.Contador = this.Contador + 1;
          this.addIntention(buttonName);
          this.check();
        }
      } else {
        this.ButtonSaludFisica = false;
        this.Contador = this.Contador - 1;
        this.removeIntention(buttonName);
        this.check();
      }
    } else if (buttonName == 'Trabajo') {
      if (this.ButtonTrabajo == false) {
        if (this.Contador != 3) {
          this.ButtonTrabajo = true;
          this.Contador = this.Contador + 1;
          this.addIntention(buttonName);
          this.check();
        }
      } else {
        this.ButtonTrabajo = false;
        this.Contador = this.Contador - 1;
        this.removeIntention(buttonName);
        this.check();
      }
    } else if (buttonName == 'Salud Espiritual') {
      if (this.ButtonSaludEspiritual == false) {
        if (this.Contador != 3) {
          this.ButtonSaludEspiritual = true;
          this.Contador = this.Contador + 1;
          this.addIntention(buttonName);
          this.check();
        }
      } else {
        this.ButtonSaludEspiritual = false;
        this.Contador = this.Contador - 1;
        this.removeIntention(buttonName);
        this.check();
      }
    } else if (buttonName == 'Acción de Gracias') {
      if (this.ButtonAccionGracias == false) {
        if (this.Contador != 3) {
          this.ButtonAccionGracias = true;
          this.Contador = this.Contador + 1;
          this.addIntention(buttonName);
          this.check();
        }
      } else {
        this.ButtonAccionGracias = false;
        this.Contador = this.Contador - 1;
        this.removeIntention(buttonName);
        this.check();
      }
    } else if (buttonName == 'Paz') {
      if (this.ButtonPaz == false) {
        if (this.Contador != 3) {
          this.ButtonPaz = true;
          this.Contador = this.Contador + 1;
          this.addIntention(buttonName);
          this.check();
        }
      } else {
        this.ButtonPaz = false;
        this.Contador = this.Contador - 1;
        this.removeIntention(buttonName);
        this.check();
      }
    } else if (buttonName == 'Santidad') {
      if (this.ButtonSantidad == false) {
        if (this.Contador != 3) {
          this.ButtonSantidad = true;
          this.Contador = this.Contador + 1;
          this.addIntention(buttonName);
          this.check();
        }
      } else {
        this.ButtonSantidad = false;
        this.Contador = this.Contador - 1;
        this.removeIntention(buttonName);
        this.check();
      }
    } else if (buttonName == 'Perdón') {
      if (this.ButtonPerdon == false) {
        if (this.Contador != 3) {
          this.ButtonPerdon = true;
          this.Contador = this.Contador + 1;
          this.addIntention(buttonName);
          this.check();
        }
      } else {
        this.ButtonPerdon = false;
        this.Contador = this.Contador - 1;
        this.removeIntention(buttonName);
        this.check();
      }
    } else if (buttonName == 'Conversión') {
      if (this.ButtonConversion == false) {
        if (this.Contador != 3) {
          this.ButtonConversion = true;
          this.Contador = this.Contador + 1;
          this.addIntention(buttonName);
          this.check();
        }
      } else {
        this.ButtonConversion = false;
        this.Contador = this.Contador - 1;
        this.removeIntention(buttonName);
        this.check();
      }
    } else if (buttonName == 'Favor') {
      if (this.ButtonFavor == false) {
        if (this.Contador != 3) {
          this.ButtonFavor = true;
          this.Contador = this.Contador + 1;
          this.addIntention(buttonName);
          this.check();
        }
      } else {
        this.ButtonFavor = false;
        this.Contador = this.Contador - 1;
        this.removeIntention(buttonName);
        this.check();
      }
    }
  }

  //Revisa si el contador es igual a 0 para de esta forma habilidar o desabilitar el botón de continuar.
  check() {
    if (this.Contador == 0) {
      this.disableButtonContinuar = true;
      this.intenciones = false;
      this.plural = false;
    } else if (this.Contador == 1) {
      this.disableButtonContinuar = false;
      this.intenciones = true;
      this.plural = true;
    } else {
      this.disableButtonContinuar = false;
      this.intenciones = true;
      this.plural = false;
    }
  }

  onSteps() {
    this.flag = true;
    this.disableButtonSelectio = true;
  }
  onTime() {
    this.flag = false;
    this.disableButtonSelectio = true;
  }


  //Se agrega la intención
  addIntention(intention: string) {
    this.vibracion();
    this.intentionName = intention;
    this.intentionNames.push(this.intentionName);
    console.log(this.intentionNames);

    this.addIntentionInJsonFile();
    this.disableButton(intention);
  }

  //Se elimina la intención
  removeIntention(intention: string) {
    this.vibracion();
    for (var index = 0; index < this.intentionNames.length; index++) {
      if (this.intentionNames[index] === intention) {
        this.intentionNames.splice(index, 1);
      }
    }
    console.log('borrado');
    console.log(index);
    console.log(this.intentionNames);
    this.addIntentionInJsonFile();
  }

  //Se continua con el registro, registro-exvotos
  exvotos() {
    this.vibracion();
    //this.datos = this.datos.push({intenciones: this.intentionNames});
    this.router.navigate(['/registro-exvotos'],
      {
        queryParams: {
          userData: this.userId,
          name: this.name,
          lastname: this.lastName,
          avatar: this.avatar,
          intenciones: this.intentionNames,
          email: this.email,
          password: this.password,
          provedor: this.provedor,
        }
      });
  }

  //Se regresa al registro anterior, registro-cuenta
  back() {
    //this.db.database.ref('user/').set(this.selectedSlide.values)
    this.vibracion();
    this.router.navigate(['/registro-cuenta'],
      {
        queryParams: {
          userData: this.userId,
          name: this.name,
          lastname: this.lastName,
          email: this.email,
          password: this.password,
          provedor: this.provedor
        }
      });
  }

  addIntentionInJsonFile() {
    JSON.stringify(this.intentionNames);
    console.log(JSON.stringify(this.intentionNames));
    for (var intention of this.intentionNames) {
      console.log(intention);
    }
    console.log("--------------");

  }

  disableButton(buttonName: string): boolean {

    if (buttonName == 'Salud Fisica') {
      this.disableButtonSaludFisica = true;
    }

    else if (buttonName == 'Familia') {
      this.disableButtonFamilia = true;
    }

    else if (buttonName == 'Acción de Gracias') {
      this.disableButtonAccionGracias = true;
    }

    else if (buttonName == 'Salud Espiritual') {
      this.disableButtonSaludEspiritual = true;
    }

    else if (buttonName == 'Trabajo') {
      this.disableButtonTrabajo = true;
    }

    else if (buttonName == 'Favor') {
      this.disableButtonFavor = true;
    }

    else if (buttonName == 'Santidad') {
      this.disableButtonSantidad = true;
    }

    else if (buttonName == 'Conversacion') {
      this.disableButtonConversacion = true;
    }

    else if (buttonName == 'Paz') {
      this.disableButtonPaz = true;
    }

    else if (buttonName == 'Perdon') {
      this.disableButtonPerdon = true;
    }

    return false;
  }

  vibracion(){
    if (this.platform.is("android")) {
      this.vibra.vibrate([50]);
    }
  }
}
