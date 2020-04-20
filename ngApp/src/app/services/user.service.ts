import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserModel } from '../models/UserModel';
import { RolModel } from '../models/RolModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _loginrUrl = "http://localhost:3001/user/"
  
  constructor(private http:HttpClient) { }
  
  loginDataUser():Observable<any> {
    return this.http.get<any>(this._loginrUrl+"user")
  }

  loginUsers(levelUser):Observable<Array<UserModel>> {
    return this.http.post<Array<UserModel>>(this._loginrUrl+"data",{ level : levelUser})
  }

  updateUser(user):Observable<any> {
    return this.http.put<any>(this._loginrUrl+"edit",user)
  }

  getRoleCount(nameRole):Observable<any> {
    return this.http.post<any>(this._loginrUrl+"count", { name : nameRole})
  }

  saveUser(user):Observable<any> {
    return this.http.post<any>(this._loginrUrl+"add",user)
  }

  deleteUser(id):Observable<any> {
    return this.http.post<any>(this._loginrUrl+"delete",{_id : id})
  }

  verifyData(user:UserModel, flag:boolean):boolean {
    if(user.username === "" && flag) return false
    if(user.password === "") return false
    if(!user.rol) return false
    return true
  }
  

}
