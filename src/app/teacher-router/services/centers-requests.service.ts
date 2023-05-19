import { Injectable } from '@angular/core';
import { HttpPostServiceService } from './http-post-service.service';
import { Observable, map } from 'rxjs';
import { Center } from '../interfaces/center.interface';



@Injectable({
  providedIn: 'root'
})
export class CentersRequestsService {

  constructor(private httpService: HttpPostServiceService) { }

  getCenters(): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('token', localStorage.getItem('teacher-token')!);

    return this.httpService.peticionServer('getCenters', formData);
  }

  addCenter(center: Center) {

  }

  editCenter(oldEmail: string, newEmail: string) {

    const formData = new FormData();

    formData.append('token', localStorage.getItem('teacher-token')!);
    formData.append('old_email', oldEmail);
    formData.append('new_email', newEmail);

    this.httpService.peticionServer('modifyCenterEmail', formData).subscribe((resp: any) =>{
      console.log(resp)
    });
  }
}
