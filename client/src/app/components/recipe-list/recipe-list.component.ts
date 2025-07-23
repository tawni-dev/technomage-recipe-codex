import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { LoadMoreComponent } from '../load-more/load-more.component';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RecipeCardComponent, LoadMoreComponent],
  template: `
    <div class="container">
      <div class="recipe-container">
        <div class="content-section">
          <!-- Search section moved inside container -->
          <div class="search-section">
            <div class="search-container">
              <div class="search-row">
                <div class="search-input-wrapper">
                  <input 
                    type="text" 
                    placeholder="Search recipes or tags..." 
                    [(ngModel)]="searchTerm"
                    (input)="filterRecipes()"
                    class="search-input"
                  >
                </div>
                <select 
                  [(ngModel)]="sortBy"
                  (change)="filterRecipes()"
                  class="sort-select"
                >
                  <option value="title">A-Z</option>
                  <option value="time">Time</option>
                  <option value="calories">Calories</option>
                </select>
              </div>
              
              <div class="tag-filters">
                <div class="tag-filters-row">
                  <button 
                    *ngFor="let tag of visibleTags" 
                    class="tag-filter"
                    [class.active]="selectedTags.includes(tag)"
                    (click)="toggleTag(tag)"
                  >
                    {{ tag }}
                  </button>
                </div>
                <button 
                  *ngIf="allTags.length > 5"
                  class="see-all-btn"
                  (click)="toggleShowAllTags()"
                >
                  {{ showAllTags ? 'Show Less' : 'See All Tags' }}
                </button>
              </div>
            </div>
          </div>
          
          <div class="no-results" *ngIf="filteredRecipes.length === 0 && (searchTerm || selectedTags.length > 0)">
            <div class="no-results-content">
              <p class="no-results-text">No recipes found matching your criteria.</p>
              <button class="btn btn-primary" (click)="clearFilters()">Clear Filters</button>
            </div>
          </div>
          
          <div class="slider-container">
            <div class="slider-track" [style.transform]="'translateX(' + slideOffset + 'px)'">
              <div 
                class="recipe-card-wrapper"
                *ngFor="let recipe of displayedRecipes; trackBy: trackByRecipe; let i = index"
                [class.center-card]="i === centerCardIndex"
              >
                <app-recipe-card
                  [recipe]="recipe"
                  (print)="printRecipe($event)"
                  (share)="shareRecipe($event)"
                ></app-recipe-card>
              </div>
            </div>
            
            <div class="slider-controls">
              <button 
                class="slider-btn prev-btn" 
                (click)="slideLeft()"
                [disabled]="currentSlide === 0"
              >
                ‹
              </button>
              <div class="slide-indicators">
                <span 
                  *ngFor="let indicator of slideIndicators; let i = index"
                  class="indicator"
                  [class.active]="i === currentSlide"
                  (click)="goToSlide(i)"
                ></span>
              </div>
              <button 
                class="slider-btn next-btn" 
                (click)="slideRight()"
                [disabled]="currentSlide >= maxSlides"
              >
                ›
              </button>
            </div>
          </div>

          <app-load-more 
            *ngIf="hasMoreRecipes"
            [currentCount]="displayedRecipes.length"
            [totalCount]="filteredRecipes.length"
            [loading]="loadingMore"
            (loadMore)="loadMoreRecipes()"
          ></app-load-more>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 var(--spacing-md);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .recipe-container {
      background: var(--bg-elevated);
      border: 1px solid var(--border-primary);
      padding: var(--spacing-xl);
      margin: var(--spacing-xl) 0;
      box-shadow: var(--shadow-light);
      position: relative;
      overflow: hidden;
      max-height: 90vh;
      overflow-y: auto;
    }

    .content-section {
      min-height: 400px;
    }

    /* Search section moved inside container */
    .search-section {
      margin-bottom: var(--spacing-lg);
      border-bottom: 1px solid var(--border-secondary);
      padding-bottom: var(--spacing-lg);
    }

    .search-container {
      background: var(--bg-surface);
      border: 1px solid var(--border-secondary);
      padding: var(--spacing-lg);
      box-shadow: var(--shadow-light);
    }

    .search-row {
      display: flex;
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-lg);
      align-items: center;
    }

    .search-input-wrapper {
      flex: 1;
    }

    .search-input {
      width: 100%;
      background: var(--bg-primary);
      color: var(--text-primary);
      border: 1px solid var(--border-secondary);
      padding: var(--spacing-md);
      font-family: 'Archivo', sans-serif;
      font-size: 1rem;
      outline: none;
      transition: all var(--transition-fast);
    }

    .search-input:focus {
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 2px var(--shadow-glow);
    }

    .sort-select {
      background: var(--bg-primary);
      color: var(--text-primary);
      border: 1px solid var(--border-secondary);
      padding: var(--spacing-md);
      font-family: 'Archivo', sans-serif;
      font-size: 1rem;
      cursor: pointer;
      outline: none;
      transition: all var(--transition-fast);
      min-width: 120px;
    }

    .sort-select:focus {
      border-color: var(--accent-primary);
      box-shadow: 0 0 0 2px var(--shadow-glow);
    }

    .tag-filters {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-sm);
    }

    .tag-filters-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-sm);
      margin-bottom: var(--spacing-sm);
    }

    .tag-filter {
      background: var(--bg-primary);
      color: var(--text-primary);
      border: 1px solid var(--border-secondary);
      padding: var(--spacing-xs) var(--spacing-md);
      font-family: 'Archivo', sans-serif;
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      transition: all var(--transition-fast);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .tag-filter:hover {
      background: var(--chartreuse);
      border-color: var(--chartreuse);
      color: var(--black);
    }

    .tag-filter.active {
      background: var(--accent-bg);
      color: var(--accent-primary);
      border-color: var(--accent-border);
      box-shadow: var(--shadow-glow);
    }

    .see-all-btn {
      background: var(--bg-primary);
      color: var(--text-primary);
      border: 1px solid var(--border-secondary);
      padding: var(--spacing-xs) var(--spacing-md);
      font-family: 'Archivo', sans-serif;
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      transition: all var(--transition-fast);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .see-all-btn:hover {
      background: var(--surface-hover);
      border-color: var(--accent-primary);
      color: var(--accent-primary);
    }

    .no-results {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;
    }

    .no-results-content {
      text-align: center;
    }

    .no-results-text {
      font-family: 'Archivo', sans-serif;
      font-size: 1.125rem;
      color: var(--text-secondary);
      margin-bottom: var(--spacing-lg);
    }

    /* Slider Styles */
    .slider-container {
      position: relative;
      overflow: hidden;
      margin: var(--spacing-lg) 0;
    }

    .slider-track {
      display: flex;
      gap: var(--spacing-lg);
      transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      padding: var(--spacing-lg) 0;
    }

    .recipe-card-wrapper {
      flex: 0 0 320px;
      height: 450px;
      transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      width: 320px;
      min-width: 320px;
      max-width: 320px;
      min-height: 450px;
      max-height: 450px;
    }

    .recipe-card-wrapper.center-card {
      opacity: 1;
    }

    .slider-controls {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--spacing-lg);
      margin-top: var(--spacing-xl);
    }

    .slider-btn {
      background: var(--bg-surface);
      color: var(--text-primary);
      border: 1px solid var(--border-secondary);
      width: 48px;
      height: 48px;
      font-size: 1.5rem;
      font-weight: bold;
      cursor: pointer;
      transition: all var(--transition-fast);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .slider-btn:hover:not(:disabled) {
      background: var(--surface-hover);
      border-color: var(--accent-primary);
      color: var(--accent-primary);
    }

    .slider-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .slide-indicators {
      display: flex;
      gap: var(--spacing-sm);
    }

    .indicator {
      width: 12px;
      height: 12px;
      background: var(--border-secondary);
      cursor: pointer;
      transition: all var(--transition-fast);
    }

    .indicator:hover {
      background: var(--text-muted);
    }

    .indicator.active {
      background: var(--accent-primary);
      box-shadow: var(--shadow-glow);
    }

    @media (max-width: 768px) {
      .container {
        padding: var(--spacing-sm) var(--spacing-sm);
        min-height: auto;
        justify-content: flex-start;
      }
      
      .recipe-container {
        padding: var(--spacing-lg);
        margin: var(--spacing-sm) 0;
        max-height: none;
      }
      
      .search-container {
        padding: var(--spacing-md);
      }
      
      .search-row {
        flex-direction: row;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-md);
        align-items: center;
      }

      .search-input-wrapper {
        flex: 1;
      }

      .search-input {
        font-size: 0.875rem;
        padding: var(--spacing-sm);
      }

      .sort-select {
        font-size: 0.875rem;
        padding: var(--spacing-sm);
        min-width: 80px;
        flex-shrink: 0;
      }
      
      .tag-filters {
        gap: var(--spacing-xs);
        max-height: 120px;
        overflow-y: auto;
        padding: var(--spacing-xs);
        border: 1px solid var(--border-secondary);
        border-radius: 4px;
      }

      .tag-filters-row {
        flex-direction: row;
        gap: var(--spacing-xs);
        margin-bottom: var(--spacing-xs);
      }

      .tag-filter {
        font-size: 0.625rem;
        padding: var(--spacing-xs) var(--spacing-sm);
        flex: 0 0 auto;
      }
      
      .slider-container {
        padding-bottom: 1rem;
        margin: var(--spacing-md) 0;
      }

      .slider-track {
        gap: var(--spacing-md);
        padding: var(--spacing-md);
      }
      
      .recipe-card-wrapper {
        flex: 0 0 300px;
        width: 300px;
        height: 420px;
      }
    }
  `]
})
export class RecipeListComponent implements OnInit {
  
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  displayedRecipes: Recipe[] = [];
  allTags: string[] = [];
  selectedTags: string[] = [];
  searchTerm = '';
  sortBy = 'title';
  
