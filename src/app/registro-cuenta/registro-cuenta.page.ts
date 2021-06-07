import { AngularFireDatabase } from '@angular/fire/database';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { Platform, ToastController } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';
import * as firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-registro-cuenta',
  templateUrl: './registro-cuenta.page.html',
  styleUrls: ['./registro-cuenta.page.scss'],
})
export class RegistroCuentaPage implements OnInit {

  datos: any;

  @ViewChild('slider', { static: true }) slidefromHtml: IonSlides;

  //Animación del Slide
  slideOpts = {
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}fade`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.params = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { slides } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = swiper.slides.eq(i);
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          let tx = -offset$$1;
          if (!swiper.params.virtualTranslate) tx -= swiper.translate;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          const slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
            : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
          $slideEl
            .css({
              opacity: slideOpacity,
            })
            .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, $wrapperEl } = swiper;
        slides.transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          slides.transitionEnd(() => {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      },
    }
  };

  selectedSlide: string;
  index:         any;

  slide = [
    {
      titulo: 'La Virgen',
      img: '/assets/imágenes/avatar1.svg'
    },
    {
      titulo: 'Jesús',
      img: '/assets/imágenes/avatar2.svg'
    },
    {
      titulo: 'Corazón de Jesús',
      img: '/assets/imágenes/avatar3.svg'
    },
    {
      titulo: 'Corazón de María',
      img: '/assets/imágenes/avatar4.svg'
    },
    {
      titulo: 'Cirio Pascual',
      img: '/assets/imágenes/avatar5.svg'
    },
    {
      titulo: 'El Gólgota',
      img: '/assets/imágenes/avatar6.svg'
    }
  ];

  provedor:               any;

  constructor(private route: ActivatedRoute,
    private fb: Facebook,
    private gp: GooglePlus,
    public platform: Platform,
    private db: AngularFireDatabase,
    private router: Router,private vibra: Vibration) {
    this.route.queryParams.subscribe(params => {
      if (params && params.datos) {
        this.datos = JSON.parse(params.datos)
      }
    });
  }

  userId:   any;
  name:     any;
  lastName: any;
  email:    any;
  password: any;
  page:     any;

  ngOnInit() {
    //Obtiene los datos del resgistro-datos o del home, dependiendo del proveedor
    this.route.queryParams.subscribe((params) => {
      this.datos = { ...params.keys, ...params }
      console.log(this.datos);
    });
    this.route.queryParams.subscribe(params => {
      console.log(params['name']);
      this.userId = params['userData'];
      this.name = params['name'];
      this.lastName = params['lastname'];
      this.email = params['email'];
      this.password = params['password'];
      this.provedor = params['provedor'];
      this.page = params['page'];
      console.log(this.userId);
      console.log(this.lastName);
      this.borrarUser(this.page);
    });
  }

  //Se borra al usuario proveniente del home(Facebook o Google) o de registro.datos, para eliminar la persistencia del loggeo en firebase.
  borrarUser(pagina){
    console.log(pagina);
    if (pagina == "datos"){
      var user = firebase.auth().currentUser;
      user.delete();
      console.log('borrado');
      this.slideChange();
    } else {
      this.slideChange();
    }
  }

  //Se obtiene el índice del avatar actual
  slideChange() {
    this.slidefromHtml.getActiveIndex().then(id => {
      console.log('your index', id);
      this.index = id;
    });
  }

  //Al seleccionar el avatar procede a continuar el registro-intenciones
  registrar() {
    //this.db.database.ref('user/').set(this.selectedSlide.values)
    console.log(this.slide[this.index].img);
    this.vibracion();
    this.router.navigate(['/registro-intenciones'],
      {
        queryParams: {
          userData: this.userId,
          name: this.name,
          lastname: this.lastName,
          email: this.email,
          password: this.password,
          provedor: this.provedor,
          avatar: this.slide[this.index].img
        }
      });
  }

  //Ir al avatar anterior
  Prev() {
    this.vibracion();
    this.slidefromHtml.getActiveIndex().then(slidesIndex => {
      if (slidesIndex == 0) {
        this.slidefromHtml.slideTo(5);
      } else {
        this.slidefromHtml.slidePrev();
      }
    });
  }

  //Ir al avatar siguiente
  Next() {
    this.vibracion();
    this.slidefromHtml.getActiveIndex().then((slidesIndex) => {
      if (slidesIndex == 5) {
        this.slidefromHtml.slideTo(0)
      } else {
        this.slidefromHtml.slideNext();
      }
    });
  }

  //Regregar al home si el usuaio se registró con Facebook o con Google, sino se regresa al registro-datos
  back() {
    this.vibracion();
    if (this.provedor == "email") {
      this.router.navigate(['/registro-datos']);
    } else {
      if (this.platform.is("cordova")) {
        firebase.auth().signOut()
          .then(() => {
            this.fb.logout();
            this.gp.disconnect();
            this.router.navigate(['/home']);
          })
          .catch(function (error) {
            // An error happened.
            console.log(error);
          });
      } else {
        firebase.auth().signOut()
          .then(() => { this.router.navigate(['/home']); })
          .catch(function (error) {
            // An error happened.
            console.log(error);
          });
      }
    }
  }

  vibracion(){
    if (this.platform.is("android")) {
      this.vibra.vibrate([50]);
    }
  }
}