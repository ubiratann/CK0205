import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/models/user';
import { environment } from '@environments/environment';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _token: any  = '';
  private _role: any   = '';
  constructor(private http: HttpClient) { }

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


}
