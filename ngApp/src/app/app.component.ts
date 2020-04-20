import { Component } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip'
import { LoginComponent } from './components/login/login.component';
import {MatDialog} from '@angular/material/dialog';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ngApp';
  positionOptions : TooltipPosition = 'above';

  constructor(public dialog: MatDialog, public _authService:AuthService) {}

  public openModal():void {
    this.dialog.open(LoginComponent, {
      width: "600px",
      maxWidth : "800px",
      autoFocus : false,
    });
  }
}
