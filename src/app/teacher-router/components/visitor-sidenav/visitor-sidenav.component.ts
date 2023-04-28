import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { RouteService } from '../../services/route-service.service';

export interface Centre {
  centreName: string;
  street: string;
  visited: boolean;
  current: boolean;
}

@Component({
  selector: 'app-visitor-sidenav',
  templateUrl: './visitor-sidenav.component.html',
  styleUrls: ['./visitor-sidenav.component.css'],
  providers: [RouteService] // Agregar el servicio a la lista de proveedores
})
export class VisitorSidenavComponent implements OnInit {
  centros: Centre[];

  constructor(private routeService: RouteService) {
    this.centros = [];
  }
  ngOnInit() {
    this.centros = this.routeService.getCentres();
  }

  isVisited(centro: Centre) {
    return centro.visited;
  }

  isCurrent(centro: Centre) {
    return centro.current;
  }

  toggleVisited(centro: Centre) {
    centro.visited = !centro.visited;
    centro.current = !centro.current;

    const index = this.centros.indexOf(centro);
    if (index < this.centros.length - 1) {
      const nextCentro = this.centros[index + 1];
      nextCentro.current = true;
    }
  }

  siguiente() {
    var centroActual = this.centros.find((centro) => centro.current);

    if (centroActual) {
      this.routeService.updateCentre(centroActual);
      this.toggleVisited(centroActual);
    }
  }
}


