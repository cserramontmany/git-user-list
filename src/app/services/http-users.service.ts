import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AppConsts } from "./../AppConsts";
import { User } from "./../models/user-model";
import { Repos } from "./../models/repos-model";
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
    // TODO, CARLES: handle pagination
    //https://developer.github.com/v3/#pagination
    )
  }

  public getSingleUser(userloginName: string):Observable<User>{
    console.log( AppConsts.remoteServiceBaseUrl + 'users' + '/'  + userloginName )
    return this._http.get<any>(AppConsts.remoteServiceBaseUrl + 'users' + '/' + userloginName)
    // TODO, CARLES: handle search without result.
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

  public getFilteredUsers(userloginName: string):Observable<User[]>{
    // https://github.com/search?q=carles+in%3Alogin&type=Users
    // https://api.github.com/search?q=carles+in%3Alogin&type=Users
    const headerDict = {
      "Access-Control-Allow-Origin":"http://localhost:4200",
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'custom-CARLES': 'custom carles carles carles'
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this._http.get<User[]>(AppConsts.remoteServiceBaseUrl + 
        'search/users?q=' + userloginName, requestOptions)
  }

  public getUserFollowers(userloginName:string):Observable<User[]>{
    return this._http.get<any>(AppConsts.remoteServiceBaseUrl + 'users' + '/' + userloginName + '/followers' )

  }
  
  public getUserReposList(userloginName: string):Observable<Repos[]>{
    return this._http.get<any>(AppConsts.remoteServiceBaseUrl + 'users' + '/' + userloginName + '/repos' )
//     .pipe(
//       map((res) => {
//         const array: Repos[] = [];
//         res.forEach(elem => {
//           let repos = new Repos();
//           repos.id = elem.id
//           repos.name = elem.name
//           repos.html_url = elem.html_url
//           array.push(elem);
//         });
//         return array;
//       }),
//       catchError(this.handleError)
// // TODO, CARLES: handle pagination
// //https://developer.github.com/v3/#pagination
// )
  }


}