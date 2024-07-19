import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarianceStrategyComponent } from './variance-strategy.component';

describe('VarianceStrategyComponent', () => {
  let component: VarianceStrategyComponent;
  let fixture: ComponentFixture<VarianceStrategyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VarianceStrategyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VarianceStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
