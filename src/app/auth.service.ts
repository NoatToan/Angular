import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import{Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private _registerUrl="http://localhost:3000/api/register";
  private _registerUrl="http://lrv.api/api/userSignup";
  // private _loginUrl="http://localhost:3000/api/login";
  private _loginUrl="http://lrv.api/api/login";
  // private _userUrl="http://localhost:3000/api/users";
  constructor(private http:HttpClient, private _router:Router ) { }
  registerUser(user)
  {
    return this.http.post<any>(this._registerUrl,user)
  }
  loginUser(user){
    // console.log(this.http.post<any>(this._loginUrl,user)
    return this.http.post<any>(this._loginUrl,user)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }
  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }
  getToken(){
    return localStorage.getItem('token')
  }
}
