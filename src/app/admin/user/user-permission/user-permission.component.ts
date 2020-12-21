import { DataSource } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ScopePermissionService } from 'src/app/services/scope-permission.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.css']
})
export class UserPermissionComponent implements OnInit {

  userId: string;
  constructor(private _route: ActivatedRoute, private _userService: UserService, private _scopePermissionService:ScopePermissionService) {

  }
  searchScope=null;
  searchScopeChild=null;

  userScope=[];
  userPermission=[];

  scopes= [];
  permissions=[];

  // Create Scope Permission System
  newScopeName:string;


  ngOnInit(): void {
    //Get scope from API
    this._userService.getScopePermission().subscribe(
      res=>{
        this.scopes=res['listScope']
        this.permissions=res['listPermission']
    })

    this.userId = this._route.snapshot.paramMap.get('id');

    this._userService.getUserScopePermission(this.userId).subscribe(res=>{
      let arrUserScope=[];
      let arrUserPermission=[];
      Object.keys(res['scope']).some(k =>{arrUserScope.push(res['scope'][k]['scope_id']);})
      Object.keys(res['scope']).some(k =>{arrUserPermission.push(res['scope'][k]['scope_id']);})
      this.userScope=arrUserScope
      this.userPermission=arrUserPermission
    })
  }

  checkScopeUser(scopeId){
        return this.userScope.includes(scopeId)
  }

  setScope(event,id){
    let scopeId=id
    if(this.userId){
      let res=this._userService.setUserScopePermission(this.userId,scopeId).subscribe(res=>{
        console.log(res)
      });
    }
  }
  createScope(event,newScopeName){
    this.newScopeName=newScopeName
    console.log(this.newScopeName)
  }
  updatePermission(event,permissionId,scopeId){
    let create=this._scopePermissionService.setScopePermission(scopeId,permissionId,0).subscribe(res=>{});
    let del=this._scopePermissionService.setScopePermission(scopeId,permissionId,1).subscribe(res=>{});

    Object.keys(this.scopes).some(key=>{
      if(this.scopes[key]['id']==scopeId){
          let isExistPermission=false;
          //Del Permission
          this.scopes[key]['permission']=this.scopes[key]['permission'].filter( k =>{
            if(k.id == permissionId) {isExistPermission=true;del;};
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
              create;
            }
          }
        }
    });
  }
}



