import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './components/template/logout/logout.component';
import { HomeComponent } from './views/home/home.component';
import { UserLoginComponent } from './views/user/user-login/user-login.component';
import { ObjectListComponent } from './views/object/object-list/object-list.component';
import { ObjectUpdateComponent } from './views/object/object-update/object-update.component';
import { UserUpdateComponent} from './views/user/user-update/user-update.component';
import { UserSigninComponent} from './views/user/user-signin/user-signin.component';
import { UserListComponent } from './views/user/user-list/user-list.component';

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
    component: UserUpdateComponent
  },
  {
    path: "login",
    component: UserLoginComponent
  },
  {
    path: "signin",
    component: UserSigninComponent
  },
  {
    path: "logout",
    component: LogoutComponent
  },
  {
    path: "gerenciar-usuarios",
    component: UserListComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
