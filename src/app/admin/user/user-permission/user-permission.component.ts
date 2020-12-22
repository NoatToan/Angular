import { DataSource } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertsService } from 'angular-alert-module';
import { AuthService } from 'src/app/auth.service';
import { ScopePermissionService } from 'src/app/services/scope-permission.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.css']
})
export class UserPermissionComponent implements OnInit {

  userId: string;
  constructor(private _router:Router,
     private _route: ActivatedRoute,
      private _userService: UserService,
       private _scopePermissionService:ScopePermissionService,
        private _alerts:AlertsService,
        private _auth:AuthService) {

  }
  searchScope=null;
  searchScopeChild=null;

  userScope=[];
  userPermission=[];

  scopes= [];
  permissions=[];

  // Create Scope Permission System
  newScopeInput:string;

  ngOnInit(): void {
    //Get scope from API
    this._userService.getScopePermission().subscribe(
      res=>{
        this.scopes=res['listScope']
        this.permissions=res['listPermission']
    },
    error =>{
      this._alerts.setMessage(error.message,'error');
      this._auth.logoutUser();
    })

    this.userId = this._route.snapshot.paramMap.get('id');

    this._userService.getUserScopePermission(this.userId).subscribe(res=>{
      let arrUserScope=[];
      let arrUserPermission=[];
      Object.keys(res['scope']).some(k =>{arrUserScope.push(res['scope'][k]['scope_id']);})
      Object.keys(res['scope']).some(k =>{arrUserPermission.push(res['scope'][k]['scope_id']);})
      this.userScope=arrUserScope
      this.userPermission=arrUserPermission
    },
    error =>{
      this._alerts.setMessage(error.message,'error');
    })
  }

  checkScopeUser(scopeId){
        return this.userScope.includes(scopeId)
  }

  setScope(event,id){
    let scopeId=id
    if(this.userId){
      let res=this._userService.setUserScopePermission(this.userId,scopeId).subscribe(res=>{
        this._alerts.setMessage('Success','success');
      },
      error =>{
        this._alerts.setMessage(error.message,'error');
      });
    }
  }
  createScope(value){
    this._scopePermissionService.createScope(value).subscribe(
      res=>{
        this._alerts.setMessage('Create scope','success');
        this.ngOnInit();
      },
      err=>{
        this._alerts.setMessage(err.message,'error');
      }
    )
  }
  deleteScope(scopeId){
    this._scopePermissionService.deleteScope(scopeId).subscribe(
      res=>{
        this._alerts.setMessage('Deleted','success');
        this.ngOnInit();
      },
      err=>{
        this._alerts.setMessage(err.message,'error');
      }
    )
  }
  updatePermission(event,permissionId,scopeId){
    Object.keys(this.scopes).some(key=>{
      if(this.scopes[key]['id']==scopeId){
          let isExistPermission=false;
          //Del Permission
          this.scopes[key]['permission']=this.scopes[key]['permission'].filter( k =>{
            if(k.id == permissionId) {
              isExistPermission=true;
              this.deletePermission(scopeId, permissionId);
            };
            return k.id != permissionId;
          })
          //Add Permission
          if(!isExistPermission){
            if(this.scopes[key]['id']==scopeId){
              let clonePermission=Object;
              JSON.parse(JSON.stringify(
                Object.keys(this.permissions).some(
                  k =>{
                    if(this.permissions[k]['id']==permissionId){
                      clonePermission=this.permissions[k]
                    }
                  }
                )
              ))
              this.scopes[key]['permission'].push(clonePermission);
              this.createPermission(scopeId, permissionId);
            }
          }
        }
    });
  }
  createPermission(scopeId, permissionId){
    this._scopePermissionService.setScopePermission(scopeId,permissionId,0).subscribe(res=>{
      this._alerts.setMessage('Add Success','success');
    },
    err =>{
      this._alerts.setMessage(err.message,'error');
    });
  }
  deletePermission(scopeId, permissionId){
    this._scopePermissionService.setScopePermission(scopeId,permissionId,1).subscribe(res=>{
      this._alerts.setMessage('Remove Success','success');
    },
    err =>{
      this._alerts.setMessage(err.message,'error');
    });
  }
}



