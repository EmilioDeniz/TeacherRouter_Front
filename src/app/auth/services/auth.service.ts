import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
 
  constructor(private http: HttpClient) { }

  get url () {
    return 'http://104.248.171.221:5000/login';
  }

  login( username: string, password: string ) {

    
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    return this.http.post<any>( this.url, formData )
      .pipe(
        tap( resp => {
          localStorage.setItem('teacher-token', resp.token);
          
        }),
        map( resp => resp.ok ),
        catchError( err => of(err.error.msg) )
      );
  }
}
