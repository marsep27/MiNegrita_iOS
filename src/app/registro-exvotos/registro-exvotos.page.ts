import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../services/firestore/firestore.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';
import * as firebase from 'firebase';
import { auth } from 'firebase';
import { LoadingController } from '@ionic/angular';

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

  //Términos y condiciones
  terminoscondiciones:            string;
  terminoscondicionestext1:       string;
  terminoscondicionesGP:          string;
  terminoscondicionesGA:          string;
  terminoscondicionesFC:          string;
  terminoscondicionesF:           string;
  terminoscondicioneslinkGP:      string;
  terminoscondicioneslinkGA:      string;
  terminoscondicioneslinkFC:      string;
  terminoscondicioneslinkF:       string;
  terminoscondicionestext2:       string;
  terminoscondicionescambios:     string;
  terminoscondicionescambiostext: string;
  politicasprivacidad:            string;
  politicasprivacidadtext:        string;
  usoinformacion:                 string;
  usoinformaciontext:             string;
  politicasprivacidadGP:          string;
  politicasprivacidadGA:          string;
  politicasprivacidadFC:          string;
  politicasprivacidadF:           string;
  datosregistro:                  string;
  datosregistrotext:              string;
  cookies:                        string;
  cookiestext:                    string;
  proveedores:                    string;
  proveedorestext:                string;
  seguridad:                      string;
  seguridadtext:                  string;
  enlaces:                        string;
  enlacestext:                    string;
  privacidadninos:                string;
  privacidadninostext:            string;
  politicasprivacidadcambios:     string;
  politicasprivacidadcambiostext: string;
  contacto:                       string;
  contactotext:                   string;

  //Finalizar pantalla
  disableButtonFinalizar: boolean = true;

  constructor(private auth: AngularFireAuth, 
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    public auth2: AuthService,
    private router: Router,
    private firestoreService: FirestoreService,
    public platform: Platform,
    public loadingController: LoadingController,private vibra: Vibration) { }

  //Muestra en pantalla por unos segundos un spinner para indicar que la página se está cargando 
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'spinner',
      message: 'Espere por favor...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

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
    firebase.firestore().collection('terminoscondiciones').doc('politicas').onSnapshot((infoSnapshot) => {
      const info = infoSnapshot;
      this.terminoscondiciones = info.data().terminoscondiciones;
      this.terminoscondicionestext1 = info.data().terminoscondicionestext1;
      this.terminoscondicionesGP = info.data().terminoscondicionesGP;
      this.terminoscondicionesGA = info.data().terminoscondicionesGA;
      this.terminoscondicionesFC = info.data().terminoscondicionesFC;
      this.terminoscondicionesF = info.data().terminoscondicionesF;
      this.terminoscondicioneslinkGP = info.data().terminoscondicioneslinkGP;
      this.terminoscondicioneslinkGA = info.data().terminoscondicioneslinkGA;
      this.terminoscondicioneslinkFC = info.data().terminoscondicioneslinkFC;
      this.terminoscondicioneslinkF = info.data().terminoscondicioneslinkF;
      this.terminoscondicionestext2 = info.data().terminoscondicionestext2;
      this.terminoscondicionescambios = info.data().terminoscondicionescambios;
      this.terminoscondicionescambiostext = info.data().terminoscondicionescambiostext;
      this.politicasprivacidad = info.data().politicasprivacidad;
      this.politicasprivacidadtext = info.data().politicasprivacidadtext;
      this.usoinformacion = info.data().usoinformacion;
      this.usoinformaciontext = info.data().usoinformaciontext;
      this.politicasprivacidadGP = info.data().politicasprivacidadGP;
      this.politicasprivacidadGA = info.data().politicasprivacidadGA;
      this.politicasprivacidadFC = info.data().politicasprivacidadFC;
      this.politicasprivacidadF = info.data().politicasprivacidadF;
      this.datosregistro = info.data().datosregistro;
      this.datosregistrotext = info.data().datosregistrotext;
      this.cookies = info.data().cookies;
      this.cookiestext = info.data().cookiestext;
      this.proveedores = info.data().proveedores;
      this.proveedorestext = info.data().proveedorestext;
      this.seguridad = info.data().seguridad;
      this.seguridadtext = info.data().seguridadtext;
      this.enlaces = info.data().enlaces;
      this.enlacestext = info.data().enlacestext;
      this.privacidadninos = info.data().privacidadniños;
      this.privacidadninostext = info.data().privacidadniñostext;
      this.politicasprivacidadcambios = info.data().politicasprivacidadcambios;
      this.politicasprivacidadcambiostext = info.data().politicasprivacidadcambiostext;
      this.contacto = info.data().contacto;
      this.contactotext = info.data().contactotext;
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
    this.vibracion();
    this.exvotoName = exvoto;
    this.exvotoNames.push(this.exvotoName);
    console.log(this.exvotoNames);

    this.addIntentionInJsonFile();
  }

  //Se remueve el exvoto
  removeExvoto(exvoto) {
    this.vibracion();
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

  //Tras haber seleccionado los exvotos, se aceptan términos y condiciones
  terminosCondiciones(){
    document.getElementById("TerminosCondiciones").style.bottom = "5vh";
    document.getElementById("contentEx").style.filter = "blur(2px)";
    document.getElementById("footEx").style.filter = "blur(2px)";
  }

  //Tras haber aceptado términos y condiciones, se finaliza con el registro
  finalizar() {
    this.vibracion();
    this.romeriasCompletadas = 0;
    this.totalHoras = 0;
    this.pasosTotales = 0;
    this.kmTotales = 0;
    this.romeriaActiva = false;

    //this.db.database.ref('user/'+this.userId).set(this.datosfinales);
    if (this.provedor == "Facebook") {
      if (this.platform.is("cordova")) { //Si la plaforma es cordova muestra la siguiente información
        this.auth2.loginFacebook().then((res) => {
          this.userId = res.user.uid;
          this.presentLoading();
          this.lastName = "";
          this.datosfinales = {
            userId: this.userId,
            name: this.name,
            lastname: this.lastName,
            avatar: this.avatar,
            intenciones: this.intenciones,
            exvotos: this.exvotoNames
          };
          this.firestoreService.createUser(this.datosfinales);
          this.firestoreService.createRomeriaXUser(this.userId, this.romeriasCompletadas, this.totalHoras, this.pasosTotales, this.kmTotales, this.romeriaActiva);
          this.router.navigate(['/perfil']);
        })
      } else { //Si la plaforma no es cordova muestra la siguiente información
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(result => {
          this.userId = result.user.uid;
          this.presentLoading();
          this.lastName = "";
          this.datosfinales = {
            userId: this.userId,
            name: this.name,
            lastname: this.lastName,
            avatar: this.avatar,
            intenciones: this.intenciones,
            exvotos: this.exvotoNames
          };
          this.firestoreService.createUser(this.datosfinales);
          this.firestoreService.createRomeriaXUser(this.userId, this.romeriasCompletadas, this.totalHoras, this.pasosTotales, this.kmTotales, this.romeriaActiva);
          this.router.navigate(['/perfil']);
        })
      }
    } else if (this.provedor == "Google") {
      if (this.platform.is("cordova")) {//Si la plaforma es cordova muestra la siguiente información
        this.auth2.loginGoogle().then((res) => {
          this.userId = res.user.uid;
          this.presentLoading();
          this.lastName = ""
          this.datosfinales = {
            userId: this.userId,
            name: this.name,
            lastname: this.lastName,
            avatar: this.avatar,
            intenciones: this.intenciones,
            exvotos: this.exvotoNames
          };
          this.firestoreService.createUser(this.datosfinales);
          this.firestoreService.createRomeriaXUser(this.userId, this.romeriasCompletadas, this.totalHoras, this.pasosTotales, this.kmTotales, this.romeriaActiva);
          this.router.navigate(['/perfil']);
        })
      } else { //Si la plaforma no es cordova muestra la siguiente información
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(result => {
          this.userId = result.user.uid;
          this.presentLoading();
          this.lastName = ""
          this.datosfinales = {
            userId: this.userId,
            name: this.name,
            lastname: this.lastName,
            avatar: this.avatar,
            intenciones: this.intenciones,
            exvotos: this.exvotoNames
          };
          this.firestoreService.createUser(this.datosfinales);
          this.firestoreService.createRomeriaXUser(this.userId, this.romeriasCompletadas, this.totalHoras, this.pasosTotales, this.kmTotales, this.romeriaActiva);
          this.router.navigate(['/perfil']);
        })
      }
    } else {
      this.auth.createUserWithEmailAndPassword(this.email, this.password).then(userData=>{
        this.userId = userData.user.uid;
        this.datosfinales = {
          userId: this.userId,
          name: this.name,
          lastname: this.lastName,
          avatar: this.avatar,
          intenciones: this.intenciones,
          exvotos: this.exvotoNames
        };
        this.firestoreService.createUser(this.datosfinales);
        this.firestoreService.createRomeriaXUser(this.userId, this.romeriasCompletadas, this.totalHoras, this.pasosTotales, this.kmTotales, this.romeriaActiva);
        this.auth.signInWithEmailAndPassword(
          this.email, this.password
        ).then(userData => {
          var user = firebase.auth().currentUser;
          console.log(userData);
          console.log(user.uid);
          this.presentLoading();
          this.router.navigate(['/perfil']);
        });
      });
    }
  }

  //Se regresa a registro-intenciones
  back() {
    this.vibracion();
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

  //Se cancelan los Términos y condiciones y se redirige al home
  cancelar(){
    this.vibracion();
    this.presentLoading();
    document.getElementById("TerminosCondiciones").style.bottom = "-1000px";
    document.getElementById("contentEx").style.filter = "none";
    document.getElementById("footEx").style.filter = "none";
    this.buttonCuerpo = true;
    this.buttonPierna = true;
    this.buttonCorazon = true;
    this.buttonEsqueleto = true;
    this.buttonSistdigestivo = true;
    this.buttonPulmones = true;
    this.buttonOjo = true;
    this.buttonBebe = true;
    this.buttonPechos = true;
    this.buttonOreja = true;
    this.buttonCabeza = true;
    this.buttonBrazo = true;
    this.buttonCostaRica = true;
    this.buttonMatrimonio = true;
    this.buttonCasa = true;
    this.buttonEstudios = true;
    this.router.navigate(['/home']);
  }

  addIntentionInJsonFile() {
    JSON.stringify(this.exvotoNames);
    console.log(JSON.stringify(this.exvotoNames));
    for (var exvoto of this.exvotoNames) {
      console.log(exvoto);
    }
    console.log("--------------");
  }

  terminos(option){
    this.vibracion();
    switch (option) {
      case 'GP':
        window.open(this.terminoscondicioneslinkGP);
        break;
      case 'GA':
        window.open(this.terminoscondicioneslinkGA);
        break;
      case 'FC':
        window.open(this.terminoscondicioneslinkFC);
        break;
      case 'F':
        window.open(this.terminoscondicioneslinkF);
        break;
    }
  }

  privacidad(option){
    this.vibracion();
    switch (option) {
      case 'GP':
        window.open(this.politicasprivacidadGP);
        break;
      case 'GA':
        window.open(this.politicasprivacidadGA);
        break;
      case 'FC':
        window.open(this.politicasprivacidadFC);
        break;
      case 'F':
        window.open(this.politicasprivacidadF);
        break;
    }
  }

  vibracion(){
    if (this.platform.is("android")) {
      this.vibra.vibrate([50]);
    }
  }
}
