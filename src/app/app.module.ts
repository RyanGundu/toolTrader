import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { ProfileHomeComponent } from './profile-home/profile-home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    ProfileHomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
      path: 'register',
      component: RegisterComponent
      },
      {
      path: 'profile-home',
      component: ProfileHomeComponent
      },
      {
      path: '',
      component: LoginComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
