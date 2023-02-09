import { Category } from "./category";
import { Image } from "./image";
import { Variant } from "./variant";

export type Product = {
  id: number;
  name: string;
  slug: string;
  price: string;
  description: string;
  status: string;
  quantity: number;
  collection: string;
  videoUrlLink: string;
  category: Category;
  variants: Variant[];
  productImage: Image;
};
