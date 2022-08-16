import * as React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import { Util } from "./util";
import { print } from "./print";

/**
 * Typing for Dom/dom
 */
namespace Dom {
  export type EventHandlersMap = Util.Records<GlobalEventHandlersEventMap>;
  export type PreventerArgs = keyof EventHandlersMap | Array<keyof EventHandlersMap>;
  export type Types = Readonly<{
    /**
     * @usage
     * ```ts
     * dom.permission("clipboard-write").then((pm: PermissionStatus) => {
     *   console.log(pm.state)
     * });
     * ```
     * @param permission
     * @returns
     */
    permission: (permission: string) => Promise<PermissionStatus>;
    /**
     * Prevents event listener
     * @param prevent {Array<string>} `["contextmenu", "mousedown"]` or just a string
     */
    preventer: (prevent: Dom.PreventerArgs) => void;
  }>;
}

type dom = typeof dom[keyof typeof dom];
const dom: Dom.Types = {
  permission: async (permission: string): Promise<PermissionStatus> => {
    const permissionName = permission as PermissionName;
    const permissionStatus = await navigator.permissions.query({ name: permissionName });
    // Will be 'granted', 'denied' or 'prompt':
    return permissionStatus;
  },
  preventer: (prevent: Dom.PreventerArgs): void => {
    switch (typeof prevent) {
      case "object":
        prevent.map(item => {
          window.addEventListener(item, (e: Event) => {
            e.preventDefault();
            print.info("{evt} is prevented from using", {
              evt: item,
            });
          });
        });
        break;
      case "string":
        window.addEventListener(prevent, (e: Event) => {
          e.preventDefault();
          print.info("{evt} is prevented from using", {
            evt: prevent,
          });
        });
        break;
      default:
        return undefined;
    }
  },
} as const;

export { Dom, dom };
