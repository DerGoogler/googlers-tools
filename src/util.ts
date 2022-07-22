interface UtilTypes {
  /**
   * Used as an class decorator
   */
  readonly ImplementsStatics: <T>() => <U extends T>(constructor: U) => void;
  readonly returnUndefined: (value: undefined | any, theReturn: string | boolean | number) => any;
  readonly stringToBoolean: (value: string) => boolean;
  /**
   * An simple function to check if it's not equals null, "null" or something similar
   * @param toCheck The to checkin value function return
   * @param defValue The return value if there was an equal with null, "null" or something similar
   * @returns {R}
   */
  readonly typeCheck: <R extends any = any>(toCheck: R, defValue: R) => R;
  /**
   * Marks an class method as deprecated
   */
  readonly deprecated: (deprecationReason: string) => any;
}

type util = typeof util[keyof typeof util];
const util: UtilTypes = {
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
} as const;

export default util;
