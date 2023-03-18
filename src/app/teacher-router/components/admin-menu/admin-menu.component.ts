import { Component } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent {
  showFiller = false;
  constructor(private router: Router) {
  }
  goToPage(pageName:string) {
    this.router.navigate([`${pageName}`]);
  }

}

