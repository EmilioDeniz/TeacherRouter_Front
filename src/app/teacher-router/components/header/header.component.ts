import { Component, ViewChild } from '@angular/core';
import { SidenavService } from "../../services/sidenav.service";
import { Router } from '@angular/router';
import { ComponentFactoryResolver, Injector, ApplicationRef, EmbeddedViewRef } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  logged: boolean = false;
  constructor(private sidenavService: SidenavService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector, private appRef: ApplicationRef, private auth: AuthService) {

      this.switch();

    }


  toggleSidenav() {
    this.sidenavService.toggle();
  }

  switch() {
    this.logged = this.auth.getToken()
  }

  logOut(){
    localStorage.removeItem('teacher-token')
    this.router.navigateByUrl('/');
  }

  isAdmin() {
    return true;
  }

  get isTeacherHome() {
    return this.router.url === '/teacher-home';
  }
}
