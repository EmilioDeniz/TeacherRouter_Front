import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HttpPostServiceService {

  constructor(private http: HttpClient) { }

  get apiUrl() {
    return `${environment.apiUrl}`;
  }

  peticionSever(url: string, data: FormData): any{

    return this.http.post<any>(`${this.apiUrl}/${url}`, data);

  }
}
