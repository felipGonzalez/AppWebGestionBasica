import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import  {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http' 
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { GestionComponent } from './components/gestion/gestion.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { RoleComponent } from './components/role/role.component';
import { UserCrudComponent } from './components/user-crud/user-crud.component';
import { RoleCrudComponent } from './components/role-crud/role-crud.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { TokenInterceptorService } from './interceptor/token-interceptor.service';
import { LogService } from './services/log.service';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';

@NgModule({
  declarations: [
    AppComponent,
    GestionComponent,
    ResumenComponent,
    LoginComponent,
    UserComponent,
    RoleComponent,
    UserCrudComponent,
    RoleCrudComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule ,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [UserService,LogService, RoleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, UserCrudComponent, RoleCrudComponent]
})
export class AppModule { }
