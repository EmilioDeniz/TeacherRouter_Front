import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { map, Observable, startWith } from "rxjs";
import {User} from "../../../../environments/environment";
import {HttpPostServiceService} from "../../services/http-post-service.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.css']
})

export class AdminSidenavComponent implements OnInit {
  searchControl = new FormControl();
  users!: User[];
  filteredUsers!: Observable<User[]>;
  selectedUser!: User;
  // Ejemplo de datos de usuario

  days = [
    {name: 'L', selected: false},
    {name: 'M', selected: false},
    {name: 'X', selected: false},
    {name: 'J', selected: false},
    {name: 'V', selected: false},
    {name: 'S', selected: false},
    {name: 'D', selected: false}
  ];

  constructor(private router: Router, private httpService: HttpPostServiceService) {}

  ngOnInit() {
    this.getUsersData().pipe(
      tap((users: User[]) => this.users = users)
    ).subscribe(() => {
      console.log(this.users);
      this.selectedUser = this.users[0];
      this.filteredUsers = this.searchControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterUsers(value))
      );
    });
  }

  filterUsers(value: any) {
    const filterValue = value.toLowerCase();
    return this.users.filter(user => user.name.toLowerCase().includes(filterValue));
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  goToPage(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }

  toggleDay(day: any) {
    day.selected = !day.selected;
  }

  getUsersData() {
    const formData = new FormData();
    formData.append('token', localStorage.getItem('teacher-token')!);
    return this.httpService.peticionServer('getUsersData', formData).pipe(
      map((resp: any) => resp.users.map((user: any) => ({
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
      })))
    );
  }
}
