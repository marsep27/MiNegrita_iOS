import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../services/firestore/firestore.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-registro-exvotos',
  templateUrl: './registro-exvotos.page.html',
  styleUrls: ['./registro-exvotos.page.scss'],
})
export class RegistroExvotosPage implements OnInit {

  //Botones de los exvotos
  buttonCuerpo:         boolean = true;
  buttonPierna:         boolean = true;
  buttonCorazon:        boolean = true;
  buttonEsqueleto:      boolean = true;
  buttonSistdigestivo:  boolean = true;
  buttonPulmones:       boolean = true;
  buttonOjo:            boolean = true;
  buttonBebe:           boolean = true;
  buttonPechos:         boolean = true;
  buttonOreja:          boolean = true;
  buttonCabeza:         boolean = true;
  buttonBrazo:          boolean = true;
  buttonCostaRica:      boolean = true;
  buttonMatrimonio:     boolean = true;
  buttonCasa:           boolean = true;
  buttonEstudios:       boolean = true;

  exvotoName:  string;
  exvotoNames: Array<string> = [];

  datosfinales:        any;
  userId:              any;
  name:                any;
  lastName:            any;
  email:               any;
  password:            any;
  avatar:              any;
  provedor:            any;
  intenciones:         any;
  romeriasCompletadas: number;
  totalHoras:          number;
  pasosTotales:        number;
  kmTotales:           number;
  romeriaActiva:       boolean;

  //Contadores
  Contador        = 0;
  plural: boolean = true;

  //Finalizar pantalla
  disableButtonFinalizar: boolean = true;

  constructor(private auth: AngularFireAuth, 
    private route: ActivatedRoute,
    private db: AngularFireDatabase, 
    private router: Router,
    private firestoreService: FirestoreService) { }

  ngOnInit() {
    //Se obtienen los datos del registro anterior registro-intenciones
    this.route.queryParams.subscribe(params => {
      this.datosfinales = params;
      console.log(params);
      this.userId = params['userData'];
      this.name = params['name'];
      this.lastName = params['lastname'];
      this.email = params['email'];
      this.password = params['password'];
      this.provedor = params['provedor'];
      this.avatar = params['avatar'];
      this.intenciones = params['intenciones'];
      console.log(this.userId);
      console.log(this.lastName);
      console.log(this.avatar);
      console.log(this.intenciones);
      console.log(this.email);
      console.log(this.password);
    });
    this.contador();
  }

