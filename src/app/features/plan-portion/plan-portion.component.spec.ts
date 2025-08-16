import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPortionComponent } from './plan-portion.component';

describe('PlanPortionComponent', () => {
  let component: PlanPortionComponent;
  let fixture: ComponentFixture<PlanPortionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanPortionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanPortionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
