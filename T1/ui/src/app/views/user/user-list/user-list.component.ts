import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';
import { SnackbarService } from '@app/utils/snackbar/snackbar.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  user = new User();
  resultList: User[] = [];
  
  displayedColumns : string[] = ["id", "full_name", "username", "delete", "role"] ;

  constructor(
    private userService: UserService,
    private snackBarService: SnackbarService) { }
  
  ngOnInit(): void {
  }

  search(){
    this.userService.getList(this.user.id)
      .subscribe(data => {
        this.resultList = data.data
        console.log
      })
  }

  delete(id: number){
    this.userService.delete(id)
    .subscribe(data => {
      this.resultList = data.data
    })
  }

  updateRole(role:number, id:number ){
    this.userService.updateRole({role: role, id:id})
      .subscribe(data => {
        this.snackBarService.openSnackBar(data.message, "ok")
      })
  
  }
}
