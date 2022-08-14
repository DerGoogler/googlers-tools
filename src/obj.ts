import { Util } from "./util";

/**
 * Typing for Obj/obj
 */
namespace Obj {
  export interface Types {
    /**
     * Checks if the given object is empty
     */
    readonly isEmpty: <T = any>(obj: T) => boolean;
    readonly hasJsonStructure: (str: string) => boolean;
    /**
     * **Usage**
     * ```ts
     * const ogg = {
     *   firstName: "John",
     *   lastName: "Doe",
     *   isEnabled: true,
     *   id: 5566,
     * };
     *
     * const res = omit<typeof ogg>("id", ogg);
     * const res2 = omit<typeof ogg>(["id", "isEnabled", "lastName"], ogg);
     *
     * console.log(`RES  : ${JSON.stringify(res, null, 4)}`);
     * console.log(`RES2 : ${JSON.stringify(res2, null, 4)}`);
     * ```
     * ----
     */
    readonly omit: <T = {}>(key: Obj.KeysType<T>, obj: T) => Util.Undefineable<T>;

    /**
     * **Usage**
     * ```ts
     * import { print, obj } from 'googlers-tools';
     *
     * const test = {
     *   firstName: "John",
     *   lastName: "Smith",
     *   id: 123,
     *   isEnabled: true,
     * };
     *
     * print.log(self =>
     *   self.stringify(
     *     obj.keys<boolean>(test)((key, index) => {
     *       return typeof test[key] == "boolean";
     *     }),
     *     null,
     *     4
     *   )
     * );
     * ```
     *
     * ----
     *
     * **Result**
     *
     * ```json
     * [
     *     false,
     *     false,
     *     false,
     *     true
     * ]
     * ```
     *
     */
    readonly keysMap: <R extends any = string, T extends object | {} = {}>(ojb: T) => (callbackfn: (key: string, index: number) => R) => R[];

    /**
     * **Usage**
     * ```ts
     * import { print, obj } from 'googlers-tools';
     *
     * const test = {
     *   firstName: "John",
     *   lastName: "Smith",
     *   id: 123,
     *   isEnabled: true,
     * };
     *
     * print.log(self =>
     *   self.stringify(
     *     obj.entries(test)((key, value, tmp, index) => {
     *       tmp[key] = value;
     *       return tmp;
     *     }),
     *     null,
     *     4
     *   )
     * );
     *
     * ```
     *
     * ----
     *
     * **Result**
     *
     * ```json
     * {
     *     "firstName": "John",
     *     "lastName": "Smith",
     *     "id": 123,
     *     "isEnabled": true
     * }
     * ```
     */
    readonly entriesMap: <R = any>(ojb: {}) => (callbackfn: (key: string, value: any, index: number) => R) => R[];
  }
  export type KeysType<T> = keyof T | (keyof T)[];
  export type OmitElem<T> = Record<string, T>;
}

type obj = typeof obj[keyof typeof obj];
const obj: Obj.Types = {
  isEmpty: <T = any>(obj: T): boolean => {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }

    return JSON.stringify(obj) === JSON.stringify({});
  },
  hasJsonStructure: (str: string): boolean => {
    if (typeof str !== "string") return false;
    try {
      const result = JSON.parse(str);
      const type = Object.prototype.toString.call(result);
      return type === "[object Object]" || type === "[object Array]";
    } catch (err) {
      return false;
    }
  },
  omit: <T = {}>(key: Obj.KeysType<T>, obj: T): Util.Undefineable<T> => {
    switch (typeof key) {
      case "object":
        let tmp: Obj.OmitElem<T> = {};
        Object.entries(obj).forEach(([key_, value], i) => {
          if (key.some(elem => key_ == elem)) {
            null;
          } else {
            tmp[key_] = value;
          }
        });
        return (tmp as unknown) as T;
      case "string":
        let { [key]: omitted, ...rest } = obj;
        return rest as any;
      default:
        return undefined;
    }
  },
  keysMap: <R extends any = string, T extends object | {} = {}>(ojb: T): ((callbackfn: (key: string, index: number) => R) => R[]) => {
    return (callbackfn: (key: string, index: number) => R) => {
      return Object.keys(ojb).map<R>((key, index) => callbackfn(key, index));
    };
  },
  entriesMap: <R = any>(ojb: {}): ((callbackfn: (key: string, value: any, index: number) => R) => R[]) => {
    return (callbackfn: (key: string, value: any, index: number) => R) => {
      return Object.entries(ojb).map<R>(([key, value], index) => callbackfn(key, value, index));
    };
  },
} as const;

export { Obj, obj };
