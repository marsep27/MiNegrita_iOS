import { Component, OnInit, ViewChild } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';
import { IonRange, Platform } from "@ionic/angular";

@Component({
  selector: 'app-coronilla',
  templateUrl: './coronilla.page.html',
  styleUrls: ['./coronilla.page.scss'],
})
export class CoronillaPage implements OnInit {
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
      text: "Misericordia Divina, supremo atributo de Dios,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, insondable amor del Santificador,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, misterio incomprensible de la Santa Trinidad,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, expresión del máximo poder de Dios,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, en la creación de los espíritus celestiales,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, que de la nada nos llamó a la existencia,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, que abarca todo el universo,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, que nos otorga la vida inmortal,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, que nos protege de los castigos merecidos,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, que nos rescata de la miseria del pecado,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, que nos justifica en la Palabra Encarnada,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, que mana de las llagas de Cristo,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, que brota del Sacratísmo Corazón de Jesús,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, que nos da a la Santísima Virgen María como Madre de la Misericordia,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, en la revelación de los misterios de Dios,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, en la institución de la Iglesia universal,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, en la institución de los santos sacramentos,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, ante todo en el sacramento del Bautismo y la Penitencia,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, en el sacramento del Altar y el sacerdocio,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, en llamarnos a la santa fe,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, en la conversión de los pecadores,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, en la santificación de los justos,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, en el perfeccionamiento de los piadosos,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, fuente para los enfermos y los que sufren,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, consuelo para los corazones angustiados,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, esperanza de las almas desesperadas,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, que acompaña a todos siempre y en todas partes,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, que nos adelanta con gracias,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, paz de los agonizantes,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, gozo celestial de las almas salvadas,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, frescor y alivio para las almas del purgatorio,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, corona de todos los santos,",
      answer: "-en tí confío."
    },
    {
      text: "Misericordia Divina, inagotable fuente de milagros,",
      answer: "-en tí confío."
    },
  ]

  finLetanias = [
    {
      text: "Cordero de Dios que has mostrado la mayor misericordia en la redención del mundo en la cruz.",
      answer: "-Perdónanos, Señor"
    },
    {
      text: "Cordero de Dios que te ofreces misericordiosamente por nosotros en cada santa Misa.",
      answer: "-Escúchanos, Señor"
    },
    {
      text: "Cordero de Dios que por la insondable misericordia quitas nuestros pecados.",
      answer: "-Ten piedad de nosotros"
    },
  ]

  constructor(public platform: Platform, private vibra: Vibration) { }

  ngOnInit() {
  }

  //play song
  audio() {
    //If a song plays,stop that
    if (this.currSong != null) {
      this.currSong.pause();
    }

    document.getElementById("text-area").className = "text-area-player";
    document.getElementById("text-area-container").className = "text-area-container-player";

    //set current song details

    //Current song audio
    this.currSong = new Audio("/assets/audio/Coronilla a la Divina Misericordia.mp3");

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