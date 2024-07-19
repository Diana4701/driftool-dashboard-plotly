import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxThreeTogglesComponent } from './max-three-toggles.component';

describe('MaxThreeTogglesComponent', () => {
  let component: MaxThreeTogglesComponent;
  let fixture: ComponentFixture<MaxThreeTogglesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaxThreeTogglesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaxThreeTogglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
