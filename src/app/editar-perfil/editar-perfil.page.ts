import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { FirestoreService } from '../services/firestore/firestore.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  contentLoaded = false;

  name:                       string = "";
  lastName:                   string = "";
  avatar:                     string = "";
  sigAvatar:                  string = "";
  prevAvatar:                 string = "";
  exvotos:                    string[] = [];
  intenciones:                string[] = [];
  currentAvatarIndex:         number = 0;
  avatarList:                 string[] = ["/assets/imágenes/avatar1.svg", "/assets/imágenes/avatar2.svg", "/assets/imágenes/avatar3.svg", "/assets/imágenes/avatar4.svg", "/assets/imágenes/avatar5.svg", "/assets/imágenes/avatar6.svg"];
  ContadorEx:                 number;
  Contador:                   number;
  cuerpoSelected:             boolean = true;
  piernaSelected:             boolean = true;
  corazonSelected:            boolean = true;
  esqueletoSelected:          boolean = true;
  digestivoSelected:          boolean = true;
  pulmonesSelected:           boolean = true;
  ojoSelected:                boolean = true;
  embarazoSelected:           boolean = true;
  pechosSelected:             boolean = true;
  orejaSelected:              boolean = true;
  cabezaSelected:             boolean = true;
  brazoSelected:              boolean = true;
  paisSelected:               boolean = true;
  matrimonioSelected:         boolean = true;
  casaSelected:               boolean = true;
  estudiosSelected:           boolean = true;
  exvotoName:                 string = "";
  intentionName:              string = "";
  saludFisicaSelected:        boolean = false;
  familiaSelected:            boolean = false;
  accionGraciasSelected:     boolean = false;
  saludEspiritualSelected:    boolean = false;
  trabajoSelected:            boolean = false;
  favorSelected:              boolean = false;
  santidadSelected:           boolean = false;
  conversionSelected:         boolean = false;
  pazSelected:                boolean = false;
  perdonSelected:             boolean = false;
  intentionsSelected:         boolean = false;

  constructor(private firestoreService: FirestoreService, private router: Router) {
    setTimeout(() => {
      this.contentLoaded = true
    }, 2000);
  }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    //Obtener el usuario actual
    this.firestoreService.getUser(firebase.auth().currentUser.uid).pipe(take(1)).subscribe((userSnapshot) => {
      const userData = userSnapshot.payload.data();
      this.getUserInfo(userData);
    });
  }

  //Obtener la información del usuario actual
  getUserInfo = (info: any) => {
    this.name = info.name;
    this.lastName = info.lastname;
    this.avatar = info.avatar;
    this.exvotos = info.exvotos;
    this.initializeExvotesValues();
    this.intenciones = info.intenciones;
    this.initializeIntentionsValues();
    if (this.intenciones.length > 0) this.intentionsSelected = true;
    this.currentAvatarIndex = this.avatarList.indexOf(this.avatar);
    if (this.currentAvatarIndex == 0) this.prevAvatar = this.avatarList[this.avatarList.length - 1];
    else this.prevAvatar = this.avatarList[this.currentAvatarIndex - 1];
    if (this.currentAvatarIndex == 5) this.sigAvatar = this.avatarList[0];
    else this.sigAvatar = this.avatarList[this.currentAvatarIndex + 1];
  }

  //update info in firebase db
  saveChanges() {
    const updatedData = {
      name: this.name,
      lastname: this.lastName,
      avatar: this.avatar,
      intenciones: this.intenciones,
      exvotos: this.exvotos
    };

    this.firestoreService.updateUser(firebase.auth().currentUser.uid, updatedData);

  }

  //devolverse al perfil
  goBackToProfile() {
    this.router.navigate(['/perfil']);
  }

  //Ir al avatar anterior
  previousAvatar() {
    this.currentAvatarIndex = this.avatarList.indexOf(this.prevAvatar);
    this.avatar = this.avatarList[this.currentAvatarIndex];
    if (this.currentAvatarIndex == 0) this.prevAvatar = this.avatarList[this.avatarList.length - 1];
    else this.prevAvatar = this.avatarList[this.currentAvatarIndex - 1];
    if (this.currentAvatarIndex == 5) this.sigAvatar = this.avatarList[0];
    else this.sigAvatar = this.avatarList[this.currentAvatarIndex + 1];
  }

  //Ir al avatar siguiente
  nextAvatar() {
    this.currentAvatarIndex = this.avatarList.indexOf(this.sigAvatar);
    this.avatar = this.avatarList[this.currentAvatarIndex];
    if (this.currentAvatarIndex == 0) this.prevAvatar = this.avatarList[this.avatarList.length - 1];
    else this.prevAvatar = this.avatarList[this.currentAvatarIndex - 1];
    if (this.currentAvatarIndex == 5) this.sigAvatar = this.avatarList[0];
    else this.sigAvatar = this.avatarList[this.currentAvatarIndex + 1];
  }

  //Inicializa los exvotos del usuario
  initializeExvotesValues() {
    console.log(this.exvotos.length);
    this.ContadorEx = this.exvotos.length;
    var exvote: string;
    for (exvote of this.exvotos) {
      this.updateBaseExvotes(exvote);
    }
  }

  updateBaseExvotes(exvote: string) {
    switch (exvote) {
      case "/assets/imágenes/Cuerpo.svg":
        this.cuerpoSelected = !this.cuerpoSelected;
        return this.cuerpoSelected;
      case "/assets/imágenes/Pierna.svg":
        this.piernaSelected = !this.piernaSelected;
        return this.piernaSelected;
      case "/assets/imágenes/Corazón.svg":
        this.corazonSelected = !this.corazonSelected;
        return this.corazonSelected;
      case "/assets/imágenes/Esqueleto.svg":
        this.esqueletoSelected = !this.esqueletoSelected;
        return this.esqueletoSelected;
      case "/assets/imágenes/SistDigestivo.svg":
        this.digestivoSelected = !this.digestivoSelected;
        return this.digestivoSelected;
      case "/assets/imágenes/Pulmones.svg":
        this.pulmonesSelected = !this.pulmonesSelected;
        return this.pulmonesSelected;
      case "/assets/imágenes/Ojo.svg":
        this.ojoSelected = !this.ojoSelected;
        return this.ojoSelected;
      case "/assets/imágenes/Bebe.svg":
        this.embarazoSelected = !this.embarazoSelected;
        return this.embarazoSelected;
      case "/assets/imágenes/Pechos.svg":
        this.pechosSelected = !this.pechosSelected;
        return this.pechosSelected;
      case "/assets/imágenes/Oreja.svg":
        this.orejaSelected = !this.orejaSelected;
        return this.orejaSelected;
      case "/assets/imágenes/Cabeza.svg":
        this.cabezaSelected = !this.cabezaSelected;
        return this.cabezaSelected;
      case "/assets/imágenes/Brazo.svg":
        this.brazoSelected = !this.brazoSelected;
        return this.brazoSelected;
      case "/assets/imágenes/CostaRica.svg":
        this.paisSelected = !this.paisSelected;
        return this.paisSelected;
      case "/assets/imágenes/Matrimonio.svg":
        this.matrimonioSelected = !this.matrimonioSelected;
        return this.matrimonioSelected;
      case "/assets/imágenes/Casa.svg":
        this.casaSelected = !this.casaSelected;
        return this.casaSelected;
      case "/assets/imágenes/Estudios.svg":
        this.estudiosSelected = !this.estudiosSelected;
        return this.estudiosSelected;
      default:
        return false;
    }
  }

  //Según el exvoto seleccionado se corrobora si ya hay 5 botones seleccionados, 
  //si es así no dejará seleccionar ningún otro botón más.
  updateExvotes(src: string) {
    if (src == '/assets/imágenes/Cuerpo.svg') {
      if (this.cuerpoSelected == true) {
        if (this.ContadorEx != 5) {
          this.cuerpoSelected = false;
          this.ContadorEx = this.ContadorEx + 1;
          this.addExvoto(src);
        }
      } else {
        this.cuerpoSelected = true;
        this.ContadorEx = this.ContadorEx - 1;
        this.removeExvoto(src);
      }
    } else if (src == '/assets/imágenes/Pierna.svg') {
      if (this.piernaSelected == true) {
        if (this.ContadorEx != 5) {
          this.piernaSelected = false;
          this.ContadorEx = this.ContadorEx + 1;
          this.addExvoto(src);
        }
      } else {
        this.piernaSelected = true;
        this.ContadorEx = this.ContadorEx - 1;
        this.removeExvoto(src);
      }
    } else if (src == '/assets/imágenes/Corazón.svg') {
      if (this.corazonSelected == true) {
        if (this.ContadorEx != 5) {
          this.corazonSelected = false;
          this.ContadorEx = this.ContadorEx + 1;
          this.addExvoto(src);
        }
      } else {
        this.corazonSelected = true;
        this.ContadorEx = this.ContadorEx - 1;
        this.removeExvoto(src);
      }
    } else if (src == '/assets/imágenes/Esqueleto.svg') {
      if (this.esqueletoSelected == true) {
        if (this.ContadorEx != 5) {
          this.esqueletoSelected = false;
          this.ContadorEx = this.ContadorEx + 1;
          this.addExvoto(src);
        }
      } else {
        this.esqueletoSelected = true;
        this.ContadorEx = this.ContadorEx - 1;
        this.removeExvoto(src);
      }
    } else if (src == '/assets/imágenes/SistDigestivo.svg') {
      if (this.digestivoSelected == true) {
        if (this.ContadorEx != 5) {
          this.digestivoSelected = false;
          this.ContadorEx = this.ContadorEx + 1;
          this.addExvoto(src);
        }
      } else {
        this.digestivoSelected = true;
        this.ContadorEx = this.ContadorEx - 1;
        this.removeExvoto(src);
      }
    } else if (src == '/assets/imágenes/Pulmones.svg') {
      if (this.pulmonesSelected == true) {
        if (this.ContadorEx != 5) {
          this.pulmonesSelected = false;
          this.ContadorEx = this.ContadorEx + 1;
          this.addExvoto(src);
        }
      } else {
        this.pulmonesSelected = true;
        this.ContadorEx = this.ContadorEx - 1;
        this.removeExvoto(src);
      }
    } else if (src == '/assets/imágenes/Ojo.svg') {
      if (this.ojoSelected == true) {
        if (this.ContadorEx != 5) {
          this.ojoSelected = false;
          this.ContadorEx = this.ContadorEx + 1;
          this.addExvoto(src);
        }
      } else {
        this.ojoSelected = true;
        this.ContadorEx = this.ContadorEx - 1;
        this.removeExvoto(src);
      }
    } else if (src == '/assets/imágenes/Bebe.svg') {
      if (this.embarazoSelected == true) {
        if (this.ContadorEx != 5) {
          this.embarazoSelected = false;
          this.ContadorEx = this.ContadorEx + 1;
          this.addExvoto(src);
        }
      } else {
        this.embarazoSelected = true;
        this.ContadorEx = this.ContadorEx - 1;
        this.removeExvoto(src);
      }
    } else if (src == '/assets/imágenes/Pechos.svg') {
      if (this.pechosSelected == true) {
        if (this.ContadorEx != 5) {
          this.pechosSelected = false;
          this.ContadorEx = this.ContadorEx + 1;
          this.addExvoto(src);
        }
      } else {
        this.pechosSelected = true;
        this.ContadorEx = this.ContadorEx - 1;
        this.removeExvoto(src);
      }
    } else if (src == '/assets/imágenes/Oreja.svg') {
      if (this.orejaSelected == true) {
        if (this.ContadorEx != 5) {
          this.orejaSelected = false;
          this.ContadorEx = this.ContadorEx + 1;
          this.addExvoto(src);
        }
      } else {
        this.orejaSelected = true;
        this.ContadorEx = this.ContadorEx - 1;
        this.removeExvoto(src);
      }
    } else if (src == '/assets/imágenes/Cabeza.svg') {
      if (this.cabezaSelected == true) {
        if (this.ContadorEx != 5) {
          this.cabezaSelected = false;
          this.ContadorEx = this.ContadorEx + 1;
          this.addExvoto(src);
        }
      } else {
        this.cabezaSelected = true;
        this.ContadorEx = this.ContadorEx - 1;
        this.removeExvoto(src);
      }
    } else if (src == '/assets/imágenes/Brazo.svg') {
      if (this.brazoSelected == true) {
        if (this.ContadorEx != 5) {
          this.brazoSelected = false;
          this.ContadorEx = this.ContadorEx + 1;
          this.addExvoto(src);
        }
      } else {
        this.brazoSelected = true;
        this.ContadorEx = this.ContadorEx - 1;
        this.removeExvoto(src);
      }
    } else if (src == '/assets/imágenes/CostaRica.svg') {
      if (this.paisSelected == true) {
        if (this.ContadorEx != 5) {
          this.paisSelected = false;
          this.ContadorEx = this.ContadorEx + 1;
          this.addExvoto(src);
        }
      } else {
        this.paisSelected = true;
        this.ContadorEx = this.ContadorEx - 1;
        this.removeExvoto(src);
      }
    } else if (src == '/assets/imágenes/Matrimonio.svg') {
      if (this.matrimonioSelected == true) {
        if (this.ContadorEx != 5) {
          this.matrimonioSelected = false;
          this.ContadorEx = this.ContadorEx + 1;
          this.addExvoto(src);
        }
      } else {
        this.matrimonioSelected = true;
        this.ContadorEx = this.ContadorEx - 1;
        this.removeExvoto(src);
      }
    } else if (src == '/assets/imágenes/Casa.svg') {
      if (this.casaSelected == true) {
        if (this.ContadorEx != 5) {
          this.casaSelected = false;
          this.ContadorEx = this.ContadorEx + 1;
          this.addExvoto(src);
        }
      } else {
        this.casaSelected = true;
        this.ContadorEx = this.ContadorEx - 1;
        this.removeExvoto(src);
      }
    } else if (src == '/assets/imágenes/Estudios.svg') {
      if (this.estudiosSelected == true) {
        if (this.ContadorEx != 5) {
          this.estudiosSelected = false;
          this.ContadorEx = this.ContadorEx + 1;
          this.addExvoto(src);
        }
      } else {
        this.estudiosSelected = true;
        this.ContadorEx = this.ContadorEx - 1;
        this.removeExvoto(src);
      }
    }
  }

  addExvoto(exvoto) {
    this.exvotoName = exvoto;
    this.exvotos.push(this.exvotoName);
    console.log(this.exvotos);

    this.addIntentionInJsonFileEx();
  }

  removeExvoto(exvoto) {
    for (var index = 0; index < this.exvotos.length; index++) {
      if (this.exvotos[index] == exvoto) {
        this.exvotos.splice(index, 1);
      }
    }
    console.log('borrado');
    console.log(index);
    console.log(this.exvotos);
    this.addIntentionInJsonFileEx();
  }

  addIntentionInJsonFileEx() {
    JSON.stringify(this.exvotos);
    console.log(JSON.stringify(this.exvotos));
    for (var exvoto of this.exvotos) {
      console.log(exvoto);
    }
    console.log("--------------");

  }

  //Según el botón seleccionado se corrobora si hay mínimo un botón seleccionado, 
  //si es así se podrá seleccionar otro botón más pero nunca ningún botón.
  updateIntention(buttonName: string) {
    if (buttonName == 'Familia') {
      if (this.familiaSelected == false) {
        if (this.Contador != 3) {
          this.familiaSelected = true;
          this.Contador = this.Contador + 1;
          this.addIntention(buttonName);
        }
      } else {
        this.familiaSelected = false;
        this.Contador = this.Contador - 1;
        this.removeIntention(buttonName);
      }
    } else if (buttonName == 'Salud Física') {
      if (this.saludFisicaSelected == false) {
        if (this.Contador != 3) {
          this.saludFisicaSelected = true;
          this.Contador = this.Contador + 1;
          this.addIntention(buttonName);
        }
      } else {
        this.saludFisicaSelected = false;
        this.Contador = this.Contador - 1;
        this.removeIntention(buttonName);
      }
    } else if (buttonName == 'Trabajo') {
      if (this.trabajoSelected == false) {
        if (this.Contador != 3) {
          this.trabajoSelected = true;
          this.Contador = this.Contador + 1;
          this.addIntention(buttonName);
        }
      } else {
        this.trabajoSelected = false;
        this.Contador = this.Contador - 1;
        this.removeIntention(buttonName);
      }
    } else if (buttonName == 'Salud Espiritual') {
      if (this.saludEspiritualSelected == false) {
        if (this.Contador != 3) {
          this.saludEspiritualSelected = true;
          this.Contador = this.Contador + 1;
          this.addIntention(buttonName);
        }
      } else {
        this.saludEspiritualSelected = false;
        this.Contador = this.Contador - 1;
        this.removeIntention(buttonName);
      }
    } else if (buttonName == 'Acción de Gracias') {
      if (this.accionGraciasSelected == false) {
        if (this.Contador != 3) {
          this.accionGraciasSelected = true;
          this.Contador = this.Contador + 1;
          this.addIntention(buttonName);
        }
      } else {
        this.accionGraciasSelected = false;
        this.Contador = this.Contador - 1;
        this.removeIntention(buttonName);
      }
    } else if (buttonName == 'Paz') {
      if (this.pazSelected == false) {
        if (this.Contador != 3) {
          this.pazSelected = true;
          this.Contador = this.Contador + 1;
          this.addIntention(buttonName);
        }
      } else {
        this.pazSelected = false;
        this.Contador = this.Contador - 1;
        this.removeIntention(buttonName);
      }
    } else if (buttonName == 'Santidad') {
      if (this.santidadSelected == false) {
        if (this.Contador != 3) {
          this.santidadSelected = true;
          this.Contador = this.Contador + 1;
          this.addIntention(buttonName);
        }
      } else {
        this.santidadSelected = false;
        this.Contador = this.Contador - 1;
        this.removeIntention(buttonName);
      }
    } else if (buttonName == 'Perdón') {
      if (this.perdonSelected == false) {
        if (this.Contador != 3) {
          this.perdonSelected = true;
          this.Contador = this.Contador + 1;
          this.addIntention(buttonName);
        }
      } else {
        this.perdonSelected = false;
        this.Contador = this.Contador - 1;
        this.removeIntention(buttonName);
      }
    } else if (buttonName == 'Conversión') {
      if (this.conversionSelected == false) {
        if (this.Contador != 3) {
          this.conversionSelected = true;
          this.Contador = this.Contador + 1;
          this.addIntention(buttonName);
        }
      } else {
        this.conversionSelected = false;
        this.Contador = this.Contador - 1;
        this.removeIntention(buttonName);
      }
    } else if (buttonName == 'Favor') {
      if (this.favorSelected == false) {
        if (this.Contador != 3) {
          this.favorSelected = true;
          this.Contador = this.Contador + 1;
          this.addIntention(buttonName);
        }
      } else {
        this.favorSelected = false;
        this.Contador = this.Contador - 1;
        this.removeIntention(buttonName);
      }
    }
  }

  addIntention(intention: string) {
    this.intentionName = intention;
    this.intenciones.push(this.intentionName);
    console.log(this.intenciones);

    this.addIntentionInJsonFile();
  }

  removeIntention(intention: string) {
    for (var index = 0; index < this.intenciones.length; index++) {
      if (this.intenciones[index] === intention) {
        this.intenciones.splice(index, 1);
      }
    }
    console.log('borrado');
    console.log(index);
    console.log(this.intenciones);
    this.addIntentionInJsonFile();
  }

  //Inicializa las intenciones del usuario
  initializeIntentionsValues() {
    console.log(this.intenciones.length);
    this.Contador = this.intenciones.length;
    var intention: string;
    for (intention of this.intenciones) {
      this.updateBaseIntention(intention);
    }
  }

  updateBaseIntention(intention: string) {
    switch (intention) {
      case 'Familia':
        this.familiaSelected = !this.familiaSelected;
        return this.familiaSelected;
      case 'Salud Física':
        this.saludFisicaSelected = !this.saludFisicaSelected;
        return this.saludFisicaSelected;
      case 'Trabajo':
        this.trabajoSelected = !this.trabajoSelected;
        return this.trabajoSelected;
      case 'Salud Espiritual':
        this.saludEspiritualSelected = !this.saludEspiritualSelected;
        return this.saludEspiritualSelected;
      case 'Acción de Gracias':
        this.accionGraciasSelected = !this.accionGraciasSelected;
        return this.accionGraciasSelected;
      case 'Paz':
        this.pazSelected = !this.pazSelected;
        return this.pazSelected;
      case 'Santidad':
        this.santidadSelected = !this.santidadSelected;
        return this.santidadSelected;
      case 'Perdón':
        this.perdonSelected = !this.perdonSelected;
        return this.perdonSelected;
      case 'Conversión':
        this.conversionSelected = !this.conversionSelected;
        return this.conversionSelected;
      case 'Favor':
        this.favorSelected = !this.favorSelected;
    }
  }

  addIntentionInJsonFile() {
    JSON.stringify(this.intenciones);
    console.log(JSON.stringify(this.intenciones));
    for (var intention of this.intenciones) {
      console.log(intention);
    }
    console.log("--------------");

  }

}