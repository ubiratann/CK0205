import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  constructor(private http: HttpClient) { }

  create(obj: any){
    return this.http.post<any>(`${environment.apiUrl}/object/`, obj);
  }

}
