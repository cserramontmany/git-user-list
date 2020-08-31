import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpUsersService } from '../services/http-users.service';
import { User } from '../models/user-model';
import { finalize } from 'rxjs/operators';
import { Repos } from '../models/repos-model';
import { slideFromBottom } from '../shared/animations/routerTransition';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  animations: [slideFromBottom()]
})
export class UserDetailComponent implements OnInit, AfterViewChecked {
  userloginName: string; 
  user: User;
  followers: User[];
  repos: Repos[];

  constructor(
    private route: ActivatedRoute, 
    private _httpUserService: HttpUsersService,
    private _router: Router) { }

  ngOnInit(): void {
    //this.userloginName = this.route.snapshot.params['name'];
    // Subscibing to the route instead of snapshot let us to reload 
    // the component itself if the route changes, in this case with selecting any follower. 
    this.route.params
      .subscribe(
        (params: Params)=>{
          this.userloginName = params.name
          this.getUser();
      }
    );
  }
  ngAfterViewChecked() {
    // Hack: Scrolls to top of Page after page view initialized
    // if selecting any follower 
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
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
        },
        error => {
          this._router.navigate(['page-not-found'], { queryParams: { url: error.url } });
          console.log('oops', error)
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
