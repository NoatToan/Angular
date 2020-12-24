import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserPermissionComponent } from './user/user-permission/user-permission.component';
import { AdminComponent } from './admin.component';


const routes: Routes = [
  {
      path: 'user',
      component: AdminComponent,
      children: [

        {
          path: 'permission/:id',
          component: UserPermissionComponent,
        },
        {
          path: '',
          component: UserListComponent,
          canActivate:[AuthGuard]
        },
        // {
        //   path: ':slug',
        //   component: UserDetailComponent
        // }
      ]
  },
  {
    path: 'permission',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: UserPermissionComponent,
      },
    ]
}
];
@NgModule({
  // imports: [CommonModule,RouterModule.forChild(routes)],
  imports: [RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
