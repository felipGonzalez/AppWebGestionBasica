import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { LogService } from 'src/app/services/log.service';
import { LogModel } from 'src/app/models/LogModel';
import { INIT_SESSION} from 'src/app/models/Const';
import { UserModel } from 'src/app/models/UserModel';
import { RolModel } from 'src/app/models/RolModel';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {username:"a@123.com",password:"a"}
  errorMessage : String
  flagError: Boolean
  
  constructor(private _userService: UserService, private _authService: AuthService,
    private _router: Router, public dialogRef: MatDialogRef<LoginComponent>,private  _logService: LogService) { }

  ngOnInit(): void {
  }

  loginUser():void{
    this.getToken()
    
  }

  getToken():void {
    if (this._authService.verifyData(this.loginUserData)) {
      
      this._authService.loginUser(this.loginUserData)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token',res.token)
          this.getDataUser()
        },
        err => {
          console.log(err.error)
          this.errorMessage = err.error
          this.flagError = true
        }
      )
      } else {
        this.errorMessage = "Por favor ingresa tu correo y la contraseña"
        this.flagError = true
      }
  }

  getDataUser():void {
      this._userService.loginDataUser()
      .subscribe(
        res => {
          localStorage.setItem('user',JSON.stringify(this.initUser(res)))
          this._router.navigate(['/Home/Gestion'])          
          this._logService.addLog(new LogModel(new Date, JSON.parse(localStorage.getItem('user')).username,INIT_SESSION))
          this.closeDialog()
        },
        err => {
          console.log(err.error)
          this.errorMessage = err.error
          this.flagError = true
        }
      )
 
  }

  initUser(res):UserModel {
    let rolModel = new RolModel
    rolModel.name = res.rol.name
    rolModel.level = res.rol.level
    let user = new UserModel(res.username,res.password, rolModel, res.status)
    return user
  }

  closeDialog():void {
    this.dialogRef.close()
  }

}
