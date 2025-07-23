import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-load-more',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="load-more-container">
      <button 
        class="load-more-btn" 
        (click)="loadMore.emit()"
        [disabled]="loading"
      >
        <span *ngIf="!loading">Load More Recipes</span>
        <span *ngIf="loading" class="loading-text">Loading...</span>
        <span class="count-text">({{ currentCount }} of {{ totalCount }})</span>
      </button>
    </div>
  `,
  styles: [`
    .load-more-container {
      display: flex;
      justify-content: center;
      margin: var(--spacing-2xl) 0;
    }

    .load-more-btn {
      font-family: 'Inter', sans-serif;
      font-size: 1rem;
      font-weight: 500;
      padding: var(--spacing-md) var(--spacing-xl);
      background: var(--chartreuse);
      color: var(--black);
      border: none;
      cursor: pointer;
      transition: all var(--transition-fast);
      text-transform: uppercase;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
    }

    .load-more-btn:hover:not(:disabled) {
      background: #00FF00;
      box-shadow: var(--shadow-glow);
      transform: translateY(-2px);
    }

    .load-more-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .loading-text {
      font-style: italic;
    }

    .count-text {
      font-size: 0.875rem;
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .load-more-btn {
        font-size: 0.875rem;
        padding: var(--spacing-sm) var(--spacing-lg);
      }
    }
  `]
})
export class LoadMoreComponent {
  @Input() currentCount = 0;
  @Input() totalCount = 0;
  @Input() loading = false;
  @Output() loadMore = new EventEmitter<void>();
} 