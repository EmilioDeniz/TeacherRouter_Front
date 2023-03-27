import { Component } from '@angular/core';
import { SidenavService } from "../../services/sidenav.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  isOpen$ = this.sidenavService.isOpen$;
  lineChart: any;
  doughnutChart: any;

  constructor(private sidenavService: SidenavService, private router: Router) {
  }
}