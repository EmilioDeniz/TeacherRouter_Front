import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-route-manager',
  templateUrl: './route-manager.component.html',
  styleUrls: ['./route-manager.component.css']
})
export class RouteManagerComponent {
  @Output() siguienteClicked = new EventEmitter<void>();
  
  siguiente() {
    this.siguienteClicked.emit();
  }
}
