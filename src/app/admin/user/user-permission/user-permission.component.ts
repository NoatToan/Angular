import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { AlertService } from 'src/app/common/_alert';
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
        private _auth:AuthService,
        private _alerts:AlertService,
        ) {

  }
  searchScope=null;
  searchScopeChild=null;

  userScope=[];
  userPermission=[];

  scopes= [];
  permissions=[];

  // Create Scope Permission System
  newScopeInput:string;
  selectedPermission:string=null;
  selectedPermissionControl = new FormControl(this.selectedPermission);

  // Alert Option
  options = {
    autoClose: true,
    keepAfterRouteChange: true
  };

  ngOnInit(): void {


    //Get scope from API
    this._userService.getScopePermission().subscribe(
      res=>{
        this.scopes=res['listScope']
        this.permissions=res['listPermission']
        this.selectedPermissionControl.setValue(res['listPermission'].map(k=>k.id))
    },
    error =>{
      this._alerts.error(error.message,this.options)
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
      this._alerts.error(error.message,this.options)
    })
    console.log(this.selectedPermissionControl)

  }

  checkScopeUser(scopeId){
        return this.userScope.includes(scopeId)
  }

  setScope(event,id){
    let scopeId=id
    if(this.userId){
      let res=this._userService.setUserScopePermission(this.userId,scopeId).subscribe(res=>{
          this._alerts.success('Success',this.options)
      },
      error =>{
        this._alerts.error(error.message,this.options);
      });
    }
  }
  createScope(value){
    this._scopePermissionService.createScope(value).subscribe(
      res=>{
          this._alerts.success('Create scope success',this.options)
        this.ngOnInit();
      },
      error=>{
        this._alerts.error(error.message,this.options);
      }
    )
  }
  deleteScope(scopeId){
    this._scopePermissionService.deleteScope(scopeId).subscribe(
      res=>{
        this._alerts.success('Deleted',this.options);
        this.ngOnInit();
      },
      err=>{
        this._alerts.error(err.message,this.options);
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
      this._alerts.success('Add Success',this.options)
    },
    error =>{
      this._alerts.error(error.message,this.options)
    });
  }
  deletePermission(scopeId, permissionId){
    this._scopePermissionService.setScopePermission(scopeId,permissionId,1).subscribe(res=>{
      this._alerts.success('Remove Success',this.options)
    },
    error =>{
      this._alerts.error(error.message,this.options)
    });
  }
}



