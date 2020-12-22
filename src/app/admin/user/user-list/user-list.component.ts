import { Component, OnInit,AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { UserModel} from '../../../models/user.model'
import { MatPaginator} from '@angular/material/paginator';
import { UserPermissionComponent } from '../user-permission/user-permission.component';
import { exit } from 'process';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AlertsService } from 'angular-alert-module';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  constructor(private _userService:UserService,
    private _router:Router,
    private route: ActivatedRoute,
    private _alerts:AlertsService,
    private _auth:AuthService) {

   }
  users=new MatTableDataSource<UserModel>();
  displayedColumns: string[] = ['name', 'email','action'];
  // @ViewChild(UsersPermissionComponent) usersPermissionComponent: UsersPermissionComponent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(UsersPermissionComponent, { read: UsersPermissionComponent })
  // private usersPermissionComponent: ViewContainerRef;
  @ViewChild(UserPermissionComponent) userPermissionComponent:UserPermissionComponent;
  ngOnInit(): void {

    // console.log('configured routes: ', this._router.config);
    this._userService.getAll()
    .subscribe(
      res=> {
        this.users = new MatTableDataSource<UserModel>(res);
        this.users.paginator = this.paginator;
      },
      err=>{
        this._alerts.setMessage(err,'error');
        this._auth.logoutUser();
      }
    )
  }


}
