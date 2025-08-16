import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortionInfoComponent } from './portion-info.component';

describe('PortionInfoComponent', () => {
  let component: PortionInfoComponent;
  let fixture: ComponentFixture<PortionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortionInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
