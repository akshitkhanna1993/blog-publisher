import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, MatProgressSpinnerModule, MatExpansionModule, MatToolbarModule, MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations:[
    LoginComponent,
    SignupComponent
  ],

imports:[
  CommonModule,
  FormsModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  AuthRoutingModule
]

})
export class AuthModule {

}
