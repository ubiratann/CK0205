import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';
import { SnackbarService } from '@app/utils/snackbar/snackbar.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  
  user: User = {
    full_name: '',
    username: '',
    password: '',
    email: '',
    id: 0
  };

  hide: boolean = true;

  constructor(
    private service: UserService,
    private snackBar: SnackbarService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user") ?? "");
  }

  save(){ 
    if(this.validate()){
      this.service.update(this.user)
        .subscribe(data => {
          this.snackBar.openSnackBar(data.message, "ok");
        });
    }
  }

  validate(){
    if(!this.user.full_name || this.user.full_name.trim() == ''){
      this.snackBar.openSnackBar("O campo Nome é obrigatório", "fechar!");
      return false;
    }
    
    if(!this.user.username || this.user.username.trim() == ''){
      this.snackBar.openSnackBar("O campo Username é obrigatório", "fechar!");
      return false;
    }
    
    if(!this.user.email || this.user.email.trim() == ''){
      this.snackBar.openSnackBar("O campo Email é obrigatório", "fechar!");
      return false;
    }
    
    if(!this.user.password || this.user.password.trim() == ''){
      this.snackBar.openSnackBar("O campo Senha é obrigatório", "fechar!");
      return false;
    }

    return true;
  }

  cancel(){ }

}
