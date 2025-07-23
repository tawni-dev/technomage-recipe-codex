import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-text">
          <p class="footer-tagline">CYBERPUNK NUTRITION PROTOCOLS FOR HUMAN OPTIMIZATION</p>
          <p class="footer-subtitle">⚡ Ghost-in-the-shell aesthetic meets transformation cooking</p>
        </div>
        <div class="footer-copyright">
          <p>&copy; {{ currentYear }} TECHNOMAGE RECIPE CODEX</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--bg-secondary);
      border-top: 1px solid var(--border-primary);
      padding: var(--spacing-2xl) 0 var(--spacing-xl) 0;
      margin-top: var(--spacing-2xl);
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing-md);
      text-align: center;
    }

    .footer-text {
      margin-bottom: var(--spacing-lg);
    }

    .footer-tagline {
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      font-size: 1rem;
      color: var(--text-primary);
      margin: 0 0 var(--spacing-sm) 0;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .footer-subtitle {
      font-family: 'Inter', sans-serif;
      font-weight: 400;
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin: 0;
    }

    .footer-copyright {
      border-top: 1px solid var(--border-primary);
      padding-top: var(--spacing-lg);
    }

    .footer-copyright p {
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      font-size: 0.875rem;
      color: var(--text-muted);
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    @media (max-width: 768px) {
      .footer {
        padding: var(--spacing-xl) 0 var(--spacing-lg) 0;
      }
      
      .footer-tagline {
        font-size: 0.875rem;
      }
      
      .footer-subtitle {
        font-size: 0.75rem;
      }
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
} 