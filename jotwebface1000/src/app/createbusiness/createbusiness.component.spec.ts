import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatebusinessComponent } from './createbusiness.component';

describe('CreatebusinessComponent', () => {
  let component: CreatebusinessComponent;
  let fixture: ComponentFixture<CreatebusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatebusinessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatebusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
