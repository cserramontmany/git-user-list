import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpUsersService } from '../services/http-users.service';
import { User } from '../models/user-model';
import { finalize } from 'rxjs/operators';
import { Repos } from '../models/repos-model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userloginName: string; 
  user: User;
  followers: User[];
  repos: Repos[];

  constructor(
    private route: ActivatedRoute, 
    private _httpUserService: HttpUsersService) { }

  ngOnInit(): void {
    //this.userloginName = this.route.snapshot.params['name'];
    this.route.params
      .subscribe(
        (params: Params)=>{
          console.log(params.name)
          // let name = JSON.parse(res.name)
          this.userloginName = params.name
          this.getUser();
      }
    );
  }

  getUser():void{
    if (this.userloginName) {
      this._httpUserService.getSingleUser(this.userloginName)
      .pipe(
        finalize(() => {
          this.getFollowers();
          this.getRepos();
        })
      )
      .subscribe(res =>{
          this.user = res;
        })
    }
  }

  getFollowers():void {
    this._httpUserService.getUserFollowers(this.user.login)
    .subscribe(
      res=>{
        this.followers = res;
      }
    )
  }

  getRepos():void{
    this._httpUserService.getUserReposList(this.user.login)
    .subscribe(
      res=>{
        this.repos = res;
      }
    )
    }

}
