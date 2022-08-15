import { obj } from "./obj";
import * as CSS from "csstype";
import { Util } from "./util";

/**
 * Typing for Styl/styl
 */
namespace Styl {
  export type CssConsole = {
    text: string;
    style?: CSS.Properties;
  };
  export type Types = Readonly<{
    string: (style: CSS.Properties) => string;
    object: (style: any) => any;
    console: (args: CssConsole | CssConsole[]) => string[];
  }>;
}

type styl = typeof styl[keyof typeof styl];
const styl: Styl.Types = {
  string: (style: CSS.Properties): string => {
    return obj
      .keysMap(style)(key => {
        return key;
      })
      .reduce(
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
  console: (args: Styl.CssConsole | Styl.CssConsole[]): string[] => {
    const regExp = /([A-Z])/g;
    const replaceKey = (key: any) => {
      return key.replace(regExp, function($: any, $1: any) {
        return "-" + $1.toLowerCase();
      });
    };

    const joinStyle = (item: any) => {
      return function(k: any) {
        return [replaceKey(k), item.style[k]].join(":");
      };
    };
    if (typeof args !== "object" || args === null) {
      // @ts-ignore
      return console.log.apply(null, arguments);
    }
    var content: any[] = [];
    var opts = Array.isArray(args) ? args : [args];
    var styles = opts.map(function(item) {
      content.push(item.text);
      return Object.keys(item.style || {})
        .map(joinStyle.call(null, item))
        .join(";");
    });
    return ["%c" + content.join("%c")].concat(styles);
  },
} as const;

export { Styl, styl };
