
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map!: google.maps.Map;

  constructor() { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(
      position => {
        const center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        const mapOptions: google.maps.MapOptions = {
          center: center,
          zoom: 15
        };
        this.map = new google.maps.Map(document.getElementById('map')!, mapOptions);
      },
      error => {
        const center = new google.maps.LatLng(28.128081, -15.430006);
        const mapOptions: google.maps.MapOptions = {
          center: center,
          zoom: 15
        };
        this.map = new google.maps.Map(document.getElementById('map')!, mapOptions);
      }
    );
  }

}
