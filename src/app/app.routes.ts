import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './profile-home/profile-home.resolver';
import { AuthGuard } from './core/auth.guard';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'profile-home', component: ProfileHomeComponent,  resolve: { data: UserResolver}}
];
