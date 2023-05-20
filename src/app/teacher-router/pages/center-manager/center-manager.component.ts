import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Center } from '../../interfaces/center.interface';
import { CentersRequestsService } from '../../services/centers-requests.service';
import { RouteService } from '../../services/route-service.service';

@Component({
  selector: 'app-center-manager',
  templateUrl: './center-manager.component.html',
  styleUrls: ['./center-manager.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CenterManagerComponent {

  constructor(private fb: FormBuilder, private routeService: RouteService, private centersRequests: CentersRequestsService) { }

  centers!: Center[];
  centerData!: FormGroup;
  selectedCenter!: Center;

  searchValue!: string;
  filteredCenters?: Center[];

  modified = false;
  newEmail: string = '';

  ngOnInit() {
    this.centersRequests.getCenters().subscribe((centers) => (
      this.centers = centers.centers,
      this.filteredCenters = this.centers
    ));

    this.centerData = this.fb.group({
      newEmail: ['', Validators.required],
    });
    this.emptyCenter();


  }

  searchCenters() {
    this.filteredCenters = this.centers.filter(center => {
      const nombre = center.nombre.toLowerCase();
      const search = this.searchValue.toLowerCase();

      const normalizedNombre = nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const normalizedSearch = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      return normalizedNombre.includes(normalizedSearch);
    });
  }

  emptyCenter() {

    this.centerData.reset();

    this.selectedCenter = {
      id: -1,
      nombre: '',
      direccion: '',
      correo: ''
    };
    this.modified = false;

  }

  saveCenter() {

    // if (this.selectedCenter.nombre == '') {
    //   this.newCenter = {
    //     id: this.centers[this.centers.length - 1].id + 1,
    //     nombre: this.centerData.value.newName,
    //     direccion: this.centerData.value.newAddress,
    //     correo: this.centerData.value.newEmail,
    //   };

    //   this.centersRequests.addCenter(this.newCenter);
    // } else {
    //   this.newCenter = {
    //     id: this.selectedCenter.id,
    //     nombre: this.centerData.value.newName || this.selectedCenter.nombre,
    //     direccion: this.centerData.value.newAddress || this.selectedCenter.direccion,
    //     correo: this.centerData.value.newEmail || this.selectedCenter.correo,
    //   };

    this.newEmail = this.centerData.value.newEmail
    const index = this.centers.findIndex(center => center.id === this.selectedCenter.id);

    this.centersRequests.editCenter(this.centers[index].correo, this.newEmail);

    this.centersRequests.getCenters().subscribe((centers) => (
      this.centers = centers.centers,
      this.ngOnInit()
    ));

  }

  deleteCenter() {
    // const index = this.centers.findIndex(center => center.id === this.selectedCenter.id);
    // console.log(index)
    // this.centers.splice(index, 1);

  }

}
