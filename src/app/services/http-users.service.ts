import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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

  // public getUsersFromEndPoint(): Observable<any[]> {
  //   // Call the http GET
  //   return this.http.get<any>(environment.remoteServiceUrl).pipe(
  //     map((res) => {
  //       let items: Item[] = <Item[]>res.items;
  //       let favitems: ItemFavourite[] = [];
  //       items.forEach(elem => {
  //         favitems.push(this.mapItemToFavouriteItem(elem));
  //       });
  //       return favitems;
  //     }),
  //     catchError(this.handleError)
  //   );
  // }


  // public getUsersFromEndPoint(): Observable<ItemFavourite[]> {
  //   // Call the http GET
  //   return this.http.get<any>(environment.remoteServiceUrl).pipe(
  //     map((res) => {
  //       let items: Item[] = <Item[]>res.items;
  //       let favitems: ItemFavourite[] = [];
  //       items.forEach(elem => {
  //         favitems.push(this.mapItemToFavouriteItem(elem));
  //       });
  //       return favitems;
  //     }),
  //     catchError(this.handleError)
  //   );
  // }

}
