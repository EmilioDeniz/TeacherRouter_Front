import { TestBed } from '@angular/core/testing';

import { TeacherRouterService } from './teacher-router.service';

describe('TeacherRouterService', () => {
  let service: TeacherRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