  //Según el exvoto seleccionado se corrobora si ya hay 5 botones seleccionados, 
  //si es así no dejará seleccionar ningún otro botón más.
  //Siempre irá a revisar()
  seleccionar(buttonName: string, src: string) {
    if (buttonName == 'Cuerpo') {
      if (this.buttonCuerpo == true) {
        if (this.Contador != 5) {
          this.buttonCuerpo = false;
          this.Contador = this.Contador + 1;
          this.addExvoto(src);
          this.revisar();
        }
      } else {
        this.buttonCuerpo = true;
        this.Contador = this.Contador - 1;
        this.removeExvoto(src);
        this.revisar();
      }
    } else if (buttonName == 'Pierna') {
      if (this.buttonPierna == true) {
        if (this.Contador != 5) {
          this.buttonPierna = false;
          this.Contador = this.Contador + 1;
          this.addExvoto(src);
          this.revisar();
        }
      } else {
        this.buttonPierna = true;
        this.Contador = this.Contador - 1;
        this.removeExvoto(src);
        this.revisar();
      }
    } else if (buttonName == 'Corazón') {
      if (this.buttonCorazon == true) {
        if (this.Contador != 5) {
          this.buttonCorazon = false;
          this.Contador = this.Contador + 1;
          this.addExvoto(src);
          this.revisar();
        }
      } else {
        this.buttonCorazon = true;
        this.Contador = this.Contador - 1;
        this.removeExvoto(src);
        this.revisar();
      }
    } else if (buttonName == 'Esqueleto') {
      if (this.buttonEsqueleto == true) {
        if (this.Contador != 5) {
          this.buttonEsqueleto = false;
          this.Contador = this.Contador + 1;
          this.addExvoto(src);
          this.revisar();
        }
      } else {
        this.buttonEsqueleto = true;
        this.Contador = this.Contador - 1;
        this.removeExvoto(src);
        this.revisar();
      }
    } else if (buttonName == 'SistDigestivo') {
      if (this.buttonSistdigestivo == true) {
        if (this.Contador != 5) {
          this.buttonSistdigestivo = false;
          this.Contador = this.Contador + 1;
          this.addExvoto(src);
          this.revisar();
        }
      } else {
        this.buttonSistdigestivo = true;
        this.Contador = this.Contador - 1;
        this.removeExvoto(src);
        this.revisar();
      }
    } else if (buttonName == 'Pulmones') {
      if (this.buttonPulmones == true) {
        if (this.Contador != 5) {
          this.buttonPulmones = false;
          this.Contador = this.Contador + 1;
          this.addExvoto(src);
          this.revisar();
        }
      } else {
        this.buttonPulmones = true;
        this.Contador = this.Contador - 1;
        this.removeExvoto(src);
        this.revisar();
      }
    } else if (buttonName == 'Ojo') {
      if (this.buttonOjo == true) {
        if (this.Contador != 5) {
          this.buttonOjo = false;
          this.Contador = this.Contador + 1;
          this.addExvoto(src);
          this.revisar();
        }
      } else {
        this.buttonOjo = true;
        this.Contador = this.Contador - 1;
        this.removeExvoto(src);
        this.revisar();
      }
    } else if (buttonName == 'Bebé') {
      if (this.buttonBebe == true) {
        if (this.Contador != 5) {
          this.buttonBebe = false;
          this.Contador = this.Contador + 1;
          this.addExvoto(src);
          this.revisar();
        }
      } else {
        this.buttonBebe = true;
        this.Contador = this.Contador - 1;
        this.removeExvoto(src);
        this.revisar();
      }
    } else if (buttonName == 'Pechos') {
      if (this.buttonPechos == true) {
        if (this.Contador != 5) {
          this.buttonPechos = false;
          this.Contador = this.Contador + 1;
          this.addExvoto(src);
          this.revisar();
        }
      } else {
        this.buttonPechos = true;
        this.Contador = this.Contador - 1;
        this.removeExvoto(src);
        this.revisar();
      }
    } else if (buttonName == 'Oreja') {
      if (this.buttonOreja == true) {
        if (this.Contador != 5) {
          this.buttonOreja = false;
          this.Contador = this.Contador + 1;
          this.addExvoto(src);
          this.revisar();
        }
      } else {
        this.buttonOreja = true;
        this.Contador = this.Contador - 1;
        this.removeExvoto(src);
        this.revisar();
      }
    } else if (buttonName == 'Cabeza') {
      if (this.buttonCabeza == true) {
        if (this.Contador != 5) {
          this.buttonCabeza = false;
          this.Contador = this.Contador + 1;
          this.addExvoto(src);
          this.revisar();
        }
      } else {
        this.buttonCabeza = true;
        this.Contador = this.Contador - 1;
        this.removeExvoto(src);
        this.revisar();
      }
    } else if (buttonName == 'Brazo') {
      if (this.buttonBrazo == true) {
        if (this.Contador != 5) {
          this.buttonBrazo = false;
          this.Contador = this.Contador + 1;
          this.addExvoto(src);
          this.revisar();
        }
      } else {
        this.buttonBrazo = true;
        this.Contador = this.Contador - 1;
        this.removeExvoto(src);
        this.revisar();
      }
    } else if (buttonName == 'CostaRica') {
      if (this.buttonCostaRica == true) {
        if (this.Contador != 5) {
          this.buttonCostaRica = false;
          this.Contador = this.Contador + 1;
          this.addExvoto(src);
          this.revisar();
        }
      } else {
        this.buttonCostaRica = true;
        this.Contador = this.Contador - 1;
        this.removeExvoto(src);
        this.revisar();
      }
    } else if (buttonName == 'Matrimonio') {
      if (this.buttonMatrimonio == true) {
        if (this.Contador != 5) {
          this.buttonMatrimonio = false;
          this.Contador = this.Contador + 1;
          this.addExvoto(src);
          this.revisar();
        }
      } else {
        this.buttonMatrimonio = true;
        this.Contador = this.Contador - 1;
        this.removeExvoto(src);
        this.revisar();
      }
    } else if (buttonName == 'Casa') {
      if (this.buttonCasa == true) {
        if (this.Contador != 5) {
          this.buttonCasa = false;
          this.Contador = this.Contador + 1;
          this.addExvoto(src);
          this.revisar();
        }
      } else {
        this.buttonCasa = true;
        this.Contador = this.Contador - 1;
        this.removeExvoto(src);
        this.revisar();
      }
    } else if (buttonName == 'Estudios') {
      if (this.buttonEstudios == true) {
        if (this.Contador != 5) {
          this.buttonEstudios = false;
          this.Contador = this.Contador + 1;
          this.addExvoto(src);
          this.revisar();
        }
      } else {
        this.buttonEstudios = true;
        this.Contador = this.Contador - 1;
        this.removeExvoto(src);
        this.revisar();
      }
    }
  }

