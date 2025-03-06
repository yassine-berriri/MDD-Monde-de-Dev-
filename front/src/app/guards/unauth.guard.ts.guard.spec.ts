import { TestBed } from '@angular/core/testing';

import { UnauthGuardTsGuard } from './unauth.guard.ts.guard';

describe('UnauthGuardTsGuard', () => {
  let guard: UnauthGuardTsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnauthGuardTsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
