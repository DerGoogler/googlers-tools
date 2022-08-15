import { nstyl, NStyl } from "./nstyl";
import { obj } from "./obj";
import { str } from "./str";
import { styl, Styl } from "./styl";
import { util, Util } from "./util";

/**
 * Typing for Print/print
 */
namespace Print {
  export type Types = Util.HardRecords<Console, "Console", <T>(message?: Util.PosibleUndefined<Print.Message<T>>, format?: any) => void>;
  // readonly out: <T>(message: Print.Message<T>) => void;
  export type MessageSelf = Readonly<JSON> &
    Readonly<{
      format: (value: any, args: any) => any;
      apply: (args: any) => string;
    }>;
  export type Message<T> = T | ((self: Print.MessageSelf, css: Styl.Types["console"], ncss: NStyl.Types) => T);
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
const print: Print.Types = {} as const;

// Using core functions to build new :)
obj.keysMap<void>((obj.omit<typeof console>("Console", console) as unknown) as Print.Types)((method: any) => {
  print[method as keyof Print.Types] = <T>(message?: Util.PosibleUndefined<Print.Message<T>>, format?: any): void => {
    if (typeof message !== "function") {
      // @ts-ignore
      console[method as keyof Print.Types].apply(null, [util.format(message, !util.isUndefined(format) ? format : {})]);
    } else {
      // @ts-ignore
      console[method as keyof Print.Types].apply(null, [
        (message as any)(
          {
            parse: JSON.parse,
            stringify: JSON.stringify,
            format: str.format,
            apply: (args: any): string => {
              return String.apply(null, [args]);
            },
          },
          styl.console,
          nstyl
        ),
      ]);
    }
  };
});

export { Print, print };
