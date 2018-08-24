import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { UserResolver } from './profile-home/profile-home.resolver';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { rootRouterConfig } from './app.routes';

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
        ReactiveFormsModule,
        RouterModule.forRoot(rootRouterConfig, { useHash: false }),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features
      ],
  // imports: [
  //   AngularFireModule.initializeApp(environment.firebase),
  //   AngularFirestoreModule, // imports firebase/firestore, only needed for database features
  //   AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  //   BrowserModule,
  //   FormsModule,
  //   ReactiveFormsModule,
  //   RouterModule.forRoot([rootRouterConfig, {useHash: false}])
    
  // ],
  providers: [AuthService, UserService, UserResolver, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
