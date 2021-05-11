import { TestBed } from '@angular/core/testing';

import { DummyDogApiService } from './dummy-dog-api.service';

describe('DummyDogApiService', () => {
  let service: DummyDogApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyDogApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
