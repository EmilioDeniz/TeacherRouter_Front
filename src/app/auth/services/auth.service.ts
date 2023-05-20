import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  get apiUrl() {
    return `${environment.apiUrl}`;
  }

  login(username: string, password: string) {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    return this.http.post<any>(`${this.apiUrl}/login`, formData)
      .pipe(
        tap(resp => {
          localStorage.setItem('teacher-token', resp.token);
          let token = resp.token!;
          const tokenData = new FormData();
          tokenData.append('token', token);
          //TODO: CONSULTAR TOKEN SI ES ADMIN
          this.http.post(`${this.apiUrl}/checkRol`, tokenData).subscribe( (resp:any) => {
            
            let rol = resp.rol;
            if (rol == '1') {
              this.router.navigateByUrl('/main/admin-home');
            } else if (rol == '0') {
              this.router.navigateByUrl('/main/teacher-home');
            }
          })
          
        }),
        catchError(error => Swal.fire({title: 'Error', text: error.error.message, icon:'error', confirmButtonText: 'Lo intentaré de nuevo...'}))
      );
  }

  getToken() {
    if (!localStorage.getItem('teacher-token')) {
      return false;
    }
    return true;
  }

  logout(){
    const formData = new FormData()
    let token = localStorage.getItem('teacher-token')!
    formData.append("teacher-token", token);

    console.log("cerrar sesion token:",token);

    return this.http.post<any>(`${this.apiUrl}/cerrarSesion`, formData)
  }
}
