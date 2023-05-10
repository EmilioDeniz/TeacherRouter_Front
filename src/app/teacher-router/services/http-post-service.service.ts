import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpPostServiceService {

  constructor() { }

  peticionSever(url: string, data: FormData): any{

    console.log("url: ", url);
    console.log("data: ", data);


  }



}
