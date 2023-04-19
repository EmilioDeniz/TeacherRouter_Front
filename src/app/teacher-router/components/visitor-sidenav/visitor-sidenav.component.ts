import { Component } from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/style/style-transforms';

@Component({
  selector: 'app-visitor-sidenav',
  templateUrl: './visitor-sidenav.component.html',
  styleUrls: ['./visitor-sidenav.component.css']
})
export class VisitorSidenavComponent {

  centres: any[]

  constructor() {
    this.centres = [{ centreName: 'Colegio San Juan', street: 'Calle Mayor 12', visited: false}, { centreName: 'Instituto Montes', street: 'Avenida de la Constitución 25',visited: false }, { centreName: 'Escuela Nuestra Señora', street: 'Calle del Sol 8',visited: false }];

  }

  isVisited(list:any[]){

  }
}

