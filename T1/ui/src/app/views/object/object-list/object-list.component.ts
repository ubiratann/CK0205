import { Component, OnInit } from '@angular/core';
import { Object } from '@app/models/object';
import { User } from '@app/models/user';

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.css']
})
export class ObjectListComponent implements OnInit {

  object = new Object();
  resultList: Object[] = [];

  loggedUser = new User();
  isLoggedIn: boolean = false;
  
  displayedColumns : string[] = [];

  constructor() { }
  
  ngOnInit(): void {
    let test = JSON.parse(localStorage.getItem("user") ?? "") 
    
    this.displayedColumns = ["id", "name", "location", "open"]

    if (test) {
      this.loggedUser = test;
      this.displayedColumns.push("validated")
      this.displayedColumns.push("update")
      this.isLoggedIn = true
    }  
  }

  // TODO 
  search(){}

  // TODO
  validate(flag: boolean, id: number){}

  // TODO
  update(id:number, owner_id: number){}

}
