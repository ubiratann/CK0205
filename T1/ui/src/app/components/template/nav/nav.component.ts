import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateService } from '@app/components/template.service';
import { LoaderService } from '@app/utils/loader/loader.service';
import { UserService } from '@app/views/user/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, DoCheck {

  showSubSubMenu: boolean = false;
  isLoggedIn: boolean = false;
  menuList: any = [];  

  role: any;

  constructor( 
    public loaderService: LoaderService,
    private templateService: TemplateService,
    public userService: UserService,
    private router: Router,
  ) {
   }

  ngDoCheck(){
    if(this.menuList == null)
      this.menuList = []
  }

  ngOnInit(): void {

    this.role = Number.parseInt(localStorage.getItem("role" ) || "1");
    this.load();

    this.templateService.updateMenu
      .subscribe((data) =>{
        this.role = Number.parseInt(localStorage.getItem("role" ) || "1");
        this.load();
      })
  
    }

  load(){
    this.menuList = this.templateService.getMenu(this.role)
      .subscribe((data: any) => {
        console.log(data.data)
        this.menuList = data.data ;
      })
  }

}
  