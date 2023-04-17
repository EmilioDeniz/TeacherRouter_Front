import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-center-label',
  templateUrl: './center-label.component.html',
  styleUrls: ['./center-label.component.css']
})
export class CenterLabelComponent {
 @Input() centreName!:string;
 @Input() street!:string;
}
