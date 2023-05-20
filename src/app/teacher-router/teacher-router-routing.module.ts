import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { CenterManagerComponent } from './pages/center-manager/center-manager.component';
import { ItemsManagerComponent } from './pages/items-manager/items-manager.component';
import { RouteManagerComponent } from './pages/route-manager/route-manager.component';
import { TeacherHomeComponent } from './pages/teacher-home/teacher-home.component';
import { UserManagerComponent } from './pages/user-manager/user-manager.component';
import { ValidarTokenGuard } from '../guards/validar-token.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admin-home', component: AdminHomeComponent,
        canActivate: [ValidarTokenGuard],
      },
      {
        path: 'center-manager', component: CenterManagerComponent,
        canActivate: [ValidarTokenGuard],
      },
      {
        path: 'items-manager', component: ItemsManagerComponent,
        canActivate: [ValidarTokenGuard],
      },
      {
        path: 'route-manager', component: RouteManagerComponent,
        canActivate: [ValidarTokenGuard],
      },
      {
        path:'teacher-home', component: TeacherHomeComponent,
        canActivate: [ValidarTokenGuard],
      },
      {
        path:'user-manager', component: UserManagerComponent,
        //canActivate: [ValidarTokenGuard],
      },
      {
        path:'**', redirectTo: 'admin-home'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRouterRoutingModule { }
