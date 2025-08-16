import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientCarouselComponent } from './ingredient-carousel.component';

describe('IngredientCarouselComponent', () => {
  let component: IngredientCarouselComponent;
  let fixture: ComponentFixture<IngredientCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
