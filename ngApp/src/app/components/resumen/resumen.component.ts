import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/log.service';
import { LogModel } from 'src/app/models/LogModel';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  logsHistoryList : Array<LogModel>;
  logsActionsList : Array<LogModel>;
  flagActions: boolean;
  flagHistory: boolean;

  constructor(private _logService: LogService) {
    this.logsHistoryList = new Array();
    this.logsActionsList = new Array();
    this.flagActions = false;
    this.flagHistory = false;
   }

  ngOnInit(): void {
    this.loadLogActions();
    this.loadLogHistory();
  }

  public loadLogHistory():void {
    this._logService.getLogHistory().subscribe(
      res => {
        this.logsHistoryList = res;
        this.flagHistory = true;
        //console.log(this.logsHistoryList);
      },
      err => {
        console.log(err);
      });
  }

  public loadLogActions():void {
    this._logService.getLogActions().subscribe(
      res => {
        this.logsActionsList = res;
        this.flagHistory = true;
        //console.log(this.logsActionsList);
        
      },
      err => {
        console.log(err);
      });
  }

}
