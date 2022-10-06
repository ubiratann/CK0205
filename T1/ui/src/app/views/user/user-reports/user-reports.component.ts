import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-reports',
  templateUrl: './user-reports.component.html',
  styleUrls: ['./user-reports.component.css']
})
export class UserReportsComponent implements OnInit {

  resultList: any[] = [];
  displayedColumns = [ "validated", "description"]

  constructor( @Inject(MAT_DIALOG_DATA) public data: {validations: any}) { }

  ngOnInit(): void {

    console.log(this.data)
    this.data.validations.validated.forEach((element: any) => {
      this.resultList.push(element);
    });

    this.data.validations.not_validated.forEach((element: any) => {
      this.resultList.push(element);
    });

  }

}
