import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumStrategyComponent } from './sum-strategy.component';

describe('SumStrategyComponent', () => {
  let component: SumStrategyComponent;
  let fixture: ComponentFixture<SumStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumStrategyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SumStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
