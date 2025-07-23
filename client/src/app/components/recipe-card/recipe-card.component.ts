import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="recipe-card" [class.expanded]="isExpanded">
      <div class="card-header">
        <h3 class="recipe-title">{{ recipe.title }}</h3>
        <div class="signature-badge">
          <span class="signature-text" *ngIf="recipe.signature">{{ recipe.signature }}</span>
          <span class="signature-text" *ngIf="!recipe.signature">RECIPE COLLECTION</span>
        </div>
        <div class="recipe-meta">
          <span class="calories">{{ recipe.calories }}</span>
          <span class="makes">{{ recipe.makes }}</span>
          <span class="time">{{ recipe.time }}</span>
        </div>
      </div>

      <div class="card-content">
        <div class="tags-section">
          <span 
            *ngFor="let tag of recipe.tags" 
            class="tag"
          >
            {{ tag }}
          </span>
        </div>

        <div class="ingredients-section" *ngIf="!isExpanded">
          <h4>Ingredients</h4>
          <ul class="ingredients-list">
            <li 
              *ngFor="let ingredient of recipe.ingredients" 
              class="ingredient-item"
            >
              <span class="ingredient-icon">{{ ingredient.icon }}</span>
              <span class="ingredient-text">{{ ingredient.item }}</span>
            </li>
          </ul>
        </div>

        <div class="expanded-content" *ngIf="isExpanded">
          <div class="ingredients-section">
            <h4>Ingredients</h4>
            <ul class="ingredients-list">
              <li 
                *ngFor="let ingredient of recipe.ingredients" 
                class="ingredient-item"
              >
                <span class="ingredient-icon">{{ ingredient.icon }}</span>
                <span class="ingredient-text">{{ ingredient.item }}</span>
              </li>
            </ul>
          </div>

          <div class="tips-section" *ngIf="recipe.tips">
            <h4>Tips</h4>
            <ul class="tips-list">
              <li 
                *ngFor="let tip of recipe.tips" 
                class="tip-item"
              >
                <span class="tip-icon">{{ tip.icon }}</span>
                <span class="tip-text">{{ tip.item }}</span>
              </li>
            </ul>
          </div>

          <div class="storage-section" *ngIf="recipe.storage">
            <h4>Storage</h4>
            <ul class="storage-list">
              <li 
                *ngFor="let storage of recipe.storage" 
                class="storage-item"
              >
                <span class="storage-icon">{{ storage.icon }}</span>
                <span class="storage-text">{{ storage.item }}</span>
              </li>
            </ul>
          </div>

          <div class="dressing-section" *ngIf="recipe.dressing">
            <h4>Dressing</h4>
            <ul class="dressing-list">
              <li 
                *ngFor="let dressing of recipe.dressing" 
                class="dressing-item"
              >
                <span class="dressing-icon">{{ dressing.icon }}</span>
                <span class="dressing-text">{{ dressing.item }}</span>
              </li>
            </ul>
          </div>

          <div class="coatings-section" *ngIf="recipe.coatings">
            <h4>Coatings</h4>
            <ul class="coatings-list">
              <li 
                *ngFor="let coating of recipe.coatings" 
                class="coating-item"
              >
                <span class="coating-icon">{{ coating.icon }}</span>
                <span class="coating-text">{{ coating.item }}</span>
              </li>
            </ul>
          </div>

          <div class="instructions-section">
            <h4>Instructions</h4>
            <ol class="instructions-list">
              <li 
                *ngFor="let instruction of recipe.instructions" 
                class="instruction-item"
              >
                {{ instruction.instruction }}
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div class="card-actions">
        <button 
          class="action-btn expand-btn" 
          (click)="toggleExpanded()"
          [attr.aria-label]="isExpanded ? 'Collapse recipe' : 'Expand recipe'"
        >
          {{ isExpanded ? 'Collapse' : 'Expand' }}
        </button>
        <button 
          class="action-btn print-btn" 
          (click)="printRecipe()"
          aria-label="Print recipe"
        >
          Print
        </button>
        <button 
          class="action-btn share-btn" 
          (click)="shareRecipe()"
          aria-label="Share recipe"
        >
          Share
        </button>
      </div>
    </div>
  `,
  styles: [`
    .recipe-card {
      background: var(--bg-elevated);
      border: 1px solid var(--chartreuse);
      padding: var(--spacing-md);
      transition: border var(--transition-normal) ease-in-out;
      width: 320px;
      height: 450px;
      display: flex;
      flex-direction: column;
      position: relative;
      flex-shrink: 0;
      flex-grow: 0;
      box-sizing: border-box;
      min-width: 320px;
      max-width: 320px;
      min-height: 450px;
      max-height: 450px;
    }

    .recipe-card:hover {
      border: 1px solid transparent;
      background: 
        linear-gradient(var(--bg-elevated), var(--bg-elevated)) padding-box,
        linear-gradient(90deg, #CCFF00 0%, #FFD600 40%, #FF44CC 80%, #FF6EC7 100%) border-box;
      background-size: 100% 100%, 400% 400%;
      animation: borderGradient 3s ease infinite;
    }

    @keyframes borderGradient {
      0%, 100% { background-position: 0% 0%, 0% 50%; }
      50% { background-position: 0% 0%, 100% 50%; }
    }

    .recipe-card.expanded {
      transform: none;
      height: 450px;
      min-height: 450px;
      max-height: 450px;
    }

    .card-header {
      margin-bottom: var(--spacing-md);
      flex-shrink: 0;
    }

    .recipe-title {
      font-family: 'Urbanist', sans-serif;
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 var(--spacing-sm) 0;
      line-height: 1.4;
      text-transform: uppercase;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      word-wrap: break-word;
      hyphens: auto;
      min-height: 2.8em; /* Ensure space for 2 lines */
    }

    .signature-badge {
      margin-bottom: var(--spacing-sm);
    }

    .signature-text {
      font-family: 'Archivo', sans-serif;
      font-size: 0.875rem;
      font-weight: 700;
      padding: var(--spacing-xs) var(--spacing-sm);
      background: linear-gradient(90deg, #CCFF00 0%, #FFD600 40%, #FF44CC 80%, #FF6EC7 100%);
      background-size: 400% 400%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      animation: gradientShift 6s ease infinite;
    }

    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    .recipe-meta {
      display: flex;
      gap: var(--spacing-xs);
      flex-wrap: wrap;
      font-family: 'Archivo', sans-serif;
      font-size: 0.75rem;
      color: var(--text-secondary);
      align-items: center;
    }

    .calories, .makes, .time {
      background: var(--bg-surface);
      padding: var(--spacing-xs) var(--spacing-sm);
      border: 1px solid var(--border-secondary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
      min-width: 0;
      font-size: 0.625rem;
    }

    .card-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
      overflow: hidden;
      min-height: 0;
    }

    .tags-section {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-xs);
      margin-bottom: var(--spacing-sm);
      flex-shrink: 0;
    }

    .tag {
      font-family: 'Archivo', sans-serif;
      font-size: 0.75rem;
      font-weight: 500;
      padding: var(--spacing-xs) var(--spacing-sm);
      background: var(--accent-bg);
      color: var(--accent-primary);
      border: 1px solid var(--accent-border);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .ingredients-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .ingredients-section h4 {
      font-family: 'Archivo', sans-serif;
      font-size: 1rem;
      font-weight: 600;
      color: var(--text-primary);
      margin: 0 0 var(--spacing-sm) 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      flex-shrink: 0;
    }

    .ingredients-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
      flex: 1;
      overflow-y: auto;
    }

    .ingredient-item {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-xs);
      font-family: 'Archivo', sans-serif;
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.4;
      flex-shrink: 0;
    }

    .ingredient-icon {
      flex-shrink: 0;
      font-size: 1rem;
      min-width: 1.5rem;
      text-align: center;
    }

    .ingredient-text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }

    .more-indicator {
      font-family: 'Archivo', sans-serif;
      font-size: 0.875rem;
      font-style: italic;
      color: var(--accent-primary);
      text-align: center;
      padding: var(--spacing-xs) 0;
      flex-shrink: 0;
      background: var(--accent-bg);
      border: 1px solid var(--accent-border);
      border-radius: 4px;
      margin-top: var(--spacing-xs);
    }

    .card-actions {
      display: flex;
      gap: var(--spacing-sm);
      margin-top: var(--spacing-md);
      padding-top: var(--spacing-md);
      border-top: 1px solid var(--border-secondary);
      flex-shrink: 0;
    }

    .action-btn {
      flex: 1;
      font-family: 'Archivo', sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      padding: var(--spacing-sm);
      border: 1px solid var(--border-secondary);
      background: var(--bg-surface);
      color: var(--text-primary);
      cursor: pointer;
      transition: all var(--transition-fast);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .action-btn:hover {
      background: var(--surface-hover);
      border-color: var(--accent-primary);
      color: var(--accent-primary);
    }

    .expand-btn {
      background: var(--accent-bg);
      color: var(--accent-primary);
      border-color: var(--accent-border);
    }

    .expand-btn:hover {
      background: var(--accent-primary);
      color: var(--black);
    }

    .print-btn {
      background: var(--bg-surface);
    }

    .share-btn {
      background: var(--bg-surface);
    }

    .share-btn:hover {
      background: var(--accent-primary);
      color: var(--black);
      border-color: var(--accent-primary);
    }

    .expanded-content {
      animation: slideDown var(--transition-normal) ease-out;
      overflow-y: auto;
      max-height: 200px;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .recipe-card {
        padding: var(--spacing-sm);
        width: 300px;
        height: 420px;
        min-width: 300px;
        max-width: 300px;
        min-height: 420px;
        max-height: 420px;
      }

      .recipe-card.expanded {
        transform: none;
        height: 420px;
        min-height: 420px;
        max-height: 420px;
      }

      .recipe-title {
        font-size: 1.125rem;
      }

      .recipe-meta {
        font-size: 0.75rem;
      }

      .calories, .makes, .time {
        font-size: 0.625rem;
        padding: var(--spacing-xs) var(--spacing-sm);
      }

      .ingredient-text {
        font-size: 0.75rem;
      }

      .ingredient-icon {
        min-width: 1.25rem;
        font-size: 0.875rem;
      }

      .action-btn {
        font-size: 0.625rem;
        padding: var(--spacing-xs) var(--spacing-sm);
      }
    }
  `]
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  @Output() print = new EventEmitter<Recipe>();
  @Output() share = new EventEmitter<Recipe>();

  isExpanded = false;

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  printRecipe() {
    this.print.emit(this.recipe);
  }

  shareRecipe() {
    this.share.emit(this.recipe);
  }
} 