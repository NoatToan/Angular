import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { EventService } from './services/event.service';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService  } from './token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatMenuModule } from '@angular/material/menu';
import { AdminComponent } from './admin/admin.component';
import { AlertModule, AlertService } from './common/_alert';
import { AlertsService } from 'angular-alert-module';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    LogoutComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    AlertModule
  ],
  providers: [AuthService,EventService,AuthGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
