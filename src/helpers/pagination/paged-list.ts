interface IBuildPagedList<T> {
  collection: T[];
  pageSize: number;
  pageIndex: number;
  totalCount: number;
}

export class PagedList<T> {
  collection: T[];
  pageSize: number;
  pageIndex: number;
  totalCount: number;

  static build<T>(data: IBuildPagedList<T>): PagedList<T> {
    const result = new PagedList<T>();
    result.collection = data.collection;
    result.pageIndex = data.pageIndex;
    result.pageSize = data.pageSize;
    result.totalCount = data.totalCount;
    return result;
  }
}
