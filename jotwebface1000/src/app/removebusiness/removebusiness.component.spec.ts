import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovebusinessComponent } from './removebusiness.component';

describe('RemovebusinessComponent', () => {
  let component: RemovebusinessComponent;
  let fixture: ComponentFixture<RemovebusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemovebusinessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemovebusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
