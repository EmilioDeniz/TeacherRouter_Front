import { Component } from '@angular/core';
import { SidenavService } from "../../services/sidenav.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private sidenavService: SidenavService) {
  }

  header_noLogged: boolean = true;
  header_Logged: boolean = false;

  toggleSidenav() {
    this.sidenavService.toggle();
  }

  switch(){
    this.header_Logged=!this.header_Logged;
    this.header_noLogged=!this.header_noLogged;

  }
}
