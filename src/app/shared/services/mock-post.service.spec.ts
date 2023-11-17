import { TestBed } from '@angular/core/testing';

import { MockPostService } from './mock-post.service';

describe('MockPostService', () => {
  let service: MockPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
