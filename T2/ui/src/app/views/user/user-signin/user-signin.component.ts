import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/models/user';
import { SnackbarService } from '@app/utils/snackbar/snackbar.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css']
})
export class UserSigninComponent implements OnInit {

  user = new User();
  hide: boolean = true;

  constructor(
    private router: Router,
    private service: UserService,
    private snackBarService: SnackbarService) { }

  ngOnInit(): void {
  }


  signin(){
    if(this.validate()){
      this.service.signin(this.user)
        .subscribe(data => {
          this.snackBarService.openSnackBar("Usuário cadastrado com sucesso!", "ok")
          this.router.navigate(["login"])
        })
    }
  }


  validate(){
    if(!this.user.full_name || this.user.full_name.trim() == ""){
      this.snackBarService.openSnackBar("O nome completo é obrigatorio", "fechar")
      return false;
    }
    
    if(!this.user.username || this.user.username.trim() == ""){
      this.snackBarService.openSnackBar("O nome de usuário é obrigatorio", "fechar")
      return false;
    }

    if(!this.user.email || this.user.email.trim() == ""){
      this.snackBarService.openSnackBar("O email é obrigatorio", "fechar")
      return false;
    }

    if(!this.user.password || this.user.password.trim() == ""){
      this.snackBarService.openSnackBar("A senha é obrigatoria", "fechar")
      return false;
    }

    return true;

  }
}