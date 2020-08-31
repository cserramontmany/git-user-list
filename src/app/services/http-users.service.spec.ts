import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HttpUsersService } from './http-users.service';
import { User } from '../models/user-model';
import { AppConsts } from '../AppConsts';

describe('HttpUsersService', () => {
  let service: HttpUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpUsersService],
    });
    service = TestBed.inject(HttpUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list the users', () => {
    const userService = TestBed.get(HttpUsersService);
    const http = TestBed.get(HttpTestingController);
    // fake response
    const expectedUsers = [{ login: 'Carles' }];

    let actualUsers = [];
    userService.getUsersFromEndPoint().subscribe((users: Array<User>) => {
      actualUsers = users;
    });

    http.expectOne(AppConsts.remoteServiceBaseUrl + 'users').flush(expectedUsers);

    expect(actualUsers).toEqual(expectedUsers);
  });

  it('should get one user', () => {
    const userService = TestBed.get(HttpUsersService);
    const http = TestBed.get(HttpTestingController);
    // fake response
    const expectedUser = { login: 'carles' };

    let actualUser = {};
    userService.getSingleUser(expectedUser.login).subscribe((user: User) => {
      actualUser = user;
    });

    http.expectOne(AppConsts.remoteServiceBaseUrl + 'users/' + expectedUser.login).flush(expectedUser);

    expect(actualUser).toEqual(expectedUser);
  });
});
