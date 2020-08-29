import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppConsts } from "./../AppConsts";
import { User } from "./../models/user-model";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpUsersService {

  constructor(
    private _http: HttpClient,
    private _router: Router) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code. The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }

  public getUsersFromEndPoint(): Observable<User[]> {
    // Call the http GET
    return this._http.get<User[]>(AppConsts.remoteServiceBaseUrl + 'users')
    .pipe(
          map((res) => {
            const array: User[] = [];
            res.forEach(elem => {
              array.push(elem);
            });
            return array;
          }),
          catchError(this.handleError)
    )
  }

  public getSingleUser(userloginName: string):Observable<User>{
    console.log( AppConsts.remoteServiceBaseUrl + 'users' + '/'  + userloginName )
    return this._http.get<any>(AppConsts.remoteServiceBaseUrl + 'users' + '/' + userloginName)
    // .pipe(
    //   map(res =>{
    //     if(res.status == 404){
    //       this._router.navigate(['page-not-found'])
    //     }else{
    //       const user: User = res; 
    //       return user;
    //     }
    //   }),
    //   catchError(this.handleError)
    // );
  }
}
