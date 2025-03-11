import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserSessionComponent } from './browser-session.component';

describe('BrowserSessionComponent', () => {
  let component: BrowserSessionComponent;
  let fixture: ComponentFixture<BrowserSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrowserSessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowserSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
