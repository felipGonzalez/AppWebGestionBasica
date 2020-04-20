import { Component, OnInit } from '@angular/core';
import { RolModel } from 'src/app/models/RolModel';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { RoleService } from 'src/app/services/role.service';
import { RoleCrudComponent } from '../role-crud/role-crud.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  listRoles: Array<RolModel>
  flagList:boolean

  constructor(
    private _userService:UserService, 
    private dialog: MatDialog,
    private _rolService: RoleService
    ) 
    {
    this.listRoles = new Array()
    }

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles():void {
    this._rolService.loadRoles()
    .subscribe(
      res => {
        this.listRoles = res
        this.flagList = true;
     }, err => {
        console.log(err);
      })
  }

  createNewRole():void {
    this.viewRole(new RolModel())
  }

  checkRol():boolean {
    return JSON.parse(localStorage.getItem('user')).rol.name === 'Admin' ? true:false
  } 

  viewRole(rol:RolModel):void {
    const dialogRef = this.dialog.open(RoleCrudComponent, {
      width: "600px",
      maxWidth : "800px",
      autoFocus : false,
      data : rol
    });
     dialogRef.afterClosed().subscribe(result => {
      if( result ) {
        this.flagList = false
        this.loadRoles();
      }
    });
  }

}
