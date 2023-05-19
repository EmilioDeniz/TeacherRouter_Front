import { Injectable } from '@angular/core';
import { HttpPostServiceService } from './http-post-service.service';
import { Observable } from 'rxjs';
import { Material } from '../interfaces/material.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemsRequestsService {

  constructor(private httpService: HttpPostServiceService) { }

  getMaterial(): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('token', localStorage.getItem('teacher-token')!);

    return this.httpService.peticionServer('getMaterials', formData);
  }

  editMaterial(material: Material){
    const formData = new FormData();
    formData.append('token', localStorage.getItem('teacher-token')!);
    formData.append('id', material.id.toString());
    formData.append('name', material.name);
    formData.append('description', material.description);

    this.httpService.peticionServer('modifyMaterial', formData).subscribe((resp: any) =>{
      console.log(resp);
    })

  }

  addMaterial(material: Material) {
    const formData = new FormData();
    formData.append('token', localStorage.getItem('teacher-token')!);
    formData.append('name', material.name);
    formData.append('description', material.description);

    this.httpService.peticionServer('addMaterial', formData).subscribe((resp: any) =>{
      console.log(resp);
    })
  }

  removeMaterial(material: Material){
    const formData = new FormData();
    formData.append('token', localStorage.getItem('teacher-token')!);
    formData.append('id', material.id.toString());

    this.httpService.peticionServer('deleteMaterial', formData).subscribe((resp: any) =>{
      console.log(resp);
    })
  }
}
