import { Component } from '@angular/core';
import { SidenavService } from "../../services/sidenav.service";
import { VisitorSidenavService } from '../../services/visitor-sidenav-service.service';
import { Router } from '@angular/router';
import { EventEmitter, Output} from '@angular/core'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private sidenavService: SidenavService, private visitorSidenavService:VisitorSidenavService,private router: Router) {
  }

  header_noLogged: boolean = true;
  header_Logged: boolean = false;


  @Output() visitorNextButtonClicked =new EventEmitter<void>()

  toggleSidenav() {
    this.sidenavService.toggle();
  }

  toggleVisitorSidenav() {
    this.visitorSidenavService.toggle();
  }

  switch(){
    this.header_Logged=!this.header_Logged;
    this.header_noLogged=!this.header_noLogged;
  }

  getCurrentRoute() {
    return this.router.url;
  }
  
}
