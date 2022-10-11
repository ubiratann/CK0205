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
  menuList: any = [];  

  role: any;

  constructor( 
    public loaderService: LoaderService,
    private templateService: TemplateService,
    private userService: UserService,
    private router: Router,
  ) {
    this.loaderService.isLoading.next(true)
   }


  ngOnInit(): void {

    this.role = Number.parseInt(localStorage.getItem("user_role" ) || "1");

    this.loadMenu();

    this.templateService.updateMenu.subscribe(data => {
      this.loadMenu();
    });
  }
  
  loadMenu(){
    if(this.userService.token != ''){
      this.menuList = this.templateService.getMenu(this.role)
        .subscribe((data: any) => {
          console.log(data)
          this.menuList = data.data ;
        })
    }
  }
}
   