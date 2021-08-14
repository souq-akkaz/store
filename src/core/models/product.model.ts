import { Brand, Category } from '../../product/models';

export interface IBuildProduct {
  id?: number;
  name: string;
  price: number;
  brandId?: number;
  categoryId?: number;

  brand?: Brand;
  category?: Category;
}
export class Product {
  
  id: number;
  name: string;
  brandId: number;
  categoryId: number;
  price: number;
  
  brand?: Brand;
  category?: Category;
  
  static tableName = 'Product';
  static build(data: IBuildProduct): Product {
    const result = new Product();
    if (data.id != null) {
      result.id = data.id;
    }
    result.name = data.name;
    result.price = data.price;
    result.brandId = data.brandId || null;
    result.categoryId = data.categoryId || null;
    if (data.brand) {
      result.brand = data.brand;
    }
    if (data.category) {
      result.category = data.category;
    }
    return result;
  }
}
