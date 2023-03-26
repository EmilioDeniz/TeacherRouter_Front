import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRouterRoutingModule } from './teacher-router-routing.module';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { UserManagerComponent } from './pages/user-manager/user-manager.component';
import { CenterManagerComponent } from './pages/center-manager/center-manager.component';
import { RouteManagerComponent } from './pages/route-manager/route-manager.component';
import { ItemsManagerComponent } from './pages/items-manager/items-manager.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { TeacherHomeComponent } from './pages/teacher-home/teacher-home.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module'
import { HeaderComponent } from './components/header/header.component';
import { MapComponent } from './components/map/map.component';
import { AdminSidenavComponent } from './components/admin-sidenav/admin-sidenav.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CreateUserComponent,
    UserManagerComponent,
    CenterManagerComponent,
    RouteManagerComponent,
    ItemsManagerComponent,
    AdminHomeComponent,
    TeacherHomeComponent,
    AdminMenuComponent,
    HeaderComponent,
    MapComponent,
    AdminSidenavComponent
  ],
  exports: [
    AdminMenuComponent,
    AdminHomeComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    TeacherRouterRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class TeacherRouterModule { }
