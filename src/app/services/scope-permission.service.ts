import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ScopePermissionService {

  private _setScopePermissionUrl="http://lrv.api/api/scope/setScopePermission";

  constructor(private http:HttpClient) { }

  setScopePermission(scopeId,permissionId,isDelete){
    return this.http.get<any>(this._setScopePermissionUrl+"/"+scopeId+"/" +permissionId+"/" +isDelete);
  }
}
