import { TestBed } from '@angular/core/testing';

import { WhiteListService } from './white-list.service';

describe('WhiteListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WhiteListService = TestBed.get(WhiteListService);
    expect(service).toBeTruthy();
  });
});
