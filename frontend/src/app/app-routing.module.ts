import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home-component/home-component.component';
import { LoginComponent } from './components/login-component/login-component.component';
import { IsLoggedGuard } from './guards/is-logged.guard';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [IsLoggedGuard]
  },
  {
    path: '**',
    redirectTo: "/login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
