export interface IBuildBrand {
  id?: number;
  name: string;
}

export class Brand {
  static tableName = 'Brand';

  id: number;
  name: string;

  static build(data: IBuildBrand): Brand {
    const result = new Brand();
    if (data.id != null) {
      result.id = data.id;
    }
    result.name = data.name;
    return result;
  }

}
