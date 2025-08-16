import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Ingredient } from '../../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  private apiUrl = `${environment.apiBaseUrl}/ingredients`;

  constructor(private http: HttpClient) { }

  getAllIngredients(){
    return this.http.get<Ingredient[]>(`${this.apiUrl}`);
  }

  addIngredient(ingredient: Ingredient) {
    return this.http.post<Ingredient>(`${this.apiUrl}`, ingredient);
  }

  deleteIngredient(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateIngredient(id: number, ingredient: Ingredient) {
    return this.http.put<Ingredient>(`${this.apiUrl}/${id}`, ingredient);
  }

}
