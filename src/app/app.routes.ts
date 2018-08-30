import { PostToolComponent } from './post-tool/post-tool.component';
import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ProfileHomeComponent } from './profile-home/profile-home.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './profile-home/profile-home.resolver';
import { AuthGuard } from './core/auth.guard';
import { HomepageComponent } from './homepage/homepage.component';

export const rootRouterConfig: Routes = [
  { path: '', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'profile-home', component: ProfileHomeComponent,  resolve: { data: UserResolver}},
  { path: 'post-tool', component: PostToolComponent,  resolve: { data: UserResolver}},
  { path: 'profile-user', component: ProfileUserComponent,  resolve: { data: UserResolver}},
  { path: 'home-page', component: HomepageComponent,  resolve: { data: UserResolver}}

];

