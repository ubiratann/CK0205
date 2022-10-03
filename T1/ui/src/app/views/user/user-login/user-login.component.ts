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
          this.userService.token = data.jwtToken;
          this.templateService.updateMenu.next();
          this.router.navigate(['/home']);
        }
      });
  }

  //TODO
  signin(){
    this.router.navigate(['/signin'])
  }

}