import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-objects',
  templateUrl: './user-objects.component.html',
  styleUrls: ['./user-objects.component.css']
})
export class UserObjectsComponent implements OnInit {
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

  displayedColumns = ["id", "name", "location", "validated", "open"]

  constructor() { }

  ngOnInit(): void {
  }

}
