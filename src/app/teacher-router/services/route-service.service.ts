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
    const url = 'http://138.68.130.127:5000'

    const formData = new FormData();
    const teacherToken = localStorage.getItem('teacher-token');
    if (teacherToken !== null) {
      formData.append('teacher-token', teacherToken);
      this.httpPost.peticionSever('/getRoute', formData).subscribe((response: any) => {
        if (typeof response === 'object' && response !== null) {
          this.centres = response;
        }
      });
    }
    return this.centres
  }

  updateCentre(centre: Centre): void {

  }
}
