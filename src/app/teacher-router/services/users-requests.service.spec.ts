import { TestBed } from '@angular/core/testing';

import { UsersRequestsService } from './users-requests.service';

describe('UsersRequestsService', () => {
  let service: UsersRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
