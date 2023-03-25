import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { InfoPageComponent } from './pages/info-page/info-page.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule} from '@angular/flex-layout'
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    LoginComponent,
    InfoPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    AngularMaterialModule,
    
    ReactiveFormsModule,
    AuthRoutingModule
  
  ]
})
export class AuthModule { }
