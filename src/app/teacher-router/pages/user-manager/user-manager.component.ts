import {AfterViewInit, Component, HostListener, Injectable, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatDialog} from "@angular/material/dialog";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {ChangePasswordDialogComponent} from "../../components/change-password-dialog/change-password-dialog.component";
import {AddUserDialogComponent} from "../../components/add-user-dialog/add-user-dialog.component";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import * as colorette from "colorette";
import {ThemePalette} from "@angular/material/core";

@Injectable()
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
  { name: 'Juan Quintana', isAdmin: true},
  { name: 'Maria García', isAdmin: false },
  { name: 'Pedro Lopéz', isAdmin: true },
  { name: 'Juan Manuel Fernández', isAdmin: false },
  { name: 'Maria del Carmen Martín', isAdmin: false },
  { name: 'Ricardo García', isAdmin: true },
  { name: 'Laura Martínez', isAdmin: false },
  { name: 'Carmen Rodriguez', isAdmin: true },
  { name: 'Manolo Sánchez', isAdmin: true },
  { name: 'Alba González', isAdmin: false },
  { name: 'Francisco Pérez', isAdmin: false },
  { name: 'David Ortega', isAdmin: true },
  { name: 'Jose Luis Rodriguez', isAdmin: false },
  { name: 'Javier Lopéz', isAdmin: false },
  { name: 'Beatriz Pérez ', isAdmin: false }
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
  selectedRow: User = USER_DATA[0];
  isUserDeleted: boolean = false;
  name: string = this.selectedRow.name;
  role: boolean = this.selectedRow.isAdmin;
  days = [
    {name: 'L', selected: true},
    {name: 'M', selected: true},
    {name: 'X', selected: true},
    {name: 'J', selected: true},
    {name: 'V', selected: true},
    {name: 'S', selected: false},
    {name: 'D', selected: false}
  ];
  displayedColumns: string[] = ['name', 'isAdmin'];
  pageSize = window.innerHeight < 900 ? 6 : 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<User>;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.pageSize = window.innerHeight < 900 ? 6 : 10;
    this.paginator._changePageSize(this.pageSize);
  }
  constructor(public dialog: MatDialog) {}
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
      if (result) {
        const newUser = {
          name: result[0],
          isAdmin: result[1]
        };
        this.dataSource.data.push({ name: newUser.name, isAdmin: newUser.isAdmin });
      }
    });
    this.table.renderRows();
  }

  selectRow(row: User) {
    this.selectedRow = row;
    this.name = row.name;
    this.role = this.selectedRow.isAdmin;
    this.isUserDeleted = false;
  }

  updateUser() {
    if (!this.selectedRow) return;

    console.log(this.name);
    console.log(this.selectedRow.isAdmin);

    this.selectedRow.name = this.name;
    this.selectedRow.isAdmin = this.role;

    this.dataSource.data = this.dataSource.data.map(user => {
      if (user === this.selectedRow) {
        return { ...user, name: this.name, isAdmin: this.role };
      }
      return user;
    });
    this.table.renderRows();
    this.clearSelection();
  }
  deleteUser() {
    const index = this.dataSource.data.indexOf(this.selectedRow);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
    this.clearSelection();
  }
  toggleDay(day: any) {
    day.selected = !day.selected;
  }

  clearSelection() {
    this.name = '';
    this.role = false;
    this.isUserDeleted = true;
  }
}

