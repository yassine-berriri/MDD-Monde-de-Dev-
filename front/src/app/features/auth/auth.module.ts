import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/interceptors/jwt.interceptor';

const materialModule = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatIconModule,
  MatInputModule  
]


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
    
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    AuthRoutingModule,
  ],
  imports: [
    
    CommonModule,
    
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModule
  ]
})
export class AuthModule { }
