import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Express server
  // private _usersUrl="http://localhost:3000/api/users";
  private _usersUrl="http://lrv.api/api/user";
  private _getUserScopePermission="http://lrv.api/api/user/getScopeByUserId/";
  private _getScopePermission="http://lrv.api/api/scope/getScopePermission";
  private _setUserScope="http://lrv.api/api/user/userScope";
  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<any>(this._usersUrl)
  }
  getUserScopePermission(id){
    return this.http.get<any>(this._getUserScopePermission + id)
  }
  getScopePermission(){
    return this.http.get<any>(this._getScopePermission)
  }
  setUserScopePermission(userId,scopeId){
    return this.http.post<any>(this._setUserScope,{'userId':userId,'scopeId':scopeId});
  }
}
