import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './teacher-router/components/header/header.component';
import { TeacherRouterModule } from './teacher-router/teacher-router.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TeacherRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
