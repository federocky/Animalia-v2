import { TestBed } from '@angular/core/testing';

import { EmpGuardGuard } from './emp-guard.guard';

describe('EmpGuardGuard', () => {
  let guard: EmpGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EmpGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
