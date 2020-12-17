import { DataSource } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.css']
})
export class UserPermissionComponent implements OnInit {

  userId: string;
  constructor(private _route: ActivatedRoute, private _userService: UserService) {

  }

  userScope=null;
  searchScope=null;
  searchScopeChild=null;


  scopes= [      
    {
      id:'ScopeRuleUser',
      description:['user.read','user.edit','user.delete','post.read']
    },
    {
      id:'ScopeRuleAdmin',
      description:['C route','D route']
    }
  ];
  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get('id');
    this._userService.getScopePermission(id).subscribe(res=>{
      let arrScopeName=[];
      Object.keys(res).some(key =>{arrScopeName.push(res[key]['name'])})
      this.userScope=arrScopeName
    })
  }
  
  checkedBox(scopeName){ //scopes->id is name on DB
    return this.userScope.includes(scopeName) 
  }
  onAuth(event,id){
    console.log(id)
  }

}



