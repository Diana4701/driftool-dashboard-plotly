import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePeriodStrategyComponent } from './time-period-strategy.component';

describe('TimePeriodStrategyComponent', () => {
  let component: TimePeriodStrategyComponent;
  let fixture: ComponentFixture<TimePeriodStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimePeriodStrategyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimePeriodStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
