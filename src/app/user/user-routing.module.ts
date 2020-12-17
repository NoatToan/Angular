import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserPermissionComponent } from './user-permission/user-permission.component';
import { UserComponent } from './user.component';


const routes: Routes = [
  // {
  //     path: 'user',
  //     component: UserComponent,
  //     children: [

        {
          path: 'permission/:id',
          component: UserPermissionComponent,
        },

        {
          path: '',
          component: UserListComponent,
          // canActivate:[AuthGuard]
        },
        // {
        //   path: ':slug',
        //   component: UserDetailComponent
        // }
  //     ]
  // }
];
@NgModule({
  // imports: [CommonModule,RouterModule.forChild(routes)],
  imports: [RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class UserRoutingModule { }
