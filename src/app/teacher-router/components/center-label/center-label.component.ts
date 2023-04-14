import { Component } from '@angular/core';

@Component({
  selector: 'app-center-label',
  templateUrl: './center-label.component.html',
  styleUrls: ['./center-label.component.css']
})
export class CenterLabelComponent {
  centreName!:string;
  street!:string;
}
