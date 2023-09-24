import { TestBed } from '@angular/core/testing';

import { PregledLekarService } from './pregled-lekar.service';

describe('PregledLekarService', () => {
  let service: PregledLekarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PregledLekarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
