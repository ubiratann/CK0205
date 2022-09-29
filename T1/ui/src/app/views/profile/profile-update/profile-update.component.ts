import { Component, Input, OnInit } from '@angular/core';
import { User } from '@app/models/user';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  user: User = {
    full_name: '',
    username: '',
    password: '',
    email: ''
  };

  hide: boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user") ?? "");
  }

  save(){
    console.log('salvou')
  }

  cancel(){

  }

}
