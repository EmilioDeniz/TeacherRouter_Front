import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Material } from '../../interfaces/material.interface';
import { ItemsRequestsService } from '../../services/items-requests.service';


@Component({
  selector: 'app-items-manager',
  templateUrl: './items-manager.component.html',
  styleUrls: ['./items-manager.component.css']
})
export class ItemsManagerComponent {

  materialData !: FormGroup;

  constructor(private fb: FormBuilder, private itemsRequest: ItemsRequestsService) { }

  modified: boolean = false;

  materials!: Material[];
  selectedMaterials!: Material[];
  newMaterial!: Material;
  usedMaterials: Material[] = [];

  newName: string = '';
  newDescription: string = '';

  searchValue!: string;
  filteredMaterials?: Material[];


  ngOnInit() {
    this.itemsRequest.getMaterial().subscribe((materials) => (
      this.materials = materials.materials,
      this.filteredMaterials = this.materials
    ));

    this.materialData = this.fb.group({
      newName: ['', Validators.required],
      newDescription: ['', Validators.required],
    });

  }

  searchMaterial() {
    this.filteredMaterials = this.materials.filter(material => {
      const nombre = material.name.toLowerCase();
      const search = this.searchValue.toLowerCase();

      const normalizedNombre = nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const normalizedSearch = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      return normalizedNombre.includes(normalizedSearch);
    });
  }

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
        id: this.materials[this.materials.length - 1].id + 1,
        name: this.materialData.value.newName,
        description: this.materialData.value.newDescription
      };
      this.itemsRequest.addMaterial(this.newMaterial);
    } else {
      this.newMaterial = {
        id: this.materialData.value.Id || this.getLastMaterial().id,
        name: this.materialData.value.newName || this.getLastMaterial().name,
        description: this.materialData.value.newDescription || this.getLastMaterial().description
      };
      this.itemsRequest.editMaterial(this.newMaterial);
    }
    this.itemsRequest.getMaterial().subscribe((materials) => (
      this.ngOnInit()
    ));
    this.resetSelected();
  }

  removeMaterial() {
    for (let index = 0; index < this.selectedMaterials.length; index++) {
      this.itemsRequest.removeMaterial(this.selectedMaterials[index])
    }

    this.itemsRequest.getMaterial().subscribe((materials) => (
      this.ngOnInit()
    ));

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
    this.usedMaterials = [];
  }

  resetSelected() {
    this.selectedMaterials = [];
    this.modified = false;

  }

}
