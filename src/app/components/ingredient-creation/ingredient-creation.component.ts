import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { Ingredient } from '../../models/ingredient.model';
import { IngredientsService } from '../../core/services/ingredients.service';
import { NotificationService } from '../../core/services/notification.service';


@Component({
  selector: 'app-ingredient-creation',
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './ingredient-creation.component.html',
  styleUrl: './ingredient-creation.component.scss'
})
export class IngredientCreationComponent {
  @Input() isUpdateMode: boolean = false;
  @Input() ingredientSelected: Ingredient | null = null;
  @Output() ingredientCreated = new EventEmitter<void>();
  @Output() formClosed = new EventEmitter<void>();

  // Simulación de grupos alimenticios (reemplazarlo con datos reales)
  foodGroups = [
    { id: 1, name: 'Cereals' },
    { id: 5, name: 'Dairy' },
    { id: 4, name: 'Fruits' },
    { id: 8, name: 'Lipids' },
    { id: 6, name: 'Meat or Substitutes' },
    { id: 7, name: 'Oils' },
    { id: 3, name: 'Vegetables - Free' },
    { id: 2, name: 'Vegetables - General' },
  ];

  ingredient: Ingredient = {
    id: 0,
    name: '',
    portion: '',
    foodGroupId: 0,
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0
  };

  constructor(
    private ingredientsService: IngredientsService,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    console.log(this.ingredientSelected)
    if (this.isUpdateMode && this.ingredientSelected) {
      this.ingredient = { ...this.ingredientSelected };
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ingredientSelected'] && this.ingredientSelected) {
      this.ingredient = { ...this.ingredientSelected };
    }
  }

  cerrarFormulario() {
    this.formClosed.emit();
  }


  onSubmit(form: NgForm) {
    if (form.valid) {
      const newIngredient: Ingredient = {
        id: this.ingredient.id, // El ID será asignado por el backend si viene nulo
        name: this.ingredient.name,
        portion: this.ingredient.portion,
        foodGroupId: +this.ingredient.foodGroupId,
        calories: this.ingredient.calories,
        protein: this.ingredient.protein,
        fat: this.ingredient.fat,
        carbs: this.ingredient.carbs
      };

      if (this.isUpdateMode) {
        this.updateIngredient(newIngredient);
      } else {
        this.createIngredient(newIngredient);
      }



    } else {
      this.notification.warning('Check the form, it is invalid');
      console.log('Formulario inválido');
    }
  }

  updateIngredient(ingredient: Ingredient) {
    console.log('Actualizando ingrediente:', ingredient);
    this.ingredientsService.updateIngredient(ingredient.id,ingredient).subscribe({
      next: (updated) => {
        console.log('✅ Ingrediente actualizado:', updated);
        this.ingredientCreated.emit();
        this.notification.success('Updated successfully');
        this.cerrarFormulario(); // cerrar el formulario si fue exitoso
      },
      error: (err) => {
        this.notification.error('Problem updating ingredient');
        console.error('❌ Error al actualizar ingrediente:', err);
      }
    });
  }

  createIngredient(newIngredient: Ingredient) {
          this.ingredientsService.addIngredient(newIngredient).subscribe({
        next: (created) => {
          console.log('✅ Ingrediente creado:', created);
          this.ingredientCreated.emit();
          this.notification.success('Created successfully');

          this.cerrarFormulario(); // cerrar el formulario si fue exitoso

        },
        error: (err) => {
          this.notification.error('Problem creating ingredient');
          console.error('❌ Error al crear ingrediente:', err);
        }
      });
  }

}
