import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastThreeDaysComponent } from './last-three-days.component';

describe('LastThreeDaysComponent', () => {
  let component: LastThreeDaysComponent;
  let fixture: ComponentFixture<LastThreeDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastThreeDaysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastThreeDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
