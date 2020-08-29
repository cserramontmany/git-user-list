import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppConsts } from "./../AppConsts";
import { User } from "./../models/user-model";

@Injectable({
  providedIn: 'root'
})
export class HttpUsersService {

  constructor(private http: HttpClient) {}

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
    console.log(AppConsts.remoteServiceBaseUrl)
    return this.http.get<User[]>(AppConsts.remoteServiceBaseUrl + 'users')
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
}
