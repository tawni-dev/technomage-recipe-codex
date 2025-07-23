import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ThemeToggleComponent],
  template: `
    <header class="header">
      <div class="header-content">
        <div class="logo-section">
          <h1 class="logo">TECHNOMAGE RECIPE CODEX</h1>
          <p class="subtitle">Mystical Culinary Database</p>
        </div>
        <app-theme-toggle></app-theme-toggle>
      </div>
    </header>
  `,
  styles: [`
    .header {
      text-align: center;
      padding: 40px 0;
      border-bottom: 2px solid var(--acid-green);
      margin-bottom: 40px;
    }

    .header-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 var(--spacing-md);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo-section {
      text-align: left;
    }

    .logo {
      font-family: 'Urbanist', sans-serif;
      font-size: 3rem;
      font-weight: 200;
      letter-spacing: 1px;
      margin: 0;
      background: linear-gradient(90deg, #CCFF00 0%, #FFD600 40%, #FF44CC 80%, #FF6EC7 100%);
      background-size: 400% 400%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      text-transform: uppercase;
      animation: gradientShift 6s ease infinite;
    }

    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    .subtitle {
      font-family: 'Urbanist', sans-serif;
      font-size: 1.2rem;
      font-weight: 300;
      margin: 10px 0 0 0;
      color: var(--text-secondary);
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: var(--spacing-lg);
        text-align: center;
      }

      .logo {
        font-size: 2rem;
        letter-spacing: 1px;
      }

      .subtitle {
        font-size: 1rem;
      }
    }
  `]
})
export class HeaderComponent {} 