import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserPermissionComponent } from './user-permission/user-permission.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FilterPipe } from './pipe/filter-custom.pipe';
import { MatInputModule } from '@angular/material/input';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import { UserService } from '../services/user.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    UserListComponent,
    UserPermissionComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    // SharedModule,
    FormsModule,
    // Ang mat
    MatMenuModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    MatSidenavModule,
    MatCheckboxModule,
  ],
  providers: [UserService],
  exports:[
  ]
  
})
export class UserModule { }
