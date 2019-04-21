// import png1 from './type.png';
// const png1Src: string = png1

const num: number = 120;
const str: string = 'test';
const isTrue: boolean = true;
const empty: undefined = void 0;
const nil: null = null;
const symbol: symbol = Symbol();
// when complile target is larger than es5,
const bigInt: bigint = 120n;

enum HttpMethod {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  patch = 'PATCH',
  delete = 'DELETE'
}

// Type assertions
const arr: any = [1, 2, 3];
// const len: number = arr.length;
const len: number = (<number[]>arr).length;
const len2: number = (arr as number[]).length;

function test(str?: string) {
  return str!.length;
}

interface IKeyValue {
  key: string;
  value: string;
}

interface IKeyValueExt extends IKeyValue {
  canNull?: number;
  // index signatures
  [prop: string]: any;
}

const keyValueExtObject: IKeyValueExt = {
  key: 'test',
  value: 'test'
};

for (const prop in keyValueExtObject) {
  keyValueExtObject[prop] = 'test';
}

interface IPageResult<T> {
  result: T[];
  count: number;
}

const result: IPageResult<IKeyValue> = {
  result: [],
  count: 10000
};

interface IPageResultExt<T, P> {
  result: T[];
  ext: P;
  count: number;
}

const result2: IPageResultExt<IKeyValue, object> = {
  result: [],
  ext: {},
  count: 10000
};

class KeyValueClass implements IKeyValue {
  public key: string;
  public value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
}

function overload(arg1: boolean): number;
function overload(arg1: string): string;
function overload(arg1: string, arg2: string): object;
function overload(arg1: any, arg2?: any): any {
  if (typeof arg1 === 'boolean') {
    if (arg1) {
      return 1;
    }
    return 0;
  }
  if (arg2) {
    return { [arg1]: arg2 };
  }
  return arg1;
}
