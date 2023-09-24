import { TestBed } from '@angular/core/testing';

import { ZakazanPregledService } from './zakazan-pregled.service';

describe('ZakazanPregledService', () => {
  let service: ZakazanPregledService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZakazanPregledService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
