import { TestBed } from '@angular/core/testing';

import { MylibService } from './mylib.service';
import { describe, expect, it, beforeEach } from '@jest/globals';

describe('LibService', () => {
  let service: MylibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MylibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
