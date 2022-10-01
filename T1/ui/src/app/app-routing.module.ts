import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './components/logout/logout.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/user/login/login.component';
import { ObjectListComponent } from './views/object/object-list/object-list.component';
import { ObjectUpdateComponent } from './views/object/object-update/object-update.component';
import { EditComponent as UserEditComponent} from './views/user/edit/edit.component';
import { SigninComponent } from './views/user/signin/signin.component';

const routes: Routes = [
  {
    path: "",
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
    path: "editar-perfil",
    component: UserEditComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signin",
    component: SigninComponent
  },
  {
    path: "logout",
    component: LogoutComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
