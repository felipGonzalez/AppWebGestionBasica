import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogModel } from '../models/LogModel';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private _Url = "http://localhost:3001/log/"
  
  constructor(private http:HttpClient) { }

  getLogActions():Observable<Array<LogModel>> {
    return this.http.get<Array<LogModel>>(this._Url+"actionsHistory");
  }

  getLogHistory():Observable<Array<LogModel>> {
    return this.http.get<Array<LogModel>>(this._Url+"sessionHistory");
  }

  addLog(log:LogModel):void {
    this.http.post<any>(this._Url+"/add",log).subscribe(
      res => {
        console.log(`Log guardado con la id `+res.id);
      }, 
      err => {
        console.log(err);
      }
    );
    
  }
  
}
