import { TestBed } from '@angular/core/testing';

import { StrategyContextService } from './strategy-context.service';

describe('StrategyService', () => {
  let service: StrategyContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrategyContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
