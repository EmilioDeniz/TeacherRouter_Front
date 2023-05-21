import {AfterViewInit, Component, HostListener, Injectable, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatDialog} from "@angular/material/dialog";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {ChangePasswordDialogComponent} from "../../components/change-password-dialog/change-password-dialog.component";
import {AddUserDialogComponent} from "../../components/add-user-dialog/add-user-dialog.component";
import {MatPaginator, MatPaginatorIntl} from "@angular/material/paginator";
import * as colorette from "colorette";
import {ThemePalette} from "@angular/material/core";
import {HttpPostServiceService} from "../../services/http-post-service.service";
import {tap} from "rxjs/operators";
import * as CryptoJS from 'crypto-js';
import {map, startWith} from "rxjs";
import {UsersRequestsService} from "../../services/users-requests.service";
import {User} from "../../interfaces/user.interface";

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
  dataSource = new MatTableDataSource<User>();
  selectedRow?: User;
  isUserDeleted: boolean = true;
  name?: string;
  role?: boolean;

  days: any = [
    {name: 'L', selected: false},
    {name: 'M', selected: false},
    {name: 'X', selected: false},
    {name: 'J', selected: false},
    {name: 'V', selected: false},
    {name: 'S', selected: false},
    {name: 'D', selected: false}
  ]

  displayedColumns: string[] = ['name', 'isAdmin', 'startAddress'];
  pageSize = window.innerHeight < 900 ? 6 : 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<User>;
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.pageSize = window.innerHeight < 900 ? 6 : 10;
    this.paginator._changePageSize(this.pageSize);
  }
  constructor(public dialog: MatDialog, private usersRequests: UsersRequestsService) {}
  ngOnInit() {
    this.usersRequests.getUsersData().pipe(
      tap((users: User[]) => this.dataSource = new MatTableDataSource(users))
    ).subscribe(() => {
      this.searchControl.valueChanges.subscribe(value => {
        // Actualizar el filtro de la fuente de datos de la tabla
        this.dataSource.filter = value;
      });
    });
    this.usersRequests.userAdded$.subscribe(() => {
      // Actualizar la tabla después de agregar el usuario
      this.updateUserData();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  updateUserData() {
    this.usersRequests.getUsersData().pipe(
      tap((users: User[]) => this.dataSource = new MatTableDataSource(users))
    ).subscribe(() => {
      this.table.renderRows();
    });
  }

  openChangePasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent);
    let password = null;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("result: ", result);
        
        password = CryptoJS.SHA256(result.newPassword).toString();
        console.log("password: ", password);
        
        this.usersRequests.changePasswordFromServer(this.selectedRow!.name, password);
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent);
    let password = null;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersRequests.addUserInServer(result[0], CryptoJS.SHA256(result[2]).toString(), result[1] ? '1' : '0');

        //this.dataSource.data.push({ name: newUser.name, isAdmin: newUser.isAdmin, startAddress: newUser.startAddress, days: newUser.days });
        /*newUser.days.toString = function() {
          let result = '';
          for (let i = 0; i < this.length; i++) {
            result += `${this[i].selected ? '1' : '0'},`;
          }
          return result.slice(0, -2);
        };
        console.log(newUser.days.toString());*/
      }
    });

  }

  selectRow(row: User) {
    this.selectedRow = row;
    this.name = row.name;
    this.role = this.selectedRow.isAdmin;
    this.isUserDeleted = false;
  }

  updateUser() {
    if (!this.selectedRow) return;

    this.usersRequests.modifyUserDataFromServer(this.selectedRow.name, this.name!, this.role ? '1' : '0');

    this.selectedRow.name = this.name!;
    this.selectedRow.isAdmin = this.role!;
  }
  deleteUser() {
    this.usersRequests.deleteUserFromServer(this.selectedRow!.name);
    this.clearSelection();
    this.updateUserData();
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

