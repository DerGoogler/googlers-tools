namespace Util_NS {
  export interface IUtil {
    stringToBoolean(value: string): boolean;
    typeIF(_: any, __: any, ___: any): any;
    typeCheck(_: any, __: any): any;
    returnUndefined(value: undefined | any, theReturn: string | boolean | number): any;
    ImplementsStatics<T>(): <U extends T>(constructor: U) => void;
  }


  @Platform.ImplementsStatics<IUtil>()
  export class Platform {
    public static stringToBoolean(value: string) {
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
    }

    /**
     * @deprecated
     */
    public static typeIF(_: any, __: any, ___: any) {
      if (this.stringToBoolean(_)) {
        return __;
      } else {
        return ___;
      }
    }

    public static typeCheck(_: any, __: any) {
      if (_ === undefined || _ === null || _ === "" || __ === 0 || _ === "0" || _ === false || _ === "false") {
        return __;
      } else {
        return _;
      }
    }

    public static returnUndefined(value: undefined | any, theReturn: string | boolean | number): any {
      if (value === undefined) {
        return theReturn;
      } else {
        return false;
      }
    }

    /**
     * Used as an class decorator
     */
    public static ImplementsStatics<T>(): <U extends T>(constructor: U) => void {
      return <U extends T>(constructor: U) => {
        constructor;
      };
    }
  }
}

/**
 * Utils for ... idk
 */
const util: Util_NS.IUtil = Util_NS.Platform;
export default util;
