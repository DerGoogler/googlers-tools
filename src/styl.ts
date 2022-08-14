import { obj } from "./obj";
import type * as CSS from 'csstype';
import { Util } from "./util";

/**
 * Typing for Styl/styl
 */
namespace Styl {
  export type Types = Readonly<{
    string: (style:CSS.Properties) => string;
    object: (style: any) => any;
  }>;
}

type styl = typeof styl[keyof typeof styl];
const styl: Styl.Types = {
  string: (style:CSS.Properties): string => {
    return obj.keysMap(style)((key)=> {
      return key
    }).reduce(
      (acc, key) =>
        acc +
        key
          .split(/(?=[A-Z])/)
          .join("-")
          .toLowerCase() +
        ":" +
        style[key as keyof CSS.Properties] +
        ";",
      ""
    );
  },
  object: (style: any): any => {
    const styles: any = {};
    style.split(";").forEach((s: string) => {
      const parts = s.split(":", 2);
      if (parts.length > 1) {
        styles[parts[0].trim().replace(/-([a-z])/gi, (_: any, l: string) => l.toUpperCase())] = parts[1].trim();
      }
    });
    return styles;
  },
} as const;

export { Styl, styl };
