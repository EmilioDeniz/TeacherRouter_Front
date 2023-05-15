import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../services/route-service.service';
import { Centre } from '../../services/route-service.service';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.css']
})

export class TeacherHomeComponent implements OnInit{

  centre: Centre = { 
    centername: "",
    calle: "",
    latitud: 0,
    longitud: 0,
    orden: 0,
    username: "",
    id: 0
  }
  centres! : Centre[];

  ngOnInit() {
    this.centres = []
    this.routeService.getCentres().subscribe((route) => {
      this.centres = route.route;
      console.log(this.centres);
    
      this.centre = this.centres[0]
    });
  }

  constructor(private routeService: RouteService) {

  }

  updateVisited() {
    this.routeService.updateCentre(this.centre);
  }

  nextCentre(stepper:any) {
    if (stepper.selectedIndex < this.centres.length - 1) {
  
      stepper.selectedIndex +=1
      if (!this.routeService.wasVisited(this.centre)) {
        this.updateVisited()
      }
      this.centre = this.centres[stepper.selectedIndex]
    }
  }

  previousCentre(stepper:any) {
    if (stepper.selectedIndex >= 0) {
      stepper.selectedIndex -=1
      this.centre = this.centres[stepper.selectedIndex]
    }
  }

}
