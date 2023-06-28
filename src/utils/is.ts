const opt = Object.prototype.toString;

export function IsArray(obj: any): obj is any[] {
  return opt.call(obj) === '[object Array]';
}

export function IsObject(obj: any): obj is { [key: string]: any } {
  return opt.call(obj) === '[object Object]';
}

export function IsString(obj: any): obj is string {
  return opt.call(obj) === '[object String]';
}

export function IsNumber(obj: any): obj is number {
  return opt.call(obj) === '[object Number]' && obj === obj; // eslint-disable-line
}

export function IsRegExp(obj: any) {
  return opt.call(obj) === '[object RegExp]';
}

export function IsFile(obj: any): obj is File {
  return opt.call(obj) === '[object File]';
}

export function IsBlob(obj: any): obj is Blob {
  return opt.call(obj) === '[object Blob]';
}

export function IsUndefined(obj: any): obj is undefined {
  return obj === undefined;
}

export function IsNull(obj: any): obj is null {
  return obj === null;
}

export function IsFunction(obj: any): obj is (...args: any[]) => any {
  return typeof obj === 'function';
}

export function IsEmptyObject(obj: any): boolean {
  return IsObject(obj) && Object.keys(obj).length === 0;
}

export function isExist(obj: any): boolean {
  return obj || obj === 0;
}

export function IsWindow(el: any): el is Window {
  return el === window;
}


export function AreArraysEqual<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i += 1) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}