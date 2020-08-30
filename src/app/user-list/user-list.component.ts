import { Component, OnInit } from '@angular/core';
import { HttpUsersService } from '../services/http-users.service';
import { User } from '../models/user-model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  filterText: string = '';
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

  search():void{
    // this._httpUserService.getFilteredUsers(this.filterText)
    //   .subscribe(res=> {
    //     console.log(res)
    //     //this.users = res
    //   })
  }
}

