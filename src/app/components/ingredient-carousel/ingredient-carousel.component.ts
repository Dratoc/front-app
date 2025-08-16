import { IngredientsService } from './../../core/services/ingredients.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ingredient } from '../../models/ingredient.model';
import { IngredientCreationComponent } from "../ingredient-creation/ingredient-creation.component";
import { NotificationService } from '../../core/services/notification.service';

@Component({
  standalone: true,
  selector: 'app-ingredient-carousel',
  imports: [CommonModule, IngredientCreationComponent],
  templateUrl: './ingredient-carousel.component.html',
  styleUrls: ['./ingredient-carousel.component.scss']
})
export class IngredientCarouselComponent {
  ingredients: Ingredient[] = [];
  showForm = false;
  valueIngredientSelected: Ingredient | null = null;
  isEditing = false;

  constructor(private ingredientsService: IngredientsService,
        private notification: NotificationService
  ) {}


  ngOnInit() {
     this.loadIngredients();
  }

  handleIngredientCreated() {
    this.loadIngredients();
  }

  loadIngredients(){
    this.ingredientsService.getAllIngredients().subscribe({
      next: (data) => this.ingredients = data,
      error: (err) => console.error('Error al cargar targets:', err)
    });
  }

  updateIngredient( ingredient: Ingredient) {
    this.valueIngredientSelected = ingredient;
    this.isEditing = true;
    this.showForm = true;
  }

  createNewingredient(){
    this.valueIngredientSelected = null;
    this.isEditing = false;
    this.showForm = true;
  }

  deleteIngredient(id: number) {
    this.ingredientsService.deleteIngredient(id).subscribe({
      next: () => {
        console.log('✅ Ingrediente eliminado:', id);
        this.notification.success('Deleted successfully');
        this.loadIngredients(); // recargar la lista después de eliminar
      },
      error: (err) => {
        this.notification.error('problem deleting ingredient');
        console.error('Error al eliminar ingrediente:', err);
      }
    });
  }

}
