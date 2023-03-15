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


@NgModule({
  declarations: [
    CreateUserComponent,
    UserManagerComponent,
    CenterManagerComponent,
    RouteManagerComponent,
    ItemsManagerComponent,
    AdminHomeComponent,
    TeacherHomeComponent
  ],
  imports: [
    CommonModule,
    TeacherRouterRoutingModule
  ]
})
export class TeacherRouterModule { }
