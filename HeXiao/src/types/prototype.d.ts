interface String {
  _toDate(): string;
  _addUnit(this: number | string, unit: string): string;
  getStringFnProperty(): string;
  stringFnPropertyToRaw(): string;
}

interface Number {
  _addUnit(this: number | string, unit: string): string;
}

interface Array<T> {
  distinctArray(compareFn?: Function): any[];
  sum(): number;
}
