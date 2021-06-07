import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRange, Platform } from "@ionic/angular";
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-luminosos',
  templateUrl: './luminosos.page.html',
  styleUrls: ['./luminosos.page.scss'],
})
export class LuminososPage implements OnInit {
  @ViewChild("range", { static: false }) range: IonRange;

  //progress bar value
  progress: number = 0;

  //toggle for play/pause button
  isPlaying: boolean = false;
  isInicio:  boolean = false;

  //track of ion-range touch
  isTouched: boolean = false;

  //ion range texts
  currSecsText: string;
  durationText: string;

  //ion range value
  currRangeTime: number;
  maxRangeValue: number;

  currSong:  HTMLAudioElement;
  currTitle: string;

  inicioLetanias = [
    {
      text: "Señor, ten piedad.",
      answer: "-Señor, ten piedad"
    },
    {
      text: "Cristo, ten piedad.",
      answer: "-Cristo, ten piedad"
    },
    {
      text: "Señor, ten piedad.",
      answer: "-Señor, ten piedad"
    },
    {
      text: "Cristo, óyenos.",
      answer: "-Cristo óyenos"
    },
    {
      text: "Cristo, escúchanos.",
      answer: "-Cristo escúchanos"
    }
  ]

  letanias1 = [
    {
      text: "Dios, Padre celestial.",
      answer: "-Ten piedad de nosotros"
    },
    {
      text: "Dios, Hijo, Redentor del mundo.",
      answer: "-Ten piedad de nosotros"
    },
    {
      text: "Dios, Espíritu Santo.",
      answer: "-Ten piedad de nosotros"
    },
    {
      text: "Santísima Trinidad, un solo Dios.",
      answer: "-Ten piedad de nosotros"
    }
  ]

  letanias2 = [
    {
      text: "Santa María.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Santa Madre de Dios.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Santa Virgen de las vírgenes.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Madre de Cristo.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Madre de la Iglesia",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Madre de la Misericordia",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Madre de la Divina Gracia.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Madre de la Esperanza.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Madre purísima.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Madre castísima.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Madre y Virgen.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Madre inmaculada.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Madre incorrupta.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Madre amable.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Madre admirable.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Madre del Buen Consejo.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Madre del Creador.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Madre del Salvador.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Virgen prudentísima.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Virgen digna de veneración.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Virgen digna de alabanza.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Virgen poderosa.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Virgen clemente.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Virgen fiel.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Ideal de santidad.",
      answer: "-Ruega por nosotros"
    },{
      text: "Espejo de justicia.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Trono de la sabiduría.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Causa de nuestra alegría.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Templo del Espíritu Santo.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Honor de los pueblos.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Modelo de entrega a Dios.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Vaso espiritual.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Vaso digno de honor.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Vaso insigne de devoción.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Rosa mística.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Fuerte como la Torre de David.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Hermosa como la Torre de marfil.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Casa de Oro.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Arca de la Nueva Alianza.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Puerta del cielo.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Estrella de la mañana.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Salud de los enfermos.".bold(),
      answer: "-Ruega por nosotros"
    },
    {
      text: "Refugio de los pecadores.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Consuelo de los migrantes.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Consuelo de los afligidos.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Auxilio de los cristianos.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Reina de los Ángeles.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Reina de los Patriarcas.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Reina de los Profetas.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Reina de los Apóstoles.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Reina de los Mártires.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Reina de los Confesores.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Reina de los que viven su fe.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Reina de los que se conservan castos.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Reina de todos los santos.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Reina concebida sin pecado original.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Reina elevada al cielo.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Reina del santísimo Rosario.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Reina de las familias.",
      answer: "-Ruega por nosotros"
    },
    {
      text: "Reina de la paz.",
      answer: "-Ruega por nosotros"
    },
  ]

  finLetanias = [
    {
      text: "Cordero de Dios que quitas el pecado del mundo.",
      answer: "-Perdónanos, Señor"
    },
    {
      text: "Cordero de Dios que quitas el pecado del mundo.",
      answer: "-Escúchanos, Señor"
    },
    {
      text: "Cordero de Dios que quitas el pecado del mundo.",
      answer: "-Ten piedad de nosotros"
    },
  ]

  constructor(public platform: Platform, private vibra: Vibration) { }

  ngOnInit() {
  }

  //play song
  audio() {
    this.vibracion();
    //If a song plays,stop that
    if (this.currSong != null) {
      this.currSong.pause();
    }

    document.getElementById("text-area").className = "text-area-player";
    document.getElementById("text-area-container").className = "text-area-container-player";

    //set current song details

    //Current song audio
    this.currSong = new Audio("/assets/audio/Misterios Luminosos del Santo Rosario.mp3");

    this.currSong.play().then(() => {
      //Total song duration
      this.durationText = this.sToTime(this.currSong.duration);
      //set max range value (important to show proress in ion-range)
      this.maxRangeValue = Number(this.currSong.duration.toFixed(2).toString().substring(0, 5));

      this.isPlaying = true;
      this.isInicio = true;
    })

    this.currSong.addEventListener("timeupdate", () => {
      //update some infos as song plays on

      //if ion-range not touched the do update 
      if (!this.isTouched) {

        //update ion-range value
        this.currRangeTime = Number(this.currSong.currentTime.toFixed(2).toString().substring(0, 5));
        //update current seconds text
        this.currSecsText = this.sToTime(this.currSong.currentTime);
        //update progress bar (in miniize view)
        this.progress = (Math.floor(this.currSong.currentTime) / Math.floor(this.currSong.duration));

        //if song ends,play next song
        //if (this.currSong.currentTime == this.currSong.duration) {
        //this.parar();
        //}
      }
    });
  }

  play() {
    this.vibracion();
    this.currSong.play();
    this.isPlaying = true;
    this.isInicio = true;
  }

  pause() {
    this.vibracion();
    this.currSong.pause();
    this.isPlaying = false;
  }

  parar() {
    this.vibracion();
    if (this.currSong != null) {
      this.currSong.pause();
    }
    this.isPlaying = false;
    this.isInicio = false;
  }

  //On touching ion-range
  touchStart() {
    this.isTouched = true;
    this.currRangeTime = Number(this.range.value);
  }

  //On moving ion-range
  //Update current seconds text
  touchMove() {
    this.currSecsText = this.sToTime(this.range.value);
  }

  //On touch released/end
  touchEnd() {
    this.isTouched = false;
    this.currSong.currentTime = Number(this.range.value);
    this.currSecsText = this.sToTime(this.currSong.currentTime)
    this.currRangeTime = Number(this.currSong.currentTime.toFixed(2).toString().substring(0, 5));

    if (this.isPlaying) {
      this.currSong.play();
    }
  }

  sToTime(t) {
    return this.padZero(parseInt(String((t / (60)) % 60))) + ":" +
      this.padZero(parseInt(String((t) % 60)));
  }

  padZero(v) {
    return (v < 10) ? "0" + v : v;
  }

  vibracion(){
    if (this.platform.is("android")) {
      this.vibra.vibrate([50]);
    }
  }
}
