import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as L from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{

  map!: L.Map;

  @Input() latitud:number = 0
  @Input() longitud:number = 0

  constructor() { }
  
  ngOnInit() {
    if (!this.map) {
      setTimeout(() => {
        this.initMap();
      }, 1000); // delay for 1 second
    }
  }

  initMap() {
    this.map = L.map('map').setView([this.latitud, this.longitud], 18);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 60
    }).addTo(this.map);
  }
}

