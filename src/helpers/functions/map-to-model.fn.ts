import { map } from 'ramda';

export interface IModelMapper<T> {
  toModel(): T;
}
/** function to run `toModel` method on an object implements `IModelMapper<T>` interface, toModel function must not accept any paramteres. */
export const toModel = <T>(x: IModelMapper<T>): T => {
  return x.toModel();
};

export const mapToModel = <T>(list: IModelMapper<T>[]): T[] => map<IModelMapper<T>, T>(toModel)(list);
