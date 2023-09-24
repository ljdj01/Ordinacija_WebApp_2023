import { TestBed } from '@angular/core/testing';

import { OdbijeniService } from './odbijeni.service';

describe('OdbijeniService', () => {
  let service: OdbijeniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OdbijeniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
