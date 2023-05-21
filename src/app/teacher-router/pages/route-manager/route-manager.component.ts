import { Component, OnInit } from '@angular/core';
import { LatLngExpression, latLng, tileLayer, Layer, polyline } from 'leaflet';

@Component({
  selector: 'app-route-manager',
  templateUrl: './route-manager.component.html',
  styleUrls: ['./route-manager.component.css']
})
export class RouteManagerComponent implements OnInit {
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909)
  };

  layers: Layer[] = [];
  routes = [
    [[46.8, -121.7], [46.9, -121.8], [47.0, -121.9], [47.1, -121.0]],
    [[45.0, -120.0], [45.1, -120.1], [45.2, -120.2], [45.3, -120.3]],
    // Agrega más rutas aquí
  ];
  users = ['Usuario 1', 'Usuario 2', 'Usuario 3'];
  selectedUser = '';

  ngOnInit(): void {
    this.showRoute(0);
  }

  showRoute(index: number) {
    const route: LatLngExpression[] = this.routes[index].map(coord => [coord[0], coord[1]]);
    this.layers = [polyline(route)];  }

  assign() {
    alert('Asignado');
  }
}
