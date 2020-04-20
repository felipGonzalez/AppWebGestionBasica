import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/UserModel';
import { UserCrudComponent } from '../user-crud/user-crud.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  listUsers:Array<UserModel>
  flagList:boolean

  constructor(private _userService:UserService, public dialog: MatDialog) { 
    this.listUsers = new Array()
  }

  ngOnInit(): void {
    this.loadUsers()
  }

  createNewUser():void {
    this.viewUser(new UserModel("","",undefined,false))
  }

  loadUsers():void {
    this._userService.loginUsers(JSON.parse(localStorage.getItem('user')).rol.level)
    .subscribe(
      res => {
        this.listUsers = res
        this.flagList = true;
     }, err => {
        console.log(err);
      })
  }

  checkRol():boolean {
    return JSON.parse(localStorage.getItem('user')).rol.name === 'Admin' ? true:false
  } 

  checkStatus(status) {
    return status ? 'Activo':'Inactivo'
  }

  viewUser(user:UserModel) {
    const dialogRef = this.dialog.open(UserCrudComponent, {
      width: "600px",
      maxWidth : "800px",
      autoFocus : false,
      data : user
    });
     dialogRef.afterClosed().subscribe(result => {
      if( result ) {
        this.flagList = false
        this.loadUsers();
      }
    });
  }
}
