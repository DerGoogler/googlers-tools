import { obj } from "./obj";
import { styl, Styl } from "./styl";
import { util, Util } from "./util";

/**
 * Typing for Print/print
 */
namespace Print {
  /**
   * Allows you to create colored output
   */
  type $ = Record<"styl", (args: any) => void>;
  export type Types = $ & Util.HardRecords<Console, "Console", <T>(message?: Util.PosibleUndefined<Print.Message<T>>, format?: any) => void>;
  // readonly out: <T>(message: Print.Message<T>) => void;
  export type MessageSelf = Readonly<JSON> &
    Readonly<{
      format: (value: any, args: any) => any;
    }>;
  export type Message<T> = T | ((self: Print.MessageSelf, css: Styl.Types["string"]) => T);
}

/**
 * Experimental console logger. Methods getting dynamically created.
 *
 * **Usage**
 * ```ts
 * import { print } from "googlers-tools";
 *
 * const test = {
 *   firstName: "John",
 *   lastName: "Smith",
 *   id: 123,
 *   isEnabled: true,
 * };
 *
 * print.error(self => (self.stringify(test, null, 4)));
 * ```
 * ----
 */
type print = typeof print[keyof typeof print];
// @ts-ignore
const print: Print.Types = {
  styl: (args: any): void => {
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
    console.log.apply(null, ["%c" + content.join("%c")].concat(styles) as any);
  },
} as const;

// Using core functions to build new :)
obj.keysMap<void>((obj.omit<typeof console>("Console", console) as unknown) as Print.Types)((method: any) => {
  print[method as keyof Print.Types] = <T>(message?: Util.PosibleUndefined<Print.Message<T>>, format?: any): void => {
    if (typeof message !== "function") {
      // @ts-ignore
      console[method as keyof Print.Types](util.format(message, !util.isUndefined(format) ? format : {}));
    } else {
      // @ts-ignore
      console[method as keyof Print.Types](
        // @ts-ignore
        (message as any)(
          {
            parse: JSON.parse,
            stringify: JSON.stringify,
            format: util.format,
          },
          styl.string
        )
      );
    }
  };
});

export { Print, print };
