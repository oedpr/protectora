import { TestBed } from '@angular/core/testing';

import { ToastyService } from './toasty.service';

describe('ToastyService', () => {
  let service: ToastyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
