import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";
import { map, Observable, startWith } from "rxjs";

interface User {
  name: string;
  email: string;
  id: number;
}

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.css']
})
export class AdminSidenavComponent {
  searchControl = new FormControl();
  filteredUsers: Observable<User[]>;
  selectedUser?: User;
  // Ejemplo de datos de usuario
  users: User[] = [
    { name: 'Juan', email: 'juan@example.com', id: 1 },
    { name: 'Maria', email: 'maria@example.com', id: 2 },
    { name: 'Pedro', email: 'pedro@example.com', id: 3 }
    // ...
  ];

  days = [
    {name: 'L', selected: false},
    {name: 'M', selected: false},
    {name: 'X', selected: false},
    {name: 'J', selected: false},
    {name: 'V', selected: false},
    {name: 'S', selected: false},
    {name: 'D', selected: false}
  ];

  constructor(private router: Router) {
    this.filteredUsers = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterUsers(value))
    );
  }

  ngOnInit() {
    this.selectedUser = this.users[0];
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
}
