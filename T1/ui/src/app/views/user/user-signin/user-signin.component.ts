import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/models/user';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css']
})
export class UserSigninComponent implements OnInit {

  user = new User();
  hide: boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //TODO
  signin(){
    this.router.navigate(['/signin'])
  }

}