import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateService } from '@app/components/template.service';
import { LoaderService } from '@app/utils/loader/loader.service';
import { UserService } from '@app/views/user/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  showSubSubMenu: boolean = false;
  isLoggedIn: boolean = false;
  menuList: any = [
    {
      "text": "Home",
      "icon": "home",
      "public": false,
      "admin_only": false,
      "routerLink": "/",
    },
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
    },
    {
      "text": "Admin",
      "icon": "admin_panel_settings",
      "public": true,
      "admin_only": false,
      "children": [{
        "text": "Usuários",
        "icon": "group",
        "routerLink": "/gerenciar-usuarios",
        }]
    }
  ];  


  constructor( 
    public loaderService: LoaderService,
    private templateService: TemplateService,
    private userService: UserService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    // this.loadMenu();

    // this.templateService.updateMenu.subscribe(data => {
    //   this.loadMenu();
    // });
  }
  
  loadMenu(){
    if(this.userService.token != ''){
      this.menuList = this.templateService.getMenu(this.userService.role)
        .subscribe(data => {
          this.menuList = data;
        })
    }
  }
}
   