import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coronilla',
  templateUrl: './coronilla.page.html',
  styleUrls: ['./coronilla.page.scss'],
})
export class CoronillaPage implements OnInit {

  constructor() { }

  ngOnInit() {
    document.getElementById("text-area").className = "text-area-player";
    document.getElementById("text-area-container").className = "text-area-container-player";
  }

}
