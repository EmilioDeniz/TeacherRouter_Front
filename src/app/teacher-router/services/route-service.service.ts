import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Centre } from '../components/visitor-sidenav/visitor-sidenav.component';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private centres !: Centre[]

  constructor(private http: HttpClient) { }

  getCentres(): Centre[] {
    const url = 'http://138.68.130.127:5000'
    this.http.get<JSON>
    return this.centres;
  }

  updateCentre(centre: Centre): void {
    const index = this.centres.indexOf(centre);

    if (index !== -1 && index < this.centres.length - 1) {
      this.centres[index].visited = !this.centres[index].visited;
      this.centres[index].current = false;
      this.centres[index + 1].current = true;
    }
  }
}
