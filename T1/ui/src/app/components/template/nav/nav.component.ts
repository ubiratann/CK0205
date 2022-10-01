import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '@app/utils/loader/loader.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  showSubSubMenu: boolean = false;
  isLoggedIn: boolean = false;

  menuList = [
    {
      "text": "Perfil",
      "icon": "person",
      "public": false,
      "admin_only": false,
      "children": [{
          "text": "Editar",
          "icon": "manage_accounts",
          "routerLink": "/editar-perfil",
        },
        {
          "text": "Logout",
          "icon": "logout",
          "routerLink": "/logout",
        }
      ]
    },
    {
      "text": "Patrimônios",
      "icon": "category",
      "public": true,
      "admin_only": false,
      "children": [{
        "text": "Pesquisar",
        "icon": "search",
        "routerLink": "/pesquisar-patrimonios",
        },
        {
        "text": "Cadastrar",
        "icon": "add",
        "routerLink": "/cadastrar-patrimonio",
      }]
    }]

  constructor( 
    public loaderService: LoaderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let test = JSON.parse(localStorage.getItem("user") ?? "") 

    if (test) {
      this.isLoggedIn = true
    }
  }

}
   