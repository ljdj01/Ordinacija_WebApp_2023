import { TestBed } from '@angular/core/testing';

import { OdsustvoService } from './odsustvo.service';

describe('OdsustvoService', () => {
  let service: OdsustvoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OdsustvoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
