import { Injectable } from '@angular/core';
import {HttpPostServiceService} from "./http-post-service.service";
import {map, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersRequestsService {

  private userAddedSource = new Subject<void>();
  userAdded$ = this.userAddedSource.asObservable();

  constructor(private httpService: HttpPostServiceService) { }

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

  addUserInServer(username: string, password: string, isAdmin: string) {
    const formData = new FormData();
    formData.append('token', localStorage.getItem('teacher-token')!);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('isAdmin', isAdmin);
    //formData.append('startAddress', newUser.startAddress);
    //formData.append('days', newUser.days.toString());

    this.httpService.peticionServer('register', formData).subscribe((resp: any) => {
        console.log(resp);
        this.userAddedSource.next();
      }
    );
  }
}
