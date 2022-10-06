import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ObjectService } from '@app/views/object/object.service';
import { UserReportsComponent } from '../user-reports/user-reports.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-objects',
  templateUrl: './user-objects.component.html',
  styleUrls: ['./user-objects.component.css']
})
export class UserObjectsComponent implements OnInit {
  resultList: [] = []

  displayedColumns = ["id", "name", "location", "validated", "open"]

  constructor(
    public dialog: MatDialog,
    private service: ObjectService) { }

  ngOnInit(): void {
    this.service.getReports(2)
    .subscribe(data => {
      console.log(data)
      this.resultList = data.data;
    })
  }

  showReports(validations: any){
    console.log(validations.resume)
    
    const dialogRef = this.dialog.open(UserReportsComponent, {
      minWidth: "600px",
      data: { 
       validations: validations.resume
    }});

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
