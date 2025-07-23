import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      class="theme-toggle" 
      (click)="toggleTheme()"
      [attr.aria-label]="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      <span class="theme-text">{{ isDarkMode ? 'LIGHT' : 'DARK' }}</span>
    </button>
  `,
  styles: [`
    .theme-toggle {
      display: flex;
      align-items: center;
      gap: var(--spacing-xs);
      background: var(--bg-surface);
      color: var(--text-primary);
      border: 1px solid var(--border-secondary);
      padding: var(--spacing-sm) var(--spacing-md);
      font-family: 'Inter', sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all var(--transition-fast);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .theme-toggle:hover {
      border: 1px solid transparent;
      background: 
        linear-gradient(var(--bg-surface), var(--bg-surface)) padding-box,
        linear-gradient(90deg, #CCFF00 0%, #FFD600 40%, #FF44CC 80%, #FF6EC7 100%) border-box;
      background-size: 100% 100%, 400% 400%;
      animation: borderGradient 3s ease infinite;
    }

    @keyframes borderGradient {
      0%, 100% { background-position: 0% 0%, 0% 50%; }
      50% { background-position: 0% 0%, 100% 50%; }
    }

    .theme-text {
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .theme-toggle {
        font-size: 0.75rem;
        padding: var(--spacing-xs) var(--spacing-sm);
      }
    }
  `]
})
export class ThemeToggleComponent implements OnInit {
  isDarkMode = true;

  ngOnInit() {
    this.isDarkMode = document.documentElement.getAttribute('data-theme') !== 'light';
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    
    // Store preference
    localStorage.setItem('theme', theme);
  }
} 