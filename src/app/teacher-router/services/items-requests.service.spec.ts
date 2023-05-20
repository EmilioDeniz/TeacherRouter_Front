import { TestBed } from '@angular/core/testing';

import { ItemsRequestsService } from './items-requests.service';

describe('ItemsRequestsService', () => {
  let service: ItemsRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
