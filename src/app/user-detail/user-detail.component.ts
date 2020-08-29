import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpUsersService } from '../services/http-users.service';
import { User } from '../models/user-model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userloginName: string; 
  user: User;
  constructor(
    private route: ActivatedRoute, 
    private _httpUserService: HttpUsersService) { }

  ngOnInit(): void {
    this.userloginName = this.route.snapshot.params['name'];
    if (this.userloginName) {
      this._httpUserService.getSingleUser(this.userloginName)
        .subscribe(res =>{
          this.user = res;
        })
    }
  }

}
