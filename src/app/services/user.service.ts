import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Express server
  // private _usersUrl="http://localhost:3000/api/users"; 
  private _usersUrl="http://lrv.api/api/getAllUser";
  private _getScopePermission="http://lrv.api/api/user/getScopeByUserId/";
  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<any>(this._usersUrl)
  }
  getScopePermission(id){
    return this.http.get<any>(this._getScopePermission + id)
  }
}
