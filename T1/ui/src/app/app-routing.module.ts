import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ObjectListComponent } from './views/object/object-list/object-list.component';
import { ProfileUpdateComponent } from './views/profile/profile-update/profile-update.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "patrimonios",
    component: ObjectListComponent
  },
  {
    path: "perfil",
    component: ProfileUpdateComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
