import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientCreationComponent } from './ingredient-creation.component';

describe('IngredientCreationComponent', () => {
  let component: IngredientCreationComponent;
  let fixture: ComponentFixture<IngredientCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
