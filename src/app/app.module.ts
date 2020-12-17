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
import {TokenInterceptorService} from './token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table'  ;
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FilterPipe } from './user/pipe/filter-custom.pipe';
import { UserModule } from './user/user.module';
import { UserComponent } from './user/user.component';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    LogoutComponent,
    UserComponent,
    // FilterPipe,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // UserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    // SharedModule,
    // MatSliderModule,
    // MatTableModule,
    // MatPaginatorModule,
    // MatTabsModule,
    // MatListModule,
    // MatIconModule,
    // MatFormFieldModule,
    // MatInputModule,
  ],
  providers: [AuthService,EventService,AuthGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
