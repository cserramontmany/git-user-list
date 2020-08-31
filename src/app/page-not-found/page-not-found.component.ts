import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { slideFromBottom } from '../shared/animations/routerTransition';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  animations: [slideFromBottom()]
})
export class PageNotFoundComponent implements OnInit {
  url: string ='page not found! ';

  constructor(
    private route: ActivatedRoute,
    private router: Router) {}
    
  ngOnInit(): void {
    this.route
    .queryParams
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.url = params['url'];
    });
}

goHome():void{
  this.router.navigate(['/users'])
}
}
