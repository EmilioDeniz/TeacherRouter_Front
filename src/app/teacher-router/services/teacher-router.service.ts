import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TeacherRouterService {

  constructor( private http: HttpClient){}

  get url () {
    return environment.apiUrl;
  }

  private tokenSubject: string | null = localStorage.getItem('teacher-token') || '';

  get token(): string {
    return localStorage.getItem('teacher-token') || '';
  }

  set token(token: string) {
    localStorage.setItem('teacher-token', token);
  }

  validarToken(): Observable<boolean> {
    const url = `${environment.apiUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<any>( url, {  headers } )
      .pipe(
        map( resp => {
          localStorage.setItem('token', resp.token!);
          
          return resp.ok;
        }),
        catchError( err => of(false) )
      );
  }


  logout(): void {
    localStorage.removeItem('teacher-token');
  }
}
