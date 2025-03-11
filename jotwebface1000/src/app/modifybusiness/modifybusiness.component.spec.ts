import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifybusinessComponent } from './modifybusiness.component';

describe('ModifybusinessComponent', () => {
  let component: ModifybusinessComponent;
  let fixture: ComponentFixture<ModifybusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifybusinessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifybusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
