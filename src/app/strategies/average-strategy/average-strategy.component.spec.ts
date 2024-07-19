import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageStrategyComponent } from './average-strategy.component';

describe('AverageStrategyComponent', () => {
  let component: AverageStrategyComponent;
  let fixture: ComponentFixture<AverageStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AverageStrategyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AverageStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
