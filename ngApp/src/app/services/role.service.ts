import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RolModel } from '../models/RolModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private _loginrUrl = "http://localhost:3001/role/"

  constructor( private http:HttpClient ) { }

    
  loginRoles(levelUser):Observable<Array<RolModel>> {
    return this.http.post<Array<RolModel>>(this._loginrUrl+"dataLevel", { level : levelUser})
  }

  loadRoles():Observable<Array<RolModel>> {
    return this.http.get<Array<RolModel>>(this._loginrUrl+"data")
  }

  saveRol(rol:RolModel):Observable<any> {
    return this.http.post<any>(this._loginrUrl+"add", rol)
  }

  updateRol(rol:RolModel):Observable<any> {
    return this.http.put<any>(this._loginrUrl+"edit", rol)
  }

  deleteRol(id):Observable<any> {
    return this.http.post<any>(this._loginrUrl+"delete",{_id : id})
  }

  verifyData(rol:RolModel):boolean {
    if(rol.name === "") return false
    if(rol.level <= 0) return false
    return true
  }
  
}
