import { Component, OnInit } from '@angular/core';
import { HttpUsersService } from "./services/http-users.service";
import { finalize } from 'rxjs/operators';
import { User } from './models/user-model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'git-user-list';
  users: User[];
  constructor(private _httpUserService: HttpUsersService) {}

  ngOnInit(): void {
    this._httpUserService.getUsersFromEndPoint()
    .pipe(
      finalize(() => {
        console.log('els users: ', this.users)
      })
    ).subscribe(res=> this.users = res);
  }

}
