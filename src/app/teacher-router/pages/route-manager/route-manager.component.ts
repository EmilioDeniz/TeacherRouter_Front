import { Component, OnInit } from '@angular/core';
import { TeacherRouterService } from '../../services/teacher-router.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-route-manager',
  templateUrl: './route-manager.component.html',
  styleUrls: ['./route-manager.component.css']
})
export class RouteManagerComponent implements OnInit{

  userList!: any;
  routeGroups!: any;

  selectedUserValue: string = '';
  selectedRouteGroupValue: string = '';

  constructor(private trs: TeacherRouterService){
  }

  ngOnInit(): void {
    this.getUsers();
    this.getRouteGroups();
  }


  getRouteGroups(){
      this.trs.getRouteGroups().subscribe( (resp: any) => {
        this.routeGroups = resp.groupnumbers;
        
      })
  }

  getUsers(){
    this.trs.getUsers().subscribe( (resp: any) => {
      this.userList = resp.users;
    })
  }

  setRouteToUser(){
    if(this.selectedRouteGroupValue.length === 0 || this.selectedUserValue.length === 0){
      Swal.fire({title: 'Error', text: 'Selecciona usuario y grupo', icon:'error', confirmButtonText: 'Lo intentaré de nuevo...'})
      return;
    }
    this.trs.setRouteToUser(this.selectedRouteGroupValue, this.selectedUserValue).subscribe( resp => {
      console.log("setRouteToUser: ", resp);
      Swal.fire({title: 'Exito', text: `Ruta asociada al usuario: ${this.selectedUserValue}`, icon:'success', confirmButtonText: 'perfecto!'})
      
    })
  }
}
