import { TestBed } from '@angular/core/testing';

import { VisitorSidenavService } from './visitor-sidenav-service.service';

describe('VisitorSidenavServiceService', () => {
  let service: VisitorSidenavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitorSidenavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
