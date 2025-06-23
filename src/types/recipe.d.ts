
export interface Recipe {
  id: string;
  name: string;
  image: string;
  description: string;
  cookingTime: string;
  ingredients?: string[];
  steps?: string[];
}