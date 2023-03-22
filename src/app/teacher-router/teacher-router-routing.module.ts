import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { CenterManagerComponent } from './pages/center-manager/center-manager.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { ItemsManagerComponent } from './pages/items-manager/items-manager.component';
import { RouteManagerComponent } from './pages/route-manager/route-manager.component';
import { TeacherHomeComponent } from './pages/teacher-home/teacher-home.component';
import { UserManagerComponent } from './pages/user-manager/user-manager.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admin-home', component: AdminHomeComponent
      },
      {
        path: 'center-manager', component: CenterManagerComponent
      },
      {
        path: 'create-user', component: CreateUserComponent
      },
      {
        path: 'items-manager', component: ItemsManagerComponent
      },
      {
        path: 'route-manager', component: RouteManagerComponent
      },
      {
        path:'teacher-home', component: TeacherHomeComponent 
      },
      {
        path:'user-manager', component: UserManagerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRouterRoutingModule { }
