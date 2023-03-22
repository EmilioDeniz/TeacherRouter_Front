import { Component } from '@angular/core';
import {SidenavService} from "../../services/sidenav.service";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  isOpen$ = this.sidenavService.isOpen$;

  constructor(private sidenavService: SidenavService) {
  }
}
