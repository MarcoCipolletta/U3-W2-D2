import { TestBed } from '@angular/core/testing';

import { DbPostService } from './db-post.service';

describe('DbPostService', () => {
  let service: DbPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
