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
  format: (value: any, args: any): any => {
    obj.keysMap<any>(args)((key, i) => {
      return (value = value.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]));
    });
    return value;
  },
} as const;

export { Str, str };
