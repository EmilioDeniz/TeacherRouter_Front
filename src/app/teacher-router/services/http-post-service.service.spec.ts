import { TestBed } from '@angular/core/testing';

import { HttpPostServiceService } from './http-post-service.service';

describe('HttpPostServiceService', () => {
  let service: HttpPostServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpPostServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
