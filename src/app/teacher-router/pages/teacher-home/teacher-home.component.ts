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
  centres!: Centre[]
  index!: number

  ngOninit() {
    this.centres = this.routeService.getCentres();
    this.index = 0
    this.centre = this.centres[this.index]
  }

  constructor(private routeService: RouteService) {

  }

  updateVisited() {
    this.routeService.updateCentre(this.centre);
  }

  nextCentre() {
    if (this.index < this.centres.length - 1) {
      this.index += 1
      if (!this.routeService.wasVisited(this.centre)) {
        this.updateVisited()
      }
      this.centre = this.centres[this.index]
    }
  }

  previousCentre() {
    if (this.index >= 1) {
      this.index -= 1
      this.centre = this.centres[this.index]
    }
  }

}
