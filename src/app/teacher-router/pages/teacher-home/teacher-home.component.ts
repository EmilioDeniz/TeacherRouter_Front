import { Component } from '@angular/core';
import { RouteService } from '../../services/route-service.service';
import { Centre } from '../../services/route-service.service';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.css']
})
export class TeacherHomeComponent {

  centre !: Centre

  constructor(private routeService:RouteService){

  }

  updateVisited(){
    this.routeService.updateCentre(this.centre);
  }

}
