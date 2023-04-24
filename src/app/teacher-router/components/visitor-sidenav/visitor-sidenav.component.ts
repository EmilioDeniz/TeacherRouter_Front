import { Component } from '@angular/core';

@Component({
  selector: 'app-visitor-sidenav',
  templateUrl: './visitor-sidenav.component.html',
  styleUrls: ['./visitor-sidenav.component.css']
})
export class VisitorSidenavComponent {

  centres: any[]

  constructor() {
    this.centres = [{ centreName: 'Colegio San Juan', street: 'Calle Mayor 12' }, { centreName: 'Instituto Montes', street: 'Avenida de la Constitución 25' }, { centreName: 'Escuela Nuestra Señora', street: 'Calle del Sol 8' }];

  }
}
