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
import {User} from "../../../../environments/environment";

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
  constructor(public dialog: MatDialog, private httpService: HttpPostServiceService) {}
  ngOnInit() {
    this.getUsersData();
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
    let password = null;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        password = CryptoJS.SHA256(result).toString();
        this.changePasswordFromServer(this.selectedRow!.name, password);
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent);
    let password = null;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addUserInServer(result[0], CryptoJS.SHA256(result[2]).toString(), result[1] ? '1' : '0');
        this.getUsersData();

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

    this.modifyUserDataFromServer(this.selectedRow.name, this.name!, this.role ? '1' : '0');

    this.selectedRow.name = this.name!;
    this.selectedRow.isAdmin = this.role!;

    /*this.dataSource.data = this.dataSource.data.map(user => {
      if (user === this.selectedRow) {
        return { ...user, name: this.name!, isAdmin: this.role! };
      }
      return user;
    });*/
    this.getUsersData();
    this.clearSelection();
  }
  deleteUser() {
    this.deleteUserFromServer(this.selectedRow!.name);
    /*const index = this.dataSource.data.indexOf(this.selectedRow!);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();*/
    this.getUsersData();
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

  getUsersData() {
    const formData = new FormData();
    formData.append('token', localStorage.getItem('teacher-token')!);
    this.httpService.peticionServer('getUsersData', formData).subscribe((resp: any) => {
      this.dataSource = resp.users.map((user: any) => ({
        name: user.username,
        isAdmin: user.rol === 1,
        startAddress: '123 Main St',
        days: [
          {name: 'L', selected: true},
          {name: 'M', selected: true},
          {name: 'X', selected: true},
          {name: 'J', selected: true},
          {name: 'V', selected: true},
          {name: 'S', selected: false},
          {name: 'D', selected: false}
        ]
      }));
      this.table.renderRows();
    });
  }

  modifyUserDataFromServer(username: string, newUsername: string, isAdmin: string) {
    const formData = new FormData();
    formData.append('token', localStorage.getItem('teacher-token')!);
    formData.append('username', username);
    formData.append('newUsername', newUsername);
    formData.append('isAdmin', isAdmin);
    this.httpService.peticionServer('modifyUser', formData).subscribe((resp: any) => {
      console.log(resp)
    });
  }

  deleteUserFromServer(username: string) {
    const formData = new FormData();
    formData.append('token', localStorage.getItem('teacher-token')!);
    formData.append('username', username);
    this.httpService.peticionServer('deleteUser', formData).subscribe((resp: any) => {
      console.log(resp)
    })
  }

  changePasswordFromServer(username: string, newPassword: string) {
    const formData = new FormData();
    formData.append('token', localStorage.getItem('teacher-token')!);
    formData.append('username', username);
    formData.append('newPassword', newPassword);
    this.httpService.peticionServer('changePassword', formData).subscribe((resp: any) => {
      console.log(resp)
    });
  }

  private addUserInServer(username: string, password: string, isAdmin: string) {
    const formData = new FormData();
    formData.append('token', localStorage.getItem('teacher-token')!);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('isAdmin', isAdmin);
    //formData.append('startAddress', newUser.startAddress);
    //formData.append('days', newUser.days.toString());

    this.httpService.peticionServer('register', formData).subscribe((resp: any) => {
        console.log(resp);
      }
    );
  }
}

