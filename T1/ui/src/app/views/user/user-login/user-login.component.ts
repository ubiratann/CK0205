import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/models/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  user = new User();
  hide: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //TODO
  login(){
    
  }

  //TODO
  signin(){
    this.router.navigate(['/signin'])
  }

}