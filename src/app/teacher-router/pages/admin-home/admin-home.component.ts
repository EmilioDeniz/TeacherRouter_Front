import { Component } from '@angular/core';
import { SidenavService } from "../../services/sidenav.service";
import { Chart, registerables } from 'chart.js';
import { Router } from "@angular/router";

Chart.register(...registerables);

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


  ngOnInit() {
    this.lineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ['Día 1', 'Día 2', 'Día 3', 'Día 4', 'Día 5', 'Día 6', 'Día 7'],
        datasets: [
          {
            label: 'Centros visitados',
            data: [12, 19, 3, 10, 20, 7, 12],
            backgroundColor: [
              'rgba(85,85,85, 1)'

            ],
            borderColor: '#ff3a82',

            borderWidth: 1
          }]
      },
      options: {
        responsive: true
      }
    });

    this.doughnutChart = new Chart("doughnutChart", {
      type: 'doughnut',
      data: {
        labels: ['Juan', 'María', 'Pedro'],
        datasets: [{
          label: 'Centros',
          data: [42, 12, 8],
          backgroundColor: [
            '#ff3a82',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(120, 46, 139,1)'
          ],
          borderColor: [
            '#ff3a82',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(120, 46, 139,1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }
}
