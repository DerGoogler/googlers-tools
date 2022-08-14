import { obj } from "./obj";

/**
 * Typing for Util/util
 */
namespace Util {
  export type NewMembers<T, U> = keyof T & keyof U;
  export type PickRename<T, K extends keyof T, R extends PropertyKey> = Omit<T, K> & { [P in R]: T[K] };
  export type KeyOf<T> = keyof T;
  export type ArglessCallfn<T> = () => T;
  export type Records<T> = {
    [K in keyof T]: keyof T[K];
  };
  export type RecordsPartial<T> = Partial<Records<T>>;
  export type HardRecords<T, O extends keyof any, C> = Record<keyof Records<Omit<T, O>>, C>;
  export type HardRecordsPartial<T, O extends keyof any, C> = Partial<Record<keyof Records<Omit<T, O>>, C>>;
  export type Nullable<T> = T | null;
  export type Undefineable<T = any> = T | undefined;
  export type PosibleUndefined<T> = T | null | undefined;
  export type TypeName<T> = T extends string ? "string" : T extends number ? "number" : T extends boolean ? "boolean" : T extends undefined ? "undefined" : T extends Function ? "function" : "object";
  export type AnyFunction = (...args: any[]) => any;
  export type MutableRequired<T> = { -readonly [P in keyof T]-?: T[P] };
  export type ReadonlyPartial<T> = { +readonly [P in keyof T]+?: T[P] };
  export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
  export type Unpacked<T> = T extends (infer U)[] ? U : T extends (...args: any[]) => infer U ? U : T extends Promise<infer U> ? U : T;
  export type Types = Readonly<{
    /**
     * Used as an class decorator
     */
    ImplementsStatics: <T>() => <U extends T>(constructor: U) => void;
    returnUndefined: (value: undefined | any, theReturn: string | boolean | number) => any;
    stringToBoolean: (value: string) => boolean;
    /**
     * An simple function to check if it's not equals null, "null" or something similar
     * @param toCheck The to checkin value function return
     * @param defValue The return value if there was an equal with null, "null" or something similar
     * @returns {R}
     */
    typeCheck: <R extends any = any>(toCheck: R, defValue: R) => R;
    /**
     * Marks an class method as deprecated
     */
    deprecated: (deprecationReason: string) => any;
    format: (value: any, args: any) => any;
    isBoolean: (arg: unknown) => arg is boolean;
    isNull: (arg: unknown) => arg is null;
    isNullOrUndefined: (arg: unknown) => arg is null | undefined;
    isNumber: (arg: unknown) => arg is number;
    isString: (arg: unknown) => arg is string;
    isSymbol: (arg: unknown) => arg is symbol;
    isUndefined: (arg: unknown) => arg is undefined;
    isObject: (arg: unknown) => arg is NonNullable<object>;
    isFunction: (arg: unknown) => arg is Function;
    isPrimitive: (arg: unknown) => arg is boolean | null | number | string | symbol | undefined;
  }>;
}

type util = typeof util[keyof typeof util];
const util: Util.Types = {
  ImplementsStatics: <T>(): (<U extends T>(constructor: U) => void) => {
    return <U extends T>(constructor: U) => {
      constructor;
    };
  },
  returnUndefined: (value: undefined | any, theReturn: string | boolean | number): any => {
    if (value === undefined) {
      return theReturn;
    } else {
      return false;
    }
  },
  stringToBoolean: (value: string): boolean => {
    if (typeof value == "boolean") return value;
    switch (value) {
      case "true":
      case "yes":
      case "1":
        return true;

      case "false":
      case "no":
      case "0":
      case null:
        return false;

      default:
        return Boolean(value);
    }
  },
  typeCheck: <R extends any = any>(toCheck: R, defValue: R): R => {
    if (toCheck === undefined || toCheck === null || toCheck === "null" || toCheck === "" || defValue === 0 || toCheck === "0" || toCheck === false || toCheck === "false") {
      return defValue;
    } else {
      return toCheck;
    }
  },
  deprecated: (deprecationReason: string) => {
    return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
      return {
        get() {
          const wrapperFn = (...args: any[]) => {
            console.warn(`Method ${memberName} is deprecated with reason: ${deprecationReason}`);
            propertyDescriptor.value.apply(this, args);
          };

          Object.defineProperty(this, memberName, {
            value: wrapperFn,
            configurable: true,
            writable: true,
          });
          return wrapperFn;
        },
      };
    };
  },

  isBoolean: (arg: unknown): arg is boolean => {
    return typeof arg === "boolean";
  },

  isNull: (arg: unknown): arg is null => {
    return arg === null;
  },

  isNullOrUndefined: (arg: unknown): arg is null | undefined => {
    return arg === null || arg === undefined;
  },

  isNumber: (arg: unknown): arg is number => {
    return typeof arg === "number";
  },

  isString: (arg: unknown): arg is string => {
    return typeof arg === "string";
  },

  isSymbol: (arg: unknown): arg is symbol => {
    return typeof arg === "symbol";
  },

  isUndefined: (arg: unknown): arg is undefined => {
    return arg === undefined;
  },

  isObject: (arg: unknown): arg is NonNullable<object> => {
    return arg !== null && typeof arg === "object";
  },

  isFunction: (arg: unknown): arg is Function => {
    return typeof arg === "function";
  },

  isPrimitive: (arg: unknown): arg is boolean | null | number | string | symbol | undefined => {
    return arg === null || (typeof arg !== "object" && typeof arg !== "function");
  },
  format: (value: any, args: any): any => {
    obj.keysMap<any>(args)((key, i) => {
      return (value = value.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]));
    });
    return value;
  },
} as const;

export { Util, util };
