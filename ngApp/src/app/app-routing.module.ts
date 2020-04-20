import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResumenComponent } from './components/resumen/resumen.component';
import { GestionComponent } from './components/gestion/gestion.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { UserComponent } from './components/user/user.component';
import { RoleComponent } from './components/role/role.component';


const routes: Routes = [

  {
    path: '',
    redirectTo:'/Home/Resumen',
    pathMatch: 'full'
  },
  {
    path: 'Home/Resumen',
    component : ResumenComponent
  },
  {
    path: 'Home/Gestion',
    component : GestionComponent,
    canActivate: [AuthGuard],
    
  },
  {
    path: 'login',
    component : LoginComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
