import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadbusinessComponent } from './readbusiness.component';

describe('ReadbusinessComponent', () => {
  let component: ReadbusinessComponent;
  let fixture: ComponentFixture<ReadbusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadbusinessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadbusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
