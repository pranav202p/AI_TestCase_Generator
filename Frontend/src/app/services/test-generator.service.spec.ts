import { TestBed } from '@angular/core/testing';

import { TestGeneratorService } from './test-generator.service';

describe('TestGeneratorService', () => {
  let service: TestGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
