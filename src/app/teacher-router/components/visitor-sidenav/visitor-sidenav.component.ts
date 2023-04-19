import { Component } from '@angular/core';
import { map, Observable, startWith } from "rxjs";

export interface Centre {
  centreName: String
  street: String
  visited: boolean
  current: boolean
}

@Component({
  selector: 'app-visitor-sidenav',
  templateUrl: './visitor-sidenav.component.html',
  styleUrls: ['./visitor-sidenav.component.css']
})
export class VisitorSidenavComponent {

  centres: Centre[]

  constructor() {
    this.centres = [{ centreName: 'Colegio San Juan', street: 'Calle Mayor 12', visited: false, current: true },
    { centreName: 'Instituto Montes', street: 'Avenida de la Constitución 25', visited: false, current: false },
    { centreName: 'Escuela Nuestra Señora', street: 'Calle del Sol 8', visited: false, current: false }];
  }

  isVisited(centre: Centre) {
    return centre.visited
  }

  isCurrent(centre: Centre) {
    return centre.current
  }

  toggleVisited(centre: Centre) {
    centre.current != centre.current
    centre.visited != centre.visited

    const index = this.centres.indexOf(centre);

    if (index < this.centres.length - 1) {
      const nextCentre = this.centres[index + 1];

      nextCentre.current = true;
    }
  }
}
