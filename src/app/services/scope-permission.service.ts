import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ScopePermissionService {
  private options = {
    responseType: 'text' as const,
  };
  private _setScopePermissionUrl="http://lrv.api/api/scope/setScopePermission";
  private _createScopeUrl="http://lrv.api/api/scope";
  private _deleteScopeUrl="http://lrv.api/api/scope";

  constructor(private http:HttpClient) { }

  setScopePermission(scopeId,permissionId,isDelete){
    return this.http.put<any>(this._setScopePermissionUrl,{'scopeId':scopeId,'permissionId':permissionId,'isDelete':isDelete});
  }
  createScope(scopeName){
    return this.http.post<any>(this._createScopeUrl,{'scopeName':scopeName})
  }
  deleteScope(scopeId){
    return this.http.delete<any>(this._deleteScopeUrl+"/"+scopeId)
  }
}
