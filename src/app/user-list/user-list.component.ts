import { Component, OnInit } from '@angular/core';
import { HttpUsersService } from '../services/http-users.service';
import { User } from '../models/user-model';
import { finalize } from 'rxjs/operators';
import { slideFromBottom } from '../shared/animations/routerTransition';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [slideFromBottom()]
})
export class UserListComponent implements OnInit {
  filterText: string = '';
  users: User[];
  ready: boolean = false;

  constructor(private _httpUserService: HttpUsersService) {}

  ngOnInit(): void {
    this._httpUserService.getUsersFromEndPoint()
    .pipe(
      finalize(() => {
        this.ready = true;
      })
    ).subscribe(res=> this.users = res);
  }

  // this was for using input text field to ask for filtered results to github api.
  // not working because of CORS http = calling https
  // (ngModelChange)="search()" // this was on template's input
  // search():void{
  //   this._httpUserService.getFilteredUsers(this.filterText)
  //     .subscribe(res=> {
  //       console.log(res)
  //       this.users = res
  //     })
  // }
}

