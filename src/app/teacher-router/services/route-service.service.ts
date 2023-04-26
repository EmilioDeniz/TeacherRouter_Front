import { Injectable } from '@angular/core';
import { Centre } from '../components/visitor-sidenav/visitor-sidenav.component';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private centres: Centre[] = [
    { centreName: 'Colegio San Juan', street: 'Calle Mayor 12', visited: false, current: true },
    { centreName: 'Instituto Montes', street: 'Avenida de la Constitución 25', visited: false, current: false },
    { centreName: 'Escuela Nuestra Señora', street: 'Calle del Sol 8', visited: false, current: false }
  ];

  constructor() { }

  getCentres(): Centre[] {
    return this.centres;
  }

  updateCentre(centre: Centre): void {
    const index = this.centres.indexOf(centre);

    if (index !== -1 && index < this.centres.length - 1) {
      this.centres[index].visited = !this.centres[index].visited;
      this.centres[index].current = false;
      this.centres[index + 1].current = true;
    }
  }
}
