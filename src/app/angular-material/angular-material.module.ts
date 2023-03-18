import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";




@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatSidenavModule,
    MatIconModule
  ]
})
export class AngularMaterialModule { }

