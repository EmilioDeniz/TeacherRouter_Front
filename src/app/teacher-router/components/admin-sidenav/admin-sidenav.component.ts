import {Component, OnInit} from '@angular/core';
import { FormControl } from "@angular/forms";
import { map, Observable, startWith } from "rxjs";
import {tap} from "rxjs/operators";
import {UsersRequestsService} from "../../services/users-requests.service";
import {User} from "../../interfaces/user.interface";

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

  constructor(private usersRequests: UsersRequestsService) {}

  ngOnInit() {
    this.usersRequests.getUsersData().pipe(
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

  toggleDay(day: any) {
    day.selected = !day.selected;
  }
}
