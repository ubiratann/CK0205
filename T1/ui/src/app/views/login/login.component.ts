import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  hide: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //TODO
  search(){}

  //TODO
  signin(){
    this.router.navigate(['/signin'])
  }

}
