namespace Util {
  export function stringToBoolean(value: string) {
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
  export function typeIF(_: any, __: any, ___: any) {
    if (stringToBoolean(_)) {
      return __;
    } else {
      return ___;
    }
  }

  export function typeCheck(_: any, __: any) {
    if (_ === undefined || _ === null || _ === "" || __ === 0 || _ === "0" || _ === false || _ === "false") {
      return __;
    } else {
      return _;
    }
  }

  export function returnUndefined(value: undefined | any, theReturn: string | boolean | number): any {
    if (value === undefined) {
      return theReturn;
    } else {
      return false;
    }
  }
}

export default Util;
