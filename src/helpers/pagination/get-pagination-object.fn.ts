import _ from 'lodash';

interface IPagination {
  pageSize: number;
  pageIndex: number;
}

export const PAGE_INDEX = 0;
export const PAGE_SIZE = 20;

const getPaginationObject = (obj: { [key: string]: any }): IPagination => {
  return ({
    pageSize: _.isString(obj.pageSize) && _.isNumber(+obj.pageSize) ? +obj.pageSize : PAGE_SIZE, 
    pageIndex: _.isString(obj.pageIndex) && _.isNumber(+obj.pageIndex) ? +obj.pageIndex : PAGE_INDEX, 
  });
};

export default getPaginationObject;
