import { TestBed } from '@angular/core/testing';

import { NovipregledService } from './novipregled.service';

describe('NovipregledService', () => {
  let service: NovipregledService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovipregledService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
