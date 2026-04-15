import { TestBed } from '@angular/core/testing';

import { UserJsonServerService } from './user-json-server.service';

describe('UserJsonServerService', () => {
  let service: UserJsonServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserJsonServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
