import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = new User();
  hide = true;

  constructor() { }

  ngOnInit(): void {
  }

  // TODO
  signin(){}

}
