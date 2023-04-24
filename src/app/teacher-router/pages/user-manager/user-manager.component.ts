import {Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {ChangePasswordDialogComponent} from "../../components/change-password-dialog/change-password-dialog.component";
import {AddUserDialogComponent} from "../../components/add-user-dialog/add-user-dialog.component";

interface User {
  name: string;
  isAdmin: boolean;
}

const USER_DATA: User[] = [
  { name: 'Juan', isAdmin: true},
  { name: 'Maria', isAdmin: false },
  { name: 'Pedro', isAdmin: false },
  { name: 'Juan Manuel', isAdmin: false }
];

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {
  searchControl = new FormControl();
  // Ejemplo de datos de usuario
  dataSource = new MatTableDataSource<User>(USER_DATA);
  /* TS SELECCIONADOR DE MATERIALES
  myControl = new FormControl();
  options: string[] = ['Bolígrafos', 'Folios', 'Periódicos'];
  filteredOptions: Observable<string[]>;
  misItems: string[] = [];
   */
  selectedRow: User = USER_DATA[0];
  selectedValue: string;

  days = [
    {name: 'L', selected: false},
    {name: 'M', selected: false},
    {name: 'X', selected: false},
    {name: 'J', selected: false},
    {name: 'V', selected: false},
    {name: 'S', selected: false},
    {name: 'D', selected: false}
  ];



  displayedColumns: string[] = ['name', 'isAdmin'];


  constructor(public dialog: MatDialog) {
    this.selectedValue = this.selectedRow.isAdmin ? 'two' : 'one';
    /* CONTRUCTOR SELECCIONADOR DE MATERIALES
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );*/
  }

  ngOnInit() {
    this.searchControl.valueChanges.subscribe(value => {
      // Actualizar el filtro de la fuente de datos de la tabla
      this.dataSource.filter = value;
    });
  }

  openChangePasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  toggleDay(day: any) {
    day.selected = !day.selected;
  }

  selectRow(row: User) {
    this.selectedRow = row;
    // Aquí puedes agregar código para mostrar o modificar la información del usuario seleccionado
    this.selectedValue = this.selectedRow.isAdmin ? 'two' : 'one';
  }

  /*
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
   */

  /*
  addItem() {
    if (this.myControl.value) {
      this.misItems = [this.myControl.value];
    }
  }
   */

}
