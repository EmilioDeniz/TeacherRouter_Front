import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouteService } from '../../services/route-service.service';
import { Observable, map, startWith, tap } from 'rxjs';
import { Center } from '../../interfaces/center.interface';
import { CentersRequestsService } from '../../services/centers-requests.service';

@Component({
  selector: 'app-center-manager',
  templateUrl: './center-manager.component.html',
  styleUrls: ['./center-manager.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CenterManagerComponent {

  constructor(private fb: FormBuilder, private routeService: RouteService, private centersRequests: CentersRequestsService) {
    this.filteredCenters = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCenters(value))
    );
  }

  centers!: Center[];
  centerData!: FormGroup;
  searchControl = new FormControl();
  filteredCenters: Observable<Center[]>;
  selectedCenter!: Center;



  ngOnInit() {

    this.centersRequests.getCenters().pipe(
      tap((centers: Center[]) => this.centers = centers)
    );

    this.centersRequests.getCenters().subscribe((centers) => (
      console.log(centers.centers),
      this.centers = centers
    ));

    this.centerData = this.fb.group({
      newName: ['', Validators.required],
      newLocation: ['', Validators.required],
      newAddress: ['', Validators.required],
      newEmail: ['', Validators.required, Validators.email],
    });
    this.selectedCenter = {
      Id: -1,
      Name: '',
      Address: '',
      Email: ''
    };

  }

  filterCenters(value: any) {

    const filterValue = value.toLowerCase();
    return this.centers.filter(center => center.Name.toLowerCase().includes(filterValue));

  }

  newCenter!: Center;
  modified = false;

  newName: string = '';
  newLocation: string = '';
  newAddress: string = '';
  newEmail: string = '';

  // centers: Center[] = [
  //   {
  //     Id: 0,
  //     Name: 'Centro 1',
  //     Address: 'Calle 1',
  //     Email: 'Colegio',
  //   },
  //   {
  //     Id: 1,
  //     Name: 'Centro 2',
  //     Address: 'Calle 2',
  //     Email: 'Instituto',
  //   },
  //   {
  //     Id: 2,
  //     Name: 'Centro 3',
  //     Address: 'Calle 3',
  //     Email: 'Colegio',
  //   },
  //   {
  //     Id: 3,
  //     Name: 'Centro 4',
  //     Address: 'Calle 4',
  //     Email: 'Colegio',
  //   },
  //   {
  //     Id: 4,
  //     Name: 'Centro 5',
  //     Address: 'Calle 5',
  //     Email: 'Instituto',
  //   },
  // ];

  emptyCenter() {

    this.centerData.reset();

    this.selectedCenter = {
      Id: 0,
      Name: '',
      Address: '',
      Email: ''
    };
    this.newCenter = {
      Id: 0,
      Name: '',
      Address: '',
      Email: ''
    };

    this.modified = false;

  }

  saveCenter() {

    if (this.selectedCenter.Name == '') {
      this.newCenter = {
        Id: this.centers[this.centers.length - 1].Id + 1,
        Name: this.centerData.value.newName,
        Address: this.centerData.value.newAddress,
        Email: this.centerData.value.newEmail,
      };

      this.centersRequests.addCenter(this.newCenter);
    } else {
      this.newCenter = {
        Id: this.selectedCenter.Id,
        Name: this.centerData.value.newName || this.selectedCenter.Name,
        Address: this.centerData.value.newAddress || this.selectedCenter.Address,
        Email: this.centerData.value.newEmail || this.selectedCenter.Email,
      };
      const index = this.centers.findIndex(center => center.Id === this.selectedCenter.Id);
      this.centers[index] = this.newCenter;
    }

    this.emptyCenter();
  }

  deleteCenter() {
    const index = this.centers.findIndex(center => center.Id === this.selectedCenter.Id);
    console.log(index)
    this.centers.splice(index, 1);

  }

}
