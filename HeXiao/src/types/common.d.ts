
// 包裹类型成为对象
type WrapObject<T> = {
  [key: string]: T;
}

// 普通对象
// type AnyObject = WrapObject<any>;


// 树形
type TreeObject<T> = T & {
  children?: TreeObject<T>[];
}

type PageData<T> = {
  data: T;
  total: number;
}

type WrapData<T> = {
  data: T;
}
