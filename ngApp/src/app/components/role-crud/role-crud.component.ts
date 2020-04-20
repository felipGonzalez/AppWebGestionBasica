import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolModel } from 'src/app/models/RolModel';
import { RoleService } from 'src/app/services/role.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LogService } from 'src/app/services/log.service';
import { LogModel } from 'src/app/models/LogModel';
import { CREATE_ROLE, UPDATE_ROLE, DELETE_ROLE } from 'src/app/models/Const';

@Component({
  selector: 'app-role-crud',
  templateUrl: './role-crud.component.html',
  styleUrls: ['./role-crud.component.css']
})
export class RoleCrudComponent implements OnInit {

  flagNewRol:boolean
  flagError:boolean
  errorMessage:String

  constructor(
    public dialogRef: MatDialogRef<RoleCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public rol: RolModel, 
    private _rolService: RoleService,
    private _snackBar: MatSnackBar,
    private _logService: LogService
    ) { }

  ngOnInit(): void {
    if (!this.rol.name && !this.rol.level) {
      console.log(this.rol);
      this.flagNewRol = true
      this.rol.name=""
      this.rol.level=0
    }
  }

  checkRol():boolean {
    return JSON.parse(localStorage.getItem('user')).rol.name === 'Admin' ? true:false
  } 
  
  closeDialog(flag:boolean):void {
    this.dialogRef.close(flag)
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar", {
      duration: 3000,
    });
  }

  saveRol():void {
    if( this._rolService.verifyData(this.rol)) {
      if( this.flagNewRol ) {
        this.addRole()
      }else {
        this.updateRol()
      }
    }else {
      this.errorMessage = "Por verifique el rol  y el nivel que se mayor a 0"
      this.flagError = true;
    }
  }

  addRole(): void {
    this._rolService.saveRol(this.rol).subscribe(
      res => {
        console.log(res);
        this._logService.addLog(new LogModel(new Date, JSON.parse(localStorage.getItem('user')).username,CREATE_ROLE))
        this.openSnackBar("Rol Creado")
        this.closeDialog(true)
      }, 
      err => {
        console.log(err);
        this.errorMessage = err.error
        this.flagError = true;
      })
  }

  updateRol():void {
    this._rolService.updateRol(this.rol).subscribe(
      res => {
        console.log(res);
        this._logService.addLog(new LogModel(new Date, JSON.parse(localStorage.getItem('user')).username,UPDATE_ROLE))
        this.openSnackBar("Rol Modificado")
        this.closeDialog(true)
      }, 
      err => {
      console.log(err);
      this.errorMessage = err.error
      this.flagError = true;
      }
    )
  }

  deleteRol():void {
    this._rolService.deleteRol(this.rol._id).subscribe(
      res => {
        console.log(res);
        this._logService.addLog(new LogModel(new Date, JSON.parse(localStorage.getItem('user')).username,DELETE_ROLE))
        this.openSnackBar("Rol Eliminado")
        this.closeDialog(true)  
      },
      err => {
        console.log(err);
        this.errorMessage = err.error
        this.flagError = true;
      })
  }

}
