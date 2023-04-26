import { Component, OnInit } from '@angular/core';

//declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  //map: google.maps.Map;

  constructor() { }

  ngOnInit() {
    //this.initMap();
  }

  /*initMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 28.126033, lng: -15.454997 },
      zoom: 8
    });
  }*/

}

