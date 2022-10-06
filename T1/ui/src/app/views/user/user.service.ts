import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { User } from '@app/models/user';
import { SnackbarService } from '@app/utils/snackbar/snackbar.service';
import { environment } from '@environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  private _token: any  = '';
  private _role: any   = '';
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar) { }

  get token(){
    this._token = localStorage.getItem('token' ?? '');
    return this._token
  }
  
  set token(token: string){
    localStorage.setItem('token', token);
    this.role = JSON.parse(token).role;
    this._token = token;
  }

  set role(role: number){
    localStorage.setItem('token', this.token);
  }

  get role(){
    return this._role
  }

  authenticate(user: User){
    return this.http.post<any>(`${environment.apiUrl}/user/login`, user)
      .pipe();
  }

  handler(error: any){
    this.snackBar.open(error.error.message, 'fechar')
    return throwError(() => error)
  }

}
