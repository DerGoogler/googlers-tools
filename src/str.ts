import { obj } from "./obj";

/**
 * Typing for Str/str
 */
namespace Str {
  export type Types = Readonly<{
    apply: (arg: any) => string;
    format: (value: any, args: any) => any;
  }>;
}

type str = typeof str[keyof typeof str];
const str: Str.Types = {
  apply: (arg: any) => {
    return String.apply(null, [arg]);
  },
  format: (text: string, tofor: any): any => {
    if (tofor.length === 1 && tofor[0] !== null && typeof tofor[0] === "object") {
      tofor = tofor[0];
    }
    return text.replace(/{([^}]*)}/g, function (match, key) {
      return typeof tofor[key] !== "undefined" ? tofor[key] : match;
    });
  },
} as const;

export { Str, str };
