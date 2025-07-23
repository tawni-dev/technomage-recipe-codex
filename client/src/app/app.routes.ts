import { Routes } from '@angular/router';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';

export const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: '**', redirectTo: '' }
]; 