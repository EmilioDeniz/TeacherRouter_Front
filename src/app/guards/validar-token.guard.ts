import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { TeacherRouterService } from '../teacher-router/services/teacher-router.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {
  constructor(private teacherService: TeacherRouterService,
              private router        : Router ) { }

  canActivate(): Observable<boolean> | boolean {
    
    return this.teacherService.validarToken()
      .pipe(
        tap(valid => {               
          if (!valid) {
            this.router.navigateByUrl('/')
          }
        })
      );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.teacherService.validarToken()
      .pipe(
        tap(valid => {
          if (!valid) {
            this.router.navigateByUrl('/')
          }
        })
      );
  }
}
