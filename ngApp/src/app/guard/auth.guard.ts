import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../components/login/login.component';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private _authService: AuthService,
    private _router: Router, public dialog: MatDialog) { }

    canActivate(): boolean {
      if (this._authService.loggedIn()) {
        return true;
      } else {
        const dialogRef = this.dialog.open(LoginComponent, {
          width: "600px",
          maxWidth : "800px",
          autoFocus : false,
        });
        this._router.navigate(['/Home/Resumen'])
        return false;
      }
    }
    

}
