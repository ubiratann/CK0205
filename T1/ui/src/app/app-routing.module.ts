import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { ObjectListComponent } from './views/object/object-list/object-list.component';
import { ObjectUpdateComponent } from './views/object/object-update/object-update.component';
import { ProfileUpdateComponent } from './views/profile/profile-update/profile-update.component';
import { SigninComponent } from './views/signin/signin.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "pesquisar-patrimonios",
    component: ObjectListComponent
  },
  {
    path: "cadastrar-patrimonio",
    component: ObjectUpdateComponent
  },
  {
    path: "perfil",
    component: ProfileUpdateComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signin",
    component: SigninComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
