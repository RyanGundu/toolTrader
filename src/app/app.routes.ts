import { PostToolComponent } from './post-tool/post-tool.component';
import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './core/profile-home.resolver';
import { AuthGuard } from './core/auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { PostComponent } from './post/post.component';
import { ViewuserComponent } from './viewuser/viewuser.component';
import { SearchResultsComponent } from './search-results/search-results.component';

export const rootRouterConfig: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'post/:postID', component: PostComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'post-tool', component: PostToolComponent,  resolve: { data: UserResolver}},
  { path: 'user/:uID', component: ViewuserComponent },
  { path: 'profile-user', component: ProfileUserComponent,  resolve: { data: UserResolver}},
  { path: 'search-result', component: SearchResultsComponent }
];

