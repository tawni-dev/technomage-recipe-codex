export interface Ingredient {
  icon?: string;
  item: string;
  badge?: string;
}

export interface Instruction {
  step: number;
  instruction: string;
}

export interface Tip {
  icon?: string;
  item: string;
}

export interface Storage {
  icon?: string;
  item: string;
}

export interface Dressing {
  icon?: string;
  item: string;
  badge?: string;
}

export interface Coating {
  icon?: string;
  item: string;
}

export interface Recipe {
  id: string;
  title: string;
  calories?: string;
  makes?: string;
  time?: string;
  tags: string[];
  ingredients: Ingredient[];
  instructions: Instruction[];
  tips?: Tip[];
  storage?: Storage[];
  dressing?: Dressing[];
  coatings?: Coating[];
  signature?: string;
} 