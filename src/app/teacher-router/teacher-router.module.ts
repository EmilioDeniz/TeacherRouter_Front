import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { AdminSidenavComponent } from './components/admin-sidenav/admin-sidenav.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module'
import { CenterManagerComponent } from './pages/center-manager/center-manager.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ItemsManagerComponent } from './pages/items-manager/items-manager.component';
import { MapComponent } from './components/map/map.component';
import { RouteManagerComponent } from './pages/route-manager/route-manager.component';
import { UserManagerComponent } from './pages/user-manager/user-manager.component';
import { TeacherHomeComponent } from './pages/teacher-home/teacher-home.component';
import { TeacherRouterRoutingModule } from './teacher-router-routing.module';
import { ChangePasswordDialogComponent } from './components/change-password-dialog/change-password-dialog.component';
import { AddUserDialogComponent } from './components/add-user-dialog/add-user-dialog.component';
import { CenterLabelComponent } from './components/center-label/center-label.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


@NgModule({
  declarations: [
    UserManagerComponent,
    CenterManagerComponent,
    RouteManagerComponent,
    ItemsManagerComponent,
    AdminHomeComponent,
    TeacherHomeComponent,
    AdminMenuComponent,
    HeaderComponent,
    MapComponent,
    AdminSidenavComponent,
    FooterComponent,
    ChangePasswordDialogComponent,
    AddUserDialogComponent,
    CenterLabelComponent
  ],
  exports: [
    AdminMenuComponent,
    AdminHomeComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    TeacherRouterRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    LeafletModule
  ]
})
export class TeacherRouterModule { }
