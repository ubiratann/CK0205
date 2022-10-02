import { Component, OnInit } from '@angular/core';
import { Object } from '@app/models/object';
import { User } from '@app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { ObjectValidateComponent } from '../object-validate/object-validate.component';

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.css']
})
export class ObjectListComponent implements OnInit {

  object = new Object();
  resultList: Object[] =  [
    {
      name: 'teste',
      location: 'teste',
      id: 1,
      file: 'teste',
      owner_id: 1,
    },
    {
      name: 'Lorem ipsum dolor sit amet consectetur adipisicing elite?',
      location: 'Lorem ipsum dolor sit amet ',
      id: 2,
      file: 'teste',
      validated: true,
      owner_id: 2
    }
  ];

  loggedUser = new User();
  isLoggedIn: boolean = false;
  
  displayedColumns : string[] = [];

  constructor(public dialog: MatDialog) { }
  
  ngOnInit(): void {
    let test = JSON.parse(localStorage.getItem("user") ?? "") 
    
    this.displayedColumns = ["id", "name", "location", "open"]

    if (test) {
      this.loggedUser = test;
      this.displayedColumns.push("validate")
      this.displayedColumns.push("update")
      this.isLoggedIn = true
    }  
  }

  // TODO 
  search(){}

  validate(flag: boolean, id: number){    
    const dialogRef = this.dialog.open(ObjectValidateComponent, {
      minWidth: "400px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // TODO
  update(id:number, owner_id: number){}

}
