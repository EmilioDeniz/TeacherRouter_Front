import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
interface Center {
  Id: number;
  Name: string;
  Location: string;
  Address: string;
  Type: string;
}
@Component({
  selector: 'app-center-manager',
  templateUrl: './center-manager.component.html',
  styleUrls: ['./center-manager.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CenterManagerComponent {

  centerData!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.centerData = this.fb.group({
      newName: ['', Validators.required],
      newLocation: ['', Validators.required],
      newAddress: ['', Validators.required],
      newType: ['', Validators.required],
    });
    this.selectedCenter = {
      Id: 0,
      Name: '',
      Location: '',
      Address: '',
      Type: ''
    };
  }

  newCenter!: Center;
  selectedCenter!: Center;
  modified = false;


  newName: string = '';
  newLocation: string = '';
  newAddress: string = '';
  newType: string = '';

  centers: Center[] = [
    {
      Id: 0,
      Name: 'Centro 1',
      Location: 'Ciudad 1',
      Address: 'Calle 1',
      Type: 'Colegio',
    },
    {
      Id: 1,
      Name: 'Centro 2',
      Location: 'Ciudad 2',
      Address: 'Calle 2',
      Type: 'Instituto',
    },
    {
      Id: 2,
      Name: 'Centro 3',
      Location: 'Ciudad 3',
      Address: 'Calle 3',
      Type: 'Colegio',
    },
    {
      Id: 3,
      Name: 'Centro 4',
      Location: 'Ciudad 4',
      Address: 'Calle 4',
      Type: 'Colegio',
    },
    {
      Id: 4,
      Name: 'Centro 5',
      Location: 'Ciudad 5',
      Address: 'Calle 5',
      Type: 'Instituto',
    },
  ];

  emptyCenter() {

    this.centerData.reset();

    this.selectedCenter = {
      Id: 0,
      Name: '',
      Location: '',
      Address: '',
      Type: ''
    };
    this.newCenter = {
      Id: 0,
      Name: '',
      Location: '',
      Address: '',
      Type: ''
    };

    this.modified = false;

  }

  editCenter() {
    console.log(this.selectedCenter);
    const updatedCenter: Center = {
      Id: this.selectedCenter.Id,
      Name: this.newName || this.selectedCenter.Name,
      Location: this.newLocation || this.selectedCenter.Location,
      Address: this.newAddress || this.selectedCenter.Address,
      Type: this.newType || this.selectedCenter.Type
    };

    const index = this.centers.findIndex(center => center.Id === this.selectedCenter.Id);
    if (index !== -1) {
      this.centers[index] = updatedCenter;
      this.modified = true;
    }

    this.emptyCenter();
    this.modified = true;

  }

  saveCenter() {

    if (this.selectedCenter.Name == '') {
      this.newCenter = {
        Id: this.centers[this.centers.length - 1].Id + 1,
        Name: this.centerData.value.newName,
        Location: this.centerData.value.newLocation,
        Address: this.centerData.value.newAddress,
        Type: this.centerData.value.newType,
      };
      this.centers.push(this.newCenter);
    } else {
      this.newCenter = {
        Id: this.selectedCenter.Id,
        Name: this.centerData.value.newName || this.selectedCenter.Name,
        Location: this.centerData.value.newLocation || this.selectedCenter.Location,
        Address: this.centerData.value.newAddress || this.selectedCenter.Address,
        Type: this.centerData.value.newType || this.selectedCenter.Type,
      };
      const index = this.centers.findIndex(center => center.Id === this.selectedCenter.Id);
      this.centers[index] = this.newCenter;
    }

    this.emptyCenter();
  }

  deleteCenter() {
    const index = this.centers.findIndex(center => center.Id === this.selectedCenter.Id);
    console.log(index)
    this.centers.splice(index,1);

  }

}