  //Se encarga de revisar si el contador está en 1,2,3,4 ó 5, 
  //de esta forma se deshabilitará el poder selecionar más de 5 botones.
  //Siempre irá a contador().
  revisar() {
    if ((this.Contador == 1) || (this.Contador == 2) || (this.Contador == 3) || (this.Contador == 4) || (this.Contador == 5)) {
      this.disableButtonFinalizar = false;
      this.contador();
    } else {
      this.disableButtonFinalizar = true;
      this.contador();
    }
  }

  //Revisara si el contador es diferente de cero para indicarle al usuario cuantos exvotos lleva seleccionados.
  contador() {
    if (this.Contador != 1) {
      this.plural = false;
    } else {
      this.plural = true;
    }
  }

  //Se agrega el exvoto
  addExvoto(exvoto) {
    this.exvotoName = exvoto;
    this.exvotoNames.push(this.exvotoName);
    console.log(this.exvotoNames);

    this.addIntentionInJsonFile();
  }

  //Se remueve el exvoto
  removeExvoto(exvoto) {
    for (var index = 0; index < this.exvotoNames.length; index++) {
      if (this.exvotoNames[index] == exvoto) {
        this.exvotoNames.splice(index, 1);
      }
    }
    console.log('borrado');
    console.log(index);
    console.log(this.exvotoNames);
    this.addIntentionInJsonFile();
  }

  //Tras haber seleccionado los exvotos, se finaliza con el registro
  finalizar() {
    this.romeriasCompletadas = 0;
    this.totalHoras = 0;
    this.pasosTotales = 0;
    this.kmTotales = 0;
    this.romeriaActiva = false;
    this.datosfinales = {
      userId: this.userId,
      name: this.name,
      lastname: this.lastName,
      avatar: this.avatar,
      intenciones: this.intenciones,
      exvotos: this.exvotoNames
    };
    console.log(this.datosfinales);
    console.log(this.email);
    console.log(this.password);

    //this.db.database.ref('user/'+this.userId).set(this.datosfinales);
    if (this.provedor == "Facebook") {
      this.lastName = "";
      this.datosfinales = {
        userId: this.userId,
        name: this.name,
        lastname: this.lastName,
        avatar: this.avatar,
        intenciones: this.intenciones,
        exvotos: this.exvotoNames
      };
      //const provider = new firebase.auth.FacebookAuthProvider();
      this.firestoreService.createUser(this.datosfinales);
      this.firestoreService.createRomeriaXUser(this.userId, this.romeriasCompletadas, this.totalHoras, this.pasosTotales, this.kmTotales, this.romeriaActiva);
      //firebase.auth();
      this.router.navigate(['/perfil']);
    } else if (this.provedor == "Google") {
      this.lastName = ""
      this.datosfinales = {
        userId: this.userId,
        name: this.name,
        lastname: this.lastName,
        avatar: this.avatar,
        intenciones: this.intenciones,
        exvotos: this.exvotoNames
      };
      //const provider = new firebase.auth.GoogleAuthProvider();
      this.firestoreService.createUser(this.datosfinales);
      this.firestoreService.createRomeriaXUser(this.userId, this.romeriasCompletadas, this.totalHoras, this.pasosTotales, this.kmTotales, this.romeriaActiva);
      //firebase.auth();
      this.router.navigate(['/perfil']);
    } else {
      this.firestoreService.createUser(this.datosfinales);
      this.firestoreService.createRomeriaXUser(this.userId, this.romeriasCompletadas, this.totalHoras, this.pasosTotales, this.kmTotales, this.romeriaActiva)
      this.auth.signInWithEmailAndPassword(
        this.email, this.password
      ).then(userData => {
        var user = firebase.auth().currentUser;
        console.log(userData);
        console.log(user.uid);
        this.router.navigate(['/perfil']);
      });
    }
  }

  //Se regresa a registro-intenciones
  back() {
    this.router.navigate(['/registro-intenciones'],
      {
        queryParams: {
          userData: this.userId,
          name: this.name,
          lastname: this.lastName,
          email: this.email,
          password: this.password,
          avatar: this.avatar,
          provedor: this.provedor,
        }
      });
  }


  addIntentionInJsonFile() {
    JSON.stringify(this.exvotoNames);
    console.log(JSON.stringify(this.exvotoNames));
    for (var exvoto of this.exvotoNames) {
      console.log(exvoto);
    }
    console.log("--------------");

  }
}
