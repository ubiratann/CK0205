import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient) { }

  private _updatemenu = new Subject<void>();

  get updateMenu(): Subject<void>{
    return this._updatemenu
  }

  get token(): string | null{
    return localStorage.getItem('token' || '');
  }

  get role(): string | null{
    return localStorage.getItem('role' || '');
  }

  getMenu(role: number){
    return this.http.get(`${environment.apiUrl}/menu/${role}`);
  }
 
}