  // Pagination
  itemsPerPage = 12; // Increased to ensure horizontal overflow
  currentPage = 1;
  loadingMore = false;

  // Slider state
  currentSlide = 0;
  slideOffset = 0;
  centerCardIndex = 2; // Center card in 4x2 grid
  maxSlides = 0;

  // Tag filtering state
  visibleTags: string[] = [];
  showAllTags = false;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.loadRecipes();
  }

  get hasMoreRecipes(): boolean {
    return this.displayedRecipes.length < this.filteredRecipes.length;
  }

  get slideIndicators(): number[] {
    return Array.from({ length: this.maxSlides + 1 }, (_, i) => i);
  }

  loadRecipes() {
    this.recipeService.getRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
        this.extractAllTags();
        this.filterRecipes();
      },
      error: (error) => {
        console.error('Error loading recipes:', error);
        this.loadLocalRecipes();
      }
    });
  }

  loadLocalRecipes() {
    this.recipes = [
      {
        id: "oat-green-roti",
        title: "OAT-BASED GREEN ROTI",
        calories: "~180 per roti",
        makes: "4-6 rotis",
        time: "25 minutes",
        tags: ["bread", "vegetarian", "gluten-free", "anti-inflammatory", "greens", "quick-meal"],
        ingredients: [
          { icon: "🥬", item: "1 cup super greens or spinach" },
          { icon: "🌿", item: "1/4 cup fresh cilantro" },
          { icon: "🧄", item: "1 clove garlic" },
          { icon: "🥣", item: "3/4 cup rolled oats" },
          { icon: "💧", item: "1/4 - 1/2 cup water" },
          { icon: "🌶️", item: "1/2 tsp cumin" }
        ],
        storage: [
          { icon: "❄️", item: "Fridge: 3-4 days in parchment, reheat in pan" },
          { icon: "🧊", item: "Freezer: Up to 1 month" }
        ],
        instructions: [
          { step: 1, instruction: "Blend greens: Add spinach, cilantro, garlic, and 1/4 cup water to blender. Blend until smooth green paste forms." },
          { step: 2, instruction: "Grind oats: In food processor, pulse oats until they form fine flour consistency." },
          { step: 3, instruction: "Make dough: Mix oat flour, green paste, and cumin. Add water gradually until soft, pliable dough forms." },
          { step: 4, instruction: "Rest: Let dough rest 10 minutes covered with damp cloth." },
          { step: 5, instruction: "Roll & cook: Divide into 4-6 balls. Roll thin, cook in hot pan 1-2 minutes per side until spotted." }
        ]
      },
      {
        id: "creamy-chicken-soup",
        title: "CREAMY CHICKEN SOUP",
        calories: "~250 per cup",
        makes: "3 cups (3 servings)",
        time: "20 minutes",
        tags: ["soup", "chicken", "protein", "anti-inflammatory", "freezer-friendly", "quick-meal"],
        ingredients: [
          { icon: "🫒", item: "1 tbsp olive oil" },
          { icon: "��", item: "1/2 large onion, diced" },
          { icon: "🥕", item: "1 carrot, diced" },
          { icon: "🥬", item: "1 celery stalk, diced" },
          { icon: "🧄", item: "2 cloves garlic, minced" },
          { icon: "🍲", item: "3 cups chicken broth" },
          { icon: "🍗", item: "1 cup rotisserie chicken, shredded" },
          { icon: "🥛", item: "1/2 cup Fairlife milk" },
          { icon: "🧈", item: "1 tbsp light cream cheese" },
          { icon: "🌶️", item: "1/2 tsp turmeric" },
          { icon: "🥬", item: "1 cup fresh spinach" }
        ],
        tips: [
          { icon: "❄️", item: "Freezes perfectly! Portion in mason jars, leave 1\" headspace" },
          { icon: "🔥", item: "Reheat tip: Microwave from frozen or thaw overnight" },
          { icon: "💡", item: "Beginner tip: Don't let garlic burn - just 30 seconds!" }
        ],
        instructions: [
          { step: 1, instruction: "Heat oil: In large pot, heat olive oil over medium heat for 1 minute." },
          { step: 2, instruction: "Cook vegetables: Add onion, carrots, celery. Cook 5-7 minutes until onion looks clear." },
          { step: 3, instruction: "Add garlic: Add minced garlic, cook 30 seconds until fragrant (don't burn!)." },
          { step: 4, instruction: "Add broth & chicken: Pour in broth, bring to boil. Add chicken and seasonings." },
          { step: 5, instruction: "Make creamy: Whisk milk with cream cheese, slowly stir into soup." },
          { step: 6, instruction: "Add greens: Stir in spinach, cook 2 minutes until wilted. Taste and adjust seasoning." }
        ]
      },
      {
        id: "white-chicken-chili",
        title: "WHITE CHICKEN CHILI",
        calories: "~290 per cup",
        makes: "3 cups (3 servings)",
        time: "20 minutes",
        tags: ["chili", "chicken", "protein", "beans", "freezer-friendly", "quick-meal"],
        ingredients: [
          { icon: "🫒", item: "1 tbsp olive oil" },
          { icon: "🧅", item: "1/2 large onion, diced" },
          { icon: "🧄", item: "1 clove garlic, minced" },
          { icon: "🌶️", item: "1/2 can (2 oz) diced green chiles" },
          { icon: "🫘", item: "1 can (15 oz) white beans, drained" },
          { icon: "🍲", item: "1.5 cups chicken broth" },
          { icon: "🍗", item: "1 cup rotisserie chicken, shredded" },
          { icon: "🧈", item: "1/2 tbsp light cream cheese" },
          { icon: "🥛", item: "1/4 cup Fairlife milk" },
          { icon: "🥛", item: "Greek yogurt for serving" }
        ],
        tips: [
          { icon: "🌶️", item: "Spices: 1/2 tsp cumin, 1/2 tsp oregano, 1/4 tsp chili powder" },
          { icon: "❄️", item: "Freezes perfectly! Cool completely before freezing" },
          { icon: "💡", item: "Serving tip: Add fresh Greek yogurt when reheating" }
        ],
        instructions: [
          { step: 1, instruction: "Heat & sauté: Heat oil, cook onion 5 minutes until clear and soft." },
          { step: 2, instruction: "Add aromatics: Add garlic (30 seconds), then chiles and spices (1 minute)." },
          { step: 3, instruction: "Add beans & broth: Add white beans and broth, bring to boil." },
          { step: 4, instruction: "Simmer with chicken: Add chicken, reduce heat, simmer 15 minutes." },
          { step: 5, instruction: "Make creamy: Whisk cream cheese with milk, stir into chili." },
          { step: 6, instruction: "Serve: Season to taste, top with Greek yogurt instead of sour cream!" }
        ]
      },
      {
        id: "cranberry-salsa",
        title: "CRANBERRY SALSA",
        calories: "~35 per 1/4 cup",
        makes: "2 cups (8 servings)",
        time: "15 minutes",
        tags: ["salsa", "cranberry", "vegetarian", "vegan", "signature", "quick-meal"],
        signature: "TECHNOMAGE SIGNATURE!",
        ingredients: [
          { icon: "🔴", item: "1 cup fresh cranberries" },
          { icon: "🫑", item: "1/2 red bell pepper, finely diced" },
          { icon: "🧅", item: "1/4 red onion, finely diced" },
          { icon: "🌶️", item: "1/2 jalapeño, seeded & minced (optional)" },
          { icon: "🌿", item: "2 tbsp fresh cilantro, chopped" },
          { icon: "🍋", item: "Juice of 1/2 lime" },
          { icon: "🍯", item: "1 tbsp honey or maple syrup" },
          { icon: "🌶️", item: "1/4 tsp chili powder" }
        ],
        tips: [
          { icon: "🍗", item: "Perfect with: Rotisserie chicken, crackers, or as yogurt mix-in" },
          { icon: "❄️", item: "Storage: Keeps 1 week in fridge - flavors get better!" },
          { icon: "🧊", item: "Freeze tip: Freeze in ice cube trays for portion control" }
        ],
        instructions: [
          { step: 1, instruction: "Prep cranberries: Roughly chop fresh cranberries (or pulse in food processor 3-4 times)." },
          { step: 2, instruction: "Dice vegetables: Finely dice bell pepper and onion into small, uniform pieces." },
          { step: 3, instruction: "Prep jalapeño: Cut in half, remove seeds with spoon, mince finely (wash hands after!)." },
          { step: 4, instruction: "Make dressing: In small bowl, whisk lime juice, honey, chili powder, and salt." },
          { step: 5, instruction: "Combine: Mix all ingredients, pour dressing over, stir well." },
          { step: 6, instruction: "Let flavors meld: Rest 15 minutes before serving for best flavor!" }
        ]
      },
      {
        id: "harlow-house-salad",
        title: "HARLOW HOUSE SALAD",
        calories: "~320 per serving",
        makes: "1 generous portion",
        time: "15 minutes",
        tags: ["salad", "vegetarian", "protein", "anti-inflammatory", "beets", "quick-meal"],
        ingredients: [
          { icon: "🥬", item: "4 cups mixed organic salad greens" },
          { icon: "🔴", item: "1 large roasted beet, spiralized" },
          { icon: "🥕", item: "1 large carrot, spiralized" },
          { icon: "🌻", item: "2 tbsp sunflower seeds" },
          { icon: "🌱", item: "1 tbsp hemp seeds" },
          { icon: "🍗", item: "3 oz rotisserie chicken" }
        ],
        dressing: [
          { icon: "🍋", item: "3 tbsp fresh lemon juice" },
          { icon: "🫚", item: "1 tbsp fresh ginger, grated" },
          { icon: "🫒", item: "2 tbsp olive oil" },
          { icon: "🍯", item: "1 tsp maple syrup or agave" },
          { icon: "🧂", item: "1/4 tsp sea salt + pinch black pepper" }
        ],
        instructions: [
          { step: 1, instruction: "Prep beets: Roast whole beets at 400°F for 45 minutes until tender. Cool, peel, spiralize." },
          { step: 2, instruction: "Make dressing: Whisk all dressing ingredients together in small bowl." },
          { step: 3, instruction: "Spiralize carrot: Use spiralizer or vegetable peeler to create ribbon strips." },
          { step: 4, instruction: "Arrange beautifully: Place greens in bowl, arrange beet and carrot spirals in alternating rings." },
          { step: 5, instruction: "Finish & serve: Sprinkle seeds in center, add chicken, drizzle dressing just before eating." }
        ]
      },
      {
        id: "super-greens-lemonade",
        title: "SUPER GREENS LEMONADE",
        calories: "~45 per 16oz",
        makes: "1 large serving",
        time: "5 minutes",
        tags: ["drink", "greens", "detox", "vegan", "quick-meal", "post-workout"],
        ingredients: [
          { icon: "🥬", item: "1 cup fresh spinach" },
          { icon: "🥬", item: "1/2 cup kale, stems removed" },
          { icon: "🥒", item: "1/2 cucumber, peeled" },
          { icon: "🍋", item: "Juice of 2 lemons" },
          { icon: "🍯", item: "1-2 tbsp raw honey (or stevia)" },
          { icon: "🌱", item: "1/4 tsp chlorella powder" },
          { icon: "💧", item: "1 cup cold water + ice" },
          { icon: "🥤", item: "Sparkling water (optional for fizz)" }
        ],
        tips: [
          { icon: "🧊", item: "Freeze hack: Freeze in ice cube trays for instant green boost" },
          { icon: "🥤", item: "Kombucha mix: Add to your favorite kombucha for probiotic power" },
          { icon: "💪", item: "Post-workout: Perfect for after Chloe Ting workouts" }
        ],
        instructions: [
          { step: 1, instruction: "Blend greens: Add spinach, kale, cucumber, and water to blender. Blend until smooth." },
          { step: 2, instruction: "Strain (optional): Pour through fine mesh strainer for ultra-smooth texture." },
          { step: 3, instruction: "Add flavor: Stir in lemon juice, honey, and chlorella powder until dissolved." },
          { step: 4, instruction: "Serve fresh: Pour over ice, top with sparkling water for fizzy version." },
          { step: 5, instruction: "Storage: Keeps 2 days in fridge - stir before drinking!" }
        ]
      },
      {
        id: "frozen-fruit-snacks",
        title: "FROZEN FRUIT SNACK COLLECTION",
        calories: "45-60 per cup",
        makes: "3 cups",
        time: "10 min + freeze",
        tags: ["snack", "frozen", "fruit", "sweet", "low-calorie", "vegan"],
        ingredients: [
          { icon: "🍇", item: "2 cups grapes (any color)" },
          { icon: "🔴", item: "1 cup fresh cranberries" }
        ],
        coatings: [
          { icon: "🌶️", item: "Mexican Lime Chili: Lime juice + chili powder" },
          { icon: "🍋", item: "Lemon Drop: Lemon juice + stevia + cinnamon" },
          { icon: "🍊", item: "Orange Zest: Orange zest + stevia" },
          { icon: "🫚", item: "Ginger Lime: Ginger powder + lime juice" },
          { icon: "🍯", item: "Vanilla Dreams: Vanilla extract + monk fruit" }
        ],
        instructions: [
          { step: 1, instruction: "Prep fruit: Wash and dry grapes and cranberries completely (wet fruit won't coat well)." },
          { step: 2, instruction: "Choose coating: Pick your mood - sweet, spicy, or tart. Mix coating ingredients in small bowl." },
          { step: 3, instruction: "Coat fruit: Toss fruit with coating mixture until evenly covered." },
          { step: 4, instruction: "Freeze single layer: Spread on parchment-lined baking sheet, freeze 2-3 hours." },
          { step: 5, instruction: "Store & enjoy: Transfer to freezer bags. Grab whenever you need a sweet fix!" }
        ]
      },
      {
        id: "cranberry-chili-cubes",
        title: "CRANBERRY CHILI \"CANDY\" CUBES",
        calories: "~25 per cube",
        makes: "12-15 cubes",
        time: "5 min + freeze",
        tags: ["snack", "frozen", "sweet", "spicy", "low-calorie", "pre-workout"],
        signature: "TECHNOMAGE SIGNATURE!",
        ingredients: [
          { icon: "🔴", item: "1/2 cup cranberry sauce" },
          { icon: "🌶️", item: "1/2 tsp chili powder" },
          { icon: "🍋", item: "1 tsp lime juice (optional)" },
          { icon: "🧊", item: "Ice cube trays" }
        ],
        tips: [
          { icon: "🍭", item: "Sweet cravings: Satisfies dessert urges with minimal calories" },
          { icon: "🌶️", item: "Spicy-sweet mood: Unique flavor combination hits all taste buds" },
          { icon: "🏃‍♀️", item: "Pre-workout: Natural energy boost without sugar crash" }
        ],
        instructions: [
          { step: 1, instruction: "Mix ingredients: In small bowl, stir cranberry sauce, chili powder, and lime juice until combined." },
          { step: 2, instruction: "Fill trays: Spoon mixture into ice cube trays, filling each compartment about 3/4 full." },
          { step: 3, instruction: "Freeze solid: Freeze for at least 3 hours or overnight until completely solid." },
          { step: 4, instruction: "Pop & store: Remove from trays, store in freezer bags for up to 3 months." },
          { step: 5, instruction: "Enjoy: Pop one cube when you need a sweet-spicy treat!" }
        ]
      }
    ];
    this.extractAllTags();
    this.filterRecipes();
  }

  extractAllTags() {
    const tagSet = new Set<string>();
    this.recipes.forEach(recipe => {
      recipe.tags.forEach(tag => tagSet.add(tag));
    });
    this.allTags = Array.from(tagSet).sort();
    this.visibleTags = this.allTags.slice(0, 5); // Show first 5 tags by default
  }

  filterRecipes() {
    let filtered = [...this.recipes];

    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(recipe => 
        recipe.title.toLowerCase().includes(searchLower) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        recipe.ingredients.some(ing => ing.item.toLowerCase().includes(searchLower))
      );
    }

    if (this.selectedTags.length > 0) {
      filtered = filtered.filter(recipe =>
        this.selectedTags.every(tag => recipe.tags.includes(tag))
      );
    }

    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'time':
          return this.extractTime(a.time).localeCompare(this.extractTime(b.time));
        case 'calories':
          return this.extractCalories(a.calories).localeCompare(this.extractCalories(b.calories));
        default:
          return 0;
      }
    });

    this.filteredRecipes = filtered;
    this.resetPagination();
    this.updateSliderState();
  }

  resetPagination() {
    this.currentPage = 1;
    this.updateDisplayedRecipes();
  }

  updateDisplayedRecipes() {
    const endIndex = this.currentPage * this.itemsPerPage;
    this.displayedRecipes = this.filteredRecipes.slice(0, endIndex);
    this.updateSliderState();
  }

  updateSliderState() {
    this.maxSlides = Math.max(0, Math.ceil(this.displayedRecipes.length / 4) - 1);
    this.currentSlide = 0;
    this.updateSlideOffset();
  }

  updateSlideOffset() {
    const cardWidth = window.innerWidth <= 768 ? 300 + 16 : 320 + 24; // card width + gap
    this.slideOffset = -this.currentSlide * cardWidth * 4; // 4 cards per slide
  }

  slideLeft() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
      this.updateSlideOffset();
    }
  }

  slideRight() {
    if (this.currentSlide < this.maxSlides) {
      this.currentSlide++;
      this.updateSlideOffset();
    }
  }

  goToSlide(slideIndex: number) {
    this.currentSlide = slideIndex;
    this.updateSlideOffset();
  }

  loadMoreRecipes() {
    this.loadingMore = true;
    
    // Simulate loading delay
    setTimeout(() => {
      this.currentPage++;
      this.updateDisplayedRecipes();
      this.loadingMore = false;
    }, 800);
  }

  toggleTag(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index > -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.filterRecipes();
  }

  toggleShowAllTags() {
    this.showAllTags = !this.showAllTags;
    this.visibleTags = this.showAllTags ? this.allTags : this.allTags.slice(0, 5);
    this.filterRecipes();
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedTags = [];
    this.sortBy = 'title';
    this.filterRecipes();
  }

  printRecipe(recipe: Recipe) {
    const printWindow = window.open('', '', 'width=600,height=800');
    if (printWindow) {
      const content = this.formatRecipeForPrint(recipe);
      printWindow.document.write(`
        <html>
          <head>
            <title>${recipe.title}</title>
            <style>
              body { font-family: 'Archivo', sans-serif; font-size: 1rem; line-height: 1.6; }
            </style>
          </head>
          <body>
            <pre>${content}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  }

  shareRecipe(recipe: Recipe) {
    const shareData = {
      title: recipe.title,
      text: this.formatRecipeForPrint(recipe),
      url: window.location.href // Or a specific URL for this recipe
    };

    if (navigator.share) {
      navigator.share(shareData).then(() => {
        console.log('Recipe shared successfully');
      }).catch((error) => {
        console.error('Error sharing recipe:', error);
      });
    } else {
      alert('Web Share API not supported in your browser.');
    }
  }

  trackByRecipe(index: number, recipe: Recipe): string {
    return recipe.id;
  }

  private extractTime(timeStr?: string): string {
    if (!timeStr) return '0';
    const match = timeStr.match(/(\d+)/);
    return match ? match[1] : '0';
  }

  private extractCalories(caloriesStr?: string): string {
    if (!caloriesStr) return '0';
    const match = caloriesStr.match(/(\d+)/);
    return match ? match[1] : '0';
  }

  private formatRecipeForPrint(recipe: Recipe): string {
    const lines = [
      recipe.title,
      `${recipe.calories || ''} ${recipe.makes ? ' | ' + recipe.makes : ''} ${recipe.time ? ' | ' + recipe.time : ''}`,
      '',
      `Tags: ${recipe.tags.join(', ')}`,
      '',
      'Ingredients:',
      ...recipe.ingredients.map(ing => `- ${ing.icon ? ing.icon + ' ' : ''}${ing.item}`),
      '',
      'Instructions:',
      ...recipe.instructions.map((step, i) => `${i+1}. ${step.instruction}`)
    ];
    return lines.join('\n');
  }
} 