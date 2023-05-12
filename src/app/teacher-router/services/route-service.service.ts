import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpPostServiceService } from './http-post-service.service';

export interface Centre {
  centreName: string;
  street: string;
  latitude: number
  longitude: number
}

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private centres !: Centre[]

  constructor(private http: HttpClient, private httpPost: HttpPostServiceService) { }

  getCentres(): Centre[] {

    const formData = new FormData();
    formData.append('token', localStorage.getItem('teacher-token')!);

    this.httpPost.peticionServer('getRoute', formData).subscribe((response: Array<any>) => {
      console.log(response)
    });

    return this.centres
  }

  updateCentre(centre: Centre): void {

    const formData = new FormData();
    const teacherToken = localStorage.getItem('teacher-token');
    if (teacherToken !== null) {
      formData.append('token', teacherToken);
      this.httpPost.peticionServer('getRoute', formData).subscribe((response: any) => {
        console.log(response)
      });
    }
  }

  wasVisited(centre: Centre) {
    return false
  }
}
