import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationRoleComponent } from './application-role.component';

describe('ApplicationRoleComponent', () => {
  let component: ApplicationRoleComponent;
  let fixture: ComponentFixture<ApplicationRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
