
export interface Recipe {
  id: string;
  name: string;
  description: string;
  cooking_time: string;
  ingredients?: string[];
  image?: string;
  steps?: string[];
}