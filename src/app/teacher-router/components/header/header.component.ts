import { Component, ViewChild } from '@angular/core';
import { SidenavService } from "../../services/sidenav.service";
import { Router } from '@angular/router';
import { VisitorSidenavComponent } from '../visitor-sidenav/visitor-sidenav.component';
import { ComponentFactoryResolver, Injector, ApplicationRef, EmbeddedViewRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private sidenavService: SidenavService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef) {
  }


  header_noLogged: boolean = true;
  header_Logged: boolean = false;

  toggleSidenav() {
    this.sidenavService.toggle();
  }

  switch() {
    this.header_Logged = !this.header_Logged;
    this.header_noLogged = !this.header_noLogged;
  }

  @ViewChild('visitorSidenav', { static: false }) visitorSidenav!: VisitorSidenavComponent;


  toggleVisitorSidenav() {
    if (this.visitorSidenav) {

    } else {
      const factory = this.componentFactoryResolver.resolveComponentFactory(VisitorSidenavComponent);
      const componentRef = factory.create(this.injector);
      this.appRef.attachView(componentRef.hostView);
      const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
      document.body.appendChild(domElem);
    }
  }

  onSiguienteClicked() {
    if (this.visitorSidenav) {
      this.visitorSidenav.siguiente();
    }
  }

  isAdmin() {
    return true;
  }

  get isTeacherHome() {
    return this.router.url === '/teacher-home';
  }
}
