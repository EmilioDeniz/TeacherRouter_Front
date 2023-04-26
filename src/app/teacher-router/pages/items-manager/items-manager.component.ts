import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Material {
  Id: number;
  Name: string;
  Description: string;
}

@Component({
  selector: 'app-items-manager',
  templateUrl: './items-manager.component.html',
  styleUrls: ['./items-manager.component.css']
})
export class ItemsManagerComponent {

  materialData !: FormGroup;

  constructor(private fb: FormBuilder) { }

  modified: boolean = false;
  selectedMaterials!: Material[];

  usedMaterials: Material[] = [];
  newMaterial!: Material;

  newName: string = '';
  newDescription: string = '';

  ngOnInit() {
    this.materialData = this.fb.group({
      newName: ['', Validators.required],
      newDescription: ['', Validators.required],
    });
  }

  materials: Material[] = [
    {
      Id: 0,
      Name: 'Bolígrafos',
      Description: 'Bolígrafos con el logo del sindicato para entregar en los centros'
    },
    {
      Id: 1,
      Name: 'Calendarios',
      Description: 'Calendarios con diferentes fotos del sindicato '
        + 'y con explicaciones de actividades que se realizan'
    },
    {
      Id: 2,
      Name: 'Botellas',
      Description: 'Botellas con logo del sindicato que se entregan a los profesores'
    },
    {
      Id: 3,
      Name: 'Lápices',
      Description: 'Lápices con un recubrimiento de una imagen del ' + 'sindicato para los centros'
    },
    {
      Id: 4,
      Name: 'Otro',
      Description: 'Otros'
    },
    {
      Id: 5,
      Name: 'Otro 2',
      Description: 'Otros 2'
    },
    {
      Id: 6,
      Name: 'Otro 3',
      Description: 'Otros 3'
    }
  ];


  getLastMaterial(): Material {
    if (!this.selectedMaterials || this.selectedMaterials.length == 0) {
      return {} as Material;
    } else {
      return (this.selectedMaterials[this.selectedMaterials.length - 1])
    }
  }

  saveMaterial() {
    if (!this.selectedMaterials || this.selectedMaterials.length == 0) {
      console.log("añadir nuevo");
      this.newMaterial = {
        Id: this.materials[this.materials.length - 1].Id + 1,
        Name: this.materialData.value.newName,
        Description: this.materialData.value.newDescription
      };
      this.materials.push(this.newMaterial);
    } else {
      this.newMaterial = {
        Id: this.materialData.value.Id || this.getLastMaterial().Id,
        Name: this.materialData.value.newName || this.getLastMaterial().Name,
        Description: this.materialData.value.newDescription || this.getLastMaterial().Description
      };
      const index = this.materials.findIndex(material => material.Id === this.getLastMaterial().Id);
      this.materials[index] = this.newMaterial;
    }

    this.resetSelected();
  }

  removeMaterial() {
    for (let index = 0; index < this.selectedMaterials.length; index++) {
      this.materials.splice(this.materials.lastIndexOf(this.selectedMaterials[index]), 1);
    }

    this.resetSelected();
  }

  addToList() {
    for (let index = 0; index < this.selectedMaterials.length; index++) {

      const element = this.selectedMaterials[index];
      if (this.usedMaterials.lastIndexOf(element) == -1) {

        this.usedMaterials.push(element);

      }
    }

    this.resetSelected();

    this.modified = false;
  }

  emptyList() {
    this.resetSelected();
    this.usedMaterials = [];
  }

  resetSelected(){
    this.selectedMaterials = [];
    this.modified = false;

  }

}
