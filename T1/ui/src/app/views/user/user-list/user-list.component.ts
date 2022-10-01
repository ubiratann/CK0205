import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  user = new User();
  resultList: User[] = [];
  
  displayedColumns : string[] = ["id", "full_name", "username", "update", "delete"] ;

  constructor() { }
  
  ngOnInit(): void {
  }

  // TODO 
  search(){}

  // TODO
  delete(id: number){}

  // TODO
  update(id:number){}

}
