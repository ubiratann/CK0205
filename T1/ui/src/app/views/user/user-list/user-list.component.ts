import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  user = new User();
  resultList: User[] = [];
  
  displayedColumns : string[] = ["id", "full_name", "username", "delete"] ;

  constructor(private userService: UserService) { }
  
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


}
