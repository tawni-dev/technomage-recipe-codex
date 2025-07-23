import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, RecipeListComponent, FooterComponent],
  template: `
    <div class="app-container">
      <!-- Loading Screen -->
      <div class="loading-screen" [class.hidden]="!isLoading" id="loadingScreen">
        <div class="celestial-morph">◐</div>
        <div class="loading-title">TECHNOMAGE RECIPE CODEX</div>
        <div class="loading-subtitle">Mystical Culinary Database Loading</div>
        <div class="progress-container">
          <div class="progress-bar" [style.width.%]="loadingProgress"></div>
        </div>
      </div>

      <!-- Main Interface -->
      <div class="main-interface" [class.loaded]="!isLoading" id="mainInterface">
        <app-header></app-header>
        <main class="main-content">
          <app-recipe-list></app-recipe-list>
        </main>
        <app-footer></app-footer>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: var(--bg-primary);
      color: var(--text-primary);
      transition: all var(--transition-normal);
      overflow-x: hidden;
    }

    /* Loading Screen */
    .loading-screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: linear-gradient(135deg, #0A0A0B 0%, #131315 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      transition: opacity 0.5s ease-out;
    }

    .loading-screen.hidden {
      opacity: 0;
      pointer-events: none;
    }

    .celestial-morph {
      font-size: 4rem;
      color: var(--acid-green);
      animation: rotate 2s linear infinite;
      margin-bottom: var(--spacing-lg);
    }

    .loading-title {
      font-family: 'Urbanist', sans-serif;
      font-size: 3rem;
      font-weight: 200;
      letter-spacing: 1px;
      background: linear-gradient(90deg, #CCFF00 0%, #FFD600 40%, #FF44CC 80%, #FF6EC7 100%);
      background-size: 400% 400%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      text-transform: uppercase;
      margin-bottom: var(--spacing-sm);
      animation: gradientShift 6s ease infinite;
    }

    .loading-subtitle {
      font-family: 'Urbanist', sans-serif;
      font-size: 1.2rem;
      font-weight: 300;
      color: var(--text-secondary);
      margin-bottom: var(--spacing-xl);
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .progress-container {
      width: 200px;
      height: 4px;
      background: var(--bg-tertiary);
      border-radius: var(--border-radius-full);
      overflow: hidden;
    }

    .progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #CCFF00 0%, #FFD600 40%, #FF44CC 80%, #FF6EC7 100%);
      border-radius: var(--border-radius-full);
      transition: width 0.3s ease;
      animation: progress-glow 2s ease-in-out infinite;
    }

    /* Main Interface */
    .main-interface {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.5s ease-out;
    }

    .main-interface.loaded {
      opacity: 1;
      transform: translateY(0);
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    /* Animations */
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes holographic {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }

    @keyframes progress-glow {
      0%, 100% { box-shadow: 0 0 10px var(--acid-green); }
      50% { box-shadow: 0 0 20px var(--acid-green), 0 0 30px var(--hyper-magenta); }
    }

    @keyframes gradientShift {
      0%, 100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
  `]
})
export class AppComponent implements OnInit {
  isLoading = true;
  loadingProgress = 0;

  ngOnInit() {
    // Initialize theme
    this.initializeTheme();
    
    // Simulate loading
    this.simulateLoading();
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
  }

  private simulateLoading() {
    const interval = setInterval(() => {
      this.loadingProgress += Math.random() * 15;
      if (this.loadingProgress >= 100) {
        this.loadingProgress = 100;
        clearInterval(interval);
        
        setTimeout(() => {
          this.isLoading = false;
        }, 500);
      }
    }, 200);
  }
} 