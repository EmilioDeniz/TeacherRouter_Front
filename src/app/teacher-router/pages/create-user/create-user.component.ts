import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Teacher } from '../../interfaces/teacher.interface';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  isEdit: boolean = false;

  teacher: Teacher = {
    id: '',
    name: '',
    email: '',
    password: '',
    schedule: ''
  }

  constructor(){}

  guardar(): void{
    //campos obligatorios
    if( this.teacher.name.trim().length === 0 ||
        this.teacher.email.trim().length === 0 ||
        this.teacher.password.trim().length === 0 ||
        this.teacher.schedule.trim().length === 0
    ) return;
    
    if( this.teacher.id?.trim().length != 0 ) {
      //Actualizar
      
    }else {
      //Crear
    }
  }

  borrar(){

  }

  range:FormGroup = new FormGroup({
    lunes: new FormControl<Date | null>(null),
    martes: new FormControl<Date | null>(null),
    miercoles: new FormControl<Date | null>(null),
    jueves: new FormControl<Date | null>(null),
    viernes: new FormControl<Date | null>(null),
    sabado: new FormControl<Date | null>(null),
  });


}
