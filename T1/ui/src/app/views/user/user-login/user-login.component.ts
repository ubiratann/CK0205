import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemplateService } from '@app/components/template.service';
import { User } from '@app/models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  user = new User();
  hide: boolean = true;

  constructor(
    private userService: UserService,
    private templateService: TemplateService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.userService.authenticate(this.user)
      .subscribe(data => {
        if(data){
          // this.templateService.updateMenu.next();
          localStorage.setItem("user", JSON.stringify(data["data"]))
          localStorage.setItem("role", JSON.stringify(data.data.role))
          this.templateService.updateMenu.next();
          
          this.router.navigate(['/']);
        }
      });
  }

  //TODO
  signin(){
    this.router.navigate(['/signin'])
  }

}