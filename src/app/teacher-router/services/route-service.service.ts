import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpPostServiceService } from './http-post-service.service';
import { Observable } from 'rxjs';

export interface Centre {
  centername: string;
  direction?: string;
  latitud: number
  longitud: number
  id:number
}

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private centres !: Centre[]

  constructor(private http: HttpClient, private httpPost: HttpPostServiceService) { }

  getCentres(): Observable<any> {

    const formData = new FormData();
    formData.append('token', localStorage.getItem('teacher-token')!);

    return this.httpPost.peticionServer('getRoute', formData)

  }

  updateCentre(id:number): void {
    // Por si se llega a implementar, dejo esto hecho...

    // const formData =new FormData();
    // formData.append('token', localStorage.getItem('teacher-token')!);
    // formData.append('id',id.toString())
    // this.httpPost.peticionServer('updateVisited', formData)

  }
}
