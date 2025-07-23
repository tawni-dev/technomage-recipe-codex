import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:3000/api'; // Will be configurable for production

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiUrl}/recipes`);
  }

  createRecipe(recipe: Omit<Recipe, 'id'>): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.apiUrl}/recipes`, recipe);
  }

  deleteRecipe(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/recipes/${id}`);
  }
} 