import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  get apiUrl() {
    return `${environment.apiUrl}/login`;
  }

  login(username: string, password: string) {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    return this.http.post<any>(this.apiUrl, formData)
      .pipe(
        tap(resp => {
          localStorage.setItem('teacher-token', resp.token);
        }),
        map(resp => resp.ok),
        catchError(err => Swal.fire({title: 'Error', text: 'usuario y/o contraseña incorrectos', icon:'error', confirmButtonText: 'Pues vale'}))
      );
  }

  getToken() {
    if (!localStorage.getItem('teacher-token')) {
      return false;
    }
    return true;
  }
}
