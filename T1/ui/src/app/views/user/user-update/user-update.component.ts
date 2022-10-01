import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  
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

  // TODO
  save(){ }

  //TODO
  cancel(){ }

}
