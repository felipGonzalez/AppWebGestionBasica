import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from 'src/app/models/UserModel';
import { UserService } from 'src/app/services/user.service';
import { RoleService } from 'src/app/services/role.service';
import { RolModel } from 'src/app/models/RolModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LogService } from 'src/app/services/log.service';
import { CREATE_USER, UPDATE_USER, DELETE_USER } from 'src/app/models/Const';
import { LogModel } from 'src/app/models/LogModel';



@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCrudComponent implements OnInit {

  flagNewUser:boolean
  listRoles:Array<RolModel>
  flagError:boolean
  errorMessage:String

  constructor(
    public dialogRef: MatDialogRef<UserCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public user: UserModel, 
    private _userService: UserService,
    private _roleService: RoleService,
    private _snackBar: MatSnackBar,
    private _logService: LogService) {
      
     }

  ngOnInit(): void {
    if(this.user.username === "" && this.user.password === "" && !this.user.rol && !this.user.status) {
      this.flagNewUser = true
    }
    this.loadRoles()
  }


  loadRoles():void {
    this._roleService.loginRoles(JSON.parse(localStorage.getItem('user')).rol.level).subscribe(
      res =>  {
        console.log(res);
        this.listRoles = res;
      },
      err => {
        this.flagError = true;
        console.log(err);
        this.errorMessage = err.error
        
      }
    );
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
  

  saveUser():void {
    if( this._userService.verifyData(this.user, this.flagNewUser)) {
      if( this.flagNewUser ) {
        this.addUser()
      }else {
        console.log("Actualizar o eliminar");
        this.updateUser()
      }
    }else {
      this.errorMessage = "Por favor complete todos los campos"
      this.flagError = true;
    }
  }

  addUser():void {
    this._userService.saveUser(this.user).subscribe(
      res => {
        console.log(res);
        this._logService.addLog(new LogModel(new Date, JSON.parse(localStorage.getItem('user')).username,CREATE_USER))
        this.openSnackBar("Usuario Creado")
        this.closeDialog(true)
      }, 
      err => {
        console.log(err);
        
        this.errorMessage = err.error
        this.flagError = true;
      })
  }

  updateUser():void {
    this._userService.updateUser(this.user).subscribe(
      res => {
        console.log(res);
        this._logService.addLog(new LogModel(new Date, JSON.parse(localStorage.getItem('user')).username,UPDATE_USER))
        this.openSnackBar("Usuario Modificado")
        this.closeDialog(true)
      }, 
      err => {
      console.log(err);
      this.errorMessage = err.error
      this.flagError = true;
      }
    )
  }

  deleteUser():void {
    this._userService.deleteUser(this.user._id).subscribe(
      res => {
        console.log(res);
        this._logService.addLog(new LogModel(new Date, JSON.parse(localStorage.getItem('user')).username,DELETE_USER))
        this.openSnackBar("Usuario Eliminado")
        this.closeDialog(true)  
      },
      err => {
        console.log(err);
        this.errorMessage = err.error
        this.flagError = true;
      })
  }



}
