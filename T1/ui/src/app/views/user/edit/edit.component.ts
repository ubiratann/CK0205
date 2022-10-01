import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {


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
