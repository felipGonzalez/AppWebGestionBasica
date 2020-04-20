import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LogService } from './log.service';
import { LogModel } from '../models/LogModel';
import { CLOSE_SESSION } from '../models/Const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loginrUrl = "http://localhost:3001/user/"

  constructor(private http:HttpClient, private _router: Router,private _logService:LogService) { }

  loginUser(user):Observable<any> {
    return this.http.post<any>(this._loginrUrl+"login",user)
  }

  verifyData(user):Boolean {
    console.log(!user.nameUser);
    if (user.nameUser === "") return false
    if (user.password === "") return false
    return true 
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    //this._logService.addLog(new LogModel(new Date(),JSON.parse(localStorage.getItem('user')).username,CLOSE_SESSION))
    localStorage.removeItem('user');
    this._router.navigate(['/Home/Resumen']);
  }

}
