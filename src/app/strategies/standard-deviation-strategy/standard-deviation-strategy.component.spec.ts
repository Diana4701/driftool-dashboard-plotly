import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardDeviationStrategyComponent } from './standard-deviation-strategy.component';

describe('StandardDeviationStrategyComponent', () => {
  let component: StandardDeviationStrategyComponent;
  let fixture: ComponentFixture<StandardDeviationStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardDeviationStrategyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandardDeviationStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
