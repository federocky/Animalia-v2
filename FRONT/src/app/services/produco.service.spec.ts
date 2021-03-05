import { TestBed } from '@angular/core/testing';

import { ProducoService } from './produco.service';

describe('ProducoService', () => {
  let service: ProducoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProducoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
