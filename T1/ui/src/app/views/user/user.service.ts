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

  get user(){
    let user = JSON.parse(localStorage.getItem("user")?? "{}")
    return user
  }

  get role(){
    let user = JSON.parse(localStorage.getItem("user")?? "{}")
    return user.role
  }

  get userId(){
    let user = JSON.parse(localStorage.getItem("user")?? "{}")
    return user.id;
  }

  authenticate(user: User){
    return this.http.post<any>(`${environment.apiUrl}/user/auth`, user)
      .pipe(
        catchError(this.handler.bind(this))
      );
  }


  signin(user: any){
    return this.http.post<any>(`${environment.apiUrl}/user/signin`, user)
    .pipe(
      catchError(this.handler.bind(this)));
  }

  isLoggedIn(){
    if(this.user.username != null) 
      return true
    
    return false
  }

  update(user: any){
    return this.http.patch<any>(`${environment.apiUrl}/user`, user)
    .pipe(
      catchError(this.handler.bind(this)));
  }

  getList(id: any){
    let url = `${environment.apiUrl}/user/${id}`
    if(id == null )
      url = `${environment.apiUrl}/user/`

    return this.http.get<any>(url)
    .pipe(
      catchError(this.handler.bind(this)));
  }

  delete(id: any){
    return this.http.delete<any>(`${environment.apiUrl}/user/${id}`)
    .pipe(
      catchError(this.handler.bind(this)));
  }

  updateRole(user: any){
    return this.http.put<any>(`${environment.apiUrl}/user/role/${user.role}`, user)
    .pipe(
      catchError(this.handler.bind(this)));
  }

  handler(error: any){
    this.snackBar.open(error.error.message ,'fechar')
    return throwError(() => error)
  }
}
