import { Component, OnInit } from '@angular/core';
import { Object } from '@app/models/object';
import { User } from '@app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { ObjectValidateComponent } from '../object-validate/object-validate.component';
import { ObjectService } from '../object.service';
import { SnackbarService } from '@app/utils/snackbar/snackbar.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.css']
})
export class ObjectListComponent implements OnInit {

  object = new Object();
  resultList: Object[] = []

  loggedUser = new User();
  isLoggedIn: boolean = false;
  
  displayedColumns : string[] = []; 

  constructor(
    public dialog: MatDialog,
    private service: ObjectService,
    private router: Router) { }
  
  ngOnInit(): void {
    
    this.displayedColumns = ["id", "name", "location", "open"]
    this.displayedColumns.push("validate")
    this.displayedColumns.push("update")
    this.isLoggedIn = true
    this.loggedUser.id = 1
  }

  search(){
    let id = this.object.id

    this.service.get(id)
      .subscribe(
        (data) => {
        this.resultList = data.data;
      })	
  }

  validate(object_id: any, user_id: any){    
    const dialogRef = this.dialog.open(ObjectValidateComponent, {
      minWidth: "400px",
      data: { 
        object_id : object_id,
        user_id:   user_id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  update(id:number, owner_id: number){
    this.router.navigate(["/atualizar-patrimonio"], {queryParams:{id:id}})
  }

}
