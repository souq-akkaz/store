export interface IBuildCategory {
  id?: number;
  name: string;
}
export class Category {
  id: number;
  name: string;

  static tableName = 'Category';
  static build(data: IBuildCategory): Category {
    const result = new Category();
    if (data.id != null) {
      result.id = data.id;
    }
    result.name = data.name;
    return result;
  } 
}
