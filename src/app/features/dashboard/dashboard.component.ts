import { Component } from '@angular/core';
import { CardComponent } from '../../shared/card/card.component';
import { IngredientCarouselComponent } from "../../components/ingredient-carousel/ingredient-carousel.component";
import { PortionInfoComponent } from "../../components/portion-info/portion-info.component";
import { PlanPortionComponent } from '../plan-portion/plan-portion.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent, IngredientCarouselComponent, PortionInfoComponent, PlanPortionComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  title = "Nutrition Tips";
  content = "Stay hydrated, eat balanced, and plan your meals to maintain a healthy lifestyle.";
}
