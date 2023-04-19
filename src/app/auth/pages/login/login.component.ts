import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

import { AuthService } from "../../services/auth.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /* AQUI DEFINIMOS LA TEMATICA DE NUESTRA IMAGEN*/
  styleImage = 'routes';

  form!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
  }
  ngOnInit(): void {
    this.buildForm();
  }
  private buildForm(): any {
    this.form = this.formBuilder.group({
      username: ['admin', [Validators.required,]],
      password: ['1234', [Validators.required, Validators.minLength(4)]],
    });
  }
  /* ESTA FUNCION ES ACTIVADA POR EL NGSTYLE */
  unsplashClass(): any {
    return {
      'min-height': '100%',
      /* LLAMADA RANDOMICA AL SERVICIO DE IMAGENES DE UNSPLASH - CON IMAGENES DE TAMAÑO 1200X900 */
      /*SE LE AÑADE LA VARIABLE DE styleUrls PARA ESTABLECER LA TEMATICA*/
      background: `url("https://source.unsplash.com/random/1200x900?"${this.styleImage}) no-repeat center center`,
      'background-size': 'cover',
      position: 'relative',
    };
  }

  login(event: Event): any {
    event.preventDefault();
    if (this.form.valid) {
      const { username, password } = this.form.value;
      const encryptedPassword = CryptoJS.SHA256(password).toString();

      this.router.navigateByUrl('/main')
      this.authService.login(username, encryptedPassword)
        .subscribe(resp => {
          console.log(resp);
        });
    }
  }

}
