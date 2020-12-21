import { TestBed } from '@angular/core/testing';

import { ScopePermissionService } from './scope-permission.service';

describe('ScopePermissionService', () => {
  let service: ScopePermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScopePermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
