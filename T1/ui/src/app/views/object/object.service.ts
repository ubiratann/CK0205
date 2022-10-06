import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Object } from '@app/models/object';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarService } from '@app/utils/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private snackBarService: SnackbarService) { }

  create(obj: any){
    return this.http.post<any>(`${environment.apiUrl}/object/`, obj)
      .pipe(
        catchError(this.handler.bind(this))
      );
  }

  get(id: any){
    if(!id) id = '';
    
    return this.http.get<any>(`${environment.apiUrl}/object/${id}`)
      .pipe(
        catchError(this.handler.bind(this))
      );
  }

  update(id:any , obj: any){
    return this.http.put<any>(`${environment.apiUrl}/object/${id}`, obj)
      .pipe(
        catchError(this.handler.bind(this))
      )
  }

  validate(obj: any){
    return this.http.post<any>(`${environment.apiUrl}/object/validate`, obj)
    .pipe(
      catchError(this.handler.bind(this))
    )
  }

  getReports(id: any){
    return this.http.get<any>(`${environment.apiUrl}/object/user/${id}`)
  }

  handler(error: any){
    this.snackBarService.openSnackBar(error.error.message, 'fechar');
    return throwError(() => error)
  }

}
