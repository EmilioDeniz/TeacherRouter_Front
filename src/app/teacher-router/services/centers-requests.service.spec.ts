import { TestBed } from '@angular/core/testing';

import { CentersRequestsService } from './centers-requests.service';

describe('CentersRequestsService', () => {
  let service: CentersRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentersRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
