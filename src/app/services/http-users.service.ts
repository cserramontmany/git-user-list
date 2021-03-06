import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppConsts } from './../AppConsts';
import { User } from './../models/user-model';
import { Repos } from './../models/repos-model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpUsersService {
  constructor(private _http: HttpClient) {}

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
    return this._http
      .get<User[]>(AppConsts.remoteServiceBaseUrl + 'users')
      .pipe(
        map((res) => {
          const array: User[] = [];
          res.forEach((elem) => {
            array.push(elem);
          });
          return array;
        }),
        catchError(this.handleError)
      );
  }

  public getUserFollowers(userloginName: string): Observable<User[]> {
    return this._http.get<any>(
      AppConsts.remoteServiceBaseUrl + 'users/' + userloginName + '/followers' );
  }

  public getUserReposList(userloginName: string): Observable<Repos[]> {
    return this._http.get<any>(
      AppConsts.remoteServiceBaseUrl + 'users/' + userloginName + '/repos'
    );
  }

  public getSingleUser(userloginName: string): Observable<any> {
    return this._http.get<any>(
      AppConsts.remoteServiceBaseUrl + 'users/' + userloginName
    );
  }

  // this is to ask for filtered results to github api.
  // not working because of CORS http = calling https

  // public getFilteredUsers(userloginName: string):Observable<User[]>{
  //   const headerDict = {
  //     "Access-Control-Allow-Origin":"*",
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json',
  //     'Access-Control-Allow-Headers': 'Content-Type',
  //   }

  //   const requestOptions = {
  //     headers: new HttpHeaders(headerDict),
  //   };

  //   return this._http.get<User[]>(AppConsts.remoteServiceBaseUrl + 'search/users?q=' + userloginName, requestOptions)
  // }
}
