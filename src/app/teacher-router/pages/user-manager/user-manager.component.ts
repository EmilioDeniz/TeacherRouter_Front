import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {ChangePasswordDialogComponent} from "../../components/change-password-dialog/change-password-dialog.component";
import {AddUserDialogComponent} from "../../components/add-user-dialog/add-user-dialog.component";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";

class MatPaginatorIntlCro extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Usuarios por página:';
  override nextPageLabel = 'Siguiente página';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primera página';
  override lastPageLabel = 'Última página';

  override getRangeLabel = function (page: any, pageSize: any, length: any) {
    const start = page * pageSize + 1;
    let end = (page + 1) * pageSize;
    if (end > length) {
      end = length;
    }
    return start + ' - ' + end + ' / ' + length;
  };
}

interface User {
  name: string;
  isAdmin: boolean;
}

const USER_DATA: User[] = [
  { name: 'Juan', isAdmin: true},
  { name: 'Maria', isAdmin: false },
  { name: 'Pedro', isAdmin: false },
  { name: 'Juan Manuel', isAdmin: false },
  { name: 'Maria', isAdmin: false },
  { name: 'Pedro', isAdmin: false },
  { name: 'Juan Manuel', isAdmin: false },
  { name: 'Maria', isAdmin: false },
  { name: 'Pedro', isAdmin: false },
  { name: 'Paco ', isAdmin: false }
];

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css'],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }
  ]
})
export class UserManagerComponent implements OnInit, AfterViewInit {
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(public dialog: MatDialog) {
    this.selectedValue = this.selectedRow.isAdmin ? 'two' : 'one';
  }

  ngOnInit() {
    this.searchControl.valueChanges.subscribe(value => {
      // Actualizar el filtro de la fuente de datos de la tabla
      this.dataSource.filter = value;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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

