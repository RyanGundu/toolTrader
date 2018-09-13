import { PostService } from './core/post.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';
import { UserResolver } from './core/profile-home.resolver';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { ProfileService } from './core/profile.service';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { rootRouterConfig } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { PostToolComponent } from './post-tool/post-tool.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserPostsComponent } from './user-posts/user-posts.component';
import { ScrollableDirective } from './scrollable.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PaginationService } from './pagination.service';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    PostToolComponent,
    ProfileUserComponent,
    FooterComponent,
    HomepageComponent,
    UserPostsComponent,
    ScrollableDirective,
    LoadingSpinnerComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  providers: [AuthService, UserService, PostService, ProfileService ,UserResolver, AuthGuard, PaginationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
