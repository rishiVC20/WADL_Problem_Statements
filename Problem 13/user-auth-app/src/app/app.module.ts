// import { NgModule } from "@angular/core";
// import { BrowserModule } from "@angular/platform-browser";
// import { FormsModule } from "@angular/forms";

// import { AppComponent } from "./app.component";
// import { RegisterComponent } from "./register/register.component";
// import { LoginComponent } from "./login/login.component";
// import { ProfileComponent } from "./profile/profile.component";
// import { AuthService } from "./auth.service";

// @NgModule({
//     declarations:[
//         AppComponent,
//         RegisterComponent,
//         LoginComponent,
//         ProfileComponent
//     ],
//     imports:[
//         BrowserModule,
//         FormsModule
//     ],
//     providers:[AuthService],
//     bootstrap:[AppComponent]
// })

// export class AppModule{}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { appRoutes } from './app.routes;

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
