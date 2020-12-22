import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ScopePermissionService {

  private _setScopePermissionUrl="http://lrv.api/api/scope/setScopePermission";
  private _createScopeUrl="http://lrv.api/api/scope/createScope";
  private _deleteScopeUrl="http://lrv.api/api/scope/deleteScope";

  constructor(private http:HttpClient) { }

  setScopePermission(scopeId,permissionId,isDelete){
    return this.http.get<any>(this._setScopePermissionUrl+"/"+scopeId+"/" +permissionId+"/" +isDelete);
  }
  createScope(scopeName){
    return this.http.get<any>(this._createScopeUrl+"/"+scopeName)
  }
  deleteScope(scopeId){
    return this.http.get<any>(this._deleteScopeUrl+"/"+scopeId)
  }
}
