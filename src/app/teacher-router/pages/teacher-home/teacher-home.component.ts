import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../services/route-service.service';
import { Centre } from '../../services/route-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.css']
})

export class TeacherHomeComponent implements OnInit {
  centre: Centre = {
    centername: "",
    direction: "",
    latitud: 0,
    longitud: 0,
    id: 0
  }
  centres!: Centre[];

  ngOnInit() {
    this.centres = []
    this.routeService.getCentres().subscribe((route) => {
      this.centres = route.routes;
      console.log(this.centres);

      this.centre = this.centres[0]
    });
  }

  constructor(private routeService: RouteService) {

  }

  updateVisited() {
    this.routeService.updateCentre(this.centre.id);
  }

  nextCentre(stepper: any) {
    if (stepper.selectedIndex < this.centres.length - 1) {
      this.showConfirmPopUp()
      stepper.selectedIndex += 1
      this.centre = this.centres[stepper.selectedIndex]
    }
  }

  previousCentre(stepper: any) {
    if (stepper.selectedIndex >= 0) {
      stepper.selectedIndex -= 1
      this.centre = this.centres[stepper.selectedIndex]
    }
  }

  showConfirmPopUp() {
    Swal.fire({
      title: '¿Has visitado ya este centro?',
      text: 'Puedes confirmarlo o ver cuál es el siguiente centro',
      confirmButtonText: 'Confirmar',
      icon: 'info',
      cancelButtonText: 'Previsualizar',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        return Swal.fire({
          title: '¿Está seguro?',
          confirmButtonText: 'Sí',
          showCancelButton: true,
          cancelButtonText: 'No',
          icon: 'warning'
        });
      } else {
        return undefined;
      }
    }).then((result) => {
      if (result?.isConfirmed) {
        this.updateVisited(); 
      }
    });
  }
}




