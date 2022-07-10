import React, { RefObject, ReactNode, DOMElement, ComponentClass } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import InternalLogger from "./Logger";
import util from "./Util";

namespace Dom_NS {
  /**
   * @deprecated
   */
  export const Logger: typeof InternalLogger = InternalLogger;

  export interface IDom {
    findBy<Object = any>(id: string | React.RefObject<Object>, callback: (...props: any) => void): Object | HTMLElement | React.RefObject<Object> | undefined;
    render(component: ReactNode, element: string): void;
    renderAuto(InitComponent: ComponentClass): void;
    renderLegacy(component: DOMElement<React.DOMAttributes<Element>, Element>, element: string, callback?: () => void): void;
    preventer(prevents: Array<string>): void;
    permission(permission: string): Promise<PermissionStatus>;
  }

  @util.ImplementsStatics<IDom>()
  export class Platform {
    /**
     * @param id Given element or ref
     * @param callback HTMLElement or React.RefObject
     *
     * @description
     * Usage
     * ```ts
     * // Id's
     * Dom.findBy("element", (element: HTMLElement) => { element.style.display = "none" })
     *
     * // Refs
     * Dom.findBy(this.myRef, (ref: HTMLElement) => { ref.style.display = "none" })
     * ```
     */
    // @ts-ignore --> Not all code paths return a value.ts(7030)
    public static findBy<Object = any>(id: string | React.RefObject<Object>, callback: (...props: any) => void): Object | HTMLElement | React.RefObject<Object> | undefined {
      if (typeof id == "string") {
        var element: HTMLElement | null;
        if ((element = document.getElementById(id))) {
          if (typeof callback == "function") {
            callback(element);
          } else {
            return element;
          }
        }
      } else {
        var reff: RefObject<Object>;
        if ((reff = id)) {
          if (reff && reff.current) {
            if (typeof callback == "function") {
              callback(reff.current);
            } else {
              return reff.current;
            }
          }
        }
      }
    }

    /**
     * New React DOM render method. Requires React 18+
     * @param component
     * @param element
     */
    public static render(component: ReactNode, element: string): void {
      const app = document.createElement(element);
      document.body.prepend(app);
      const container = document.querySelector<Element>(element);
      const root = createRoot(container!);
      root.render(component);
    }

    /**
     * React DOM render method to render the DOM and root element automatically. Requires React 18+ and an component with call syntax.
     * @param InitComponent {ComponentClass} Uses the given component to render the DOM and the required HTML root element
     */
    public static renderAuto(InitComponent: ComponentClass): void {
      const app = document.createElement(InitComponent.displayName!);
      document.body.prepend(app);
      const container = document.querySelector<Element>(InitComponent.displayName!);
      const root = createRoot(container!);
      root.render(<InitComponent />);
    }

    /**
     * React DOM legacy render method
     * @param component
     * @param element
     * @param callback
     */
    public static renderLegacy(component: DOMElement<React.DOMAttributes<Element>, Element>, element: string, callback?: () => void) {
      ReactDOM.render(component, document.querySelector<Element>(element), callback);
    }

    /**
     * Prevents event listener
     * @param prevents {Array<string>} `["contextmenu", "mousedown"]`
     */
    public static preventer(prevents: Array<string>): void {
      prevents.map(item => {
        window.addEventListener(item, (e: Event) => {
          e.preventDefault();
          console.info(`${item} is prevented from using`);
        });
      });
    }

    /**
     * @usage
     * ```ts
     * permission("clipboard-write").then((pm: PermissionStatus) => {
     *   console.log(pm.state)
     * });
     * ```
     * @param permission
     * @returns
     */
    public static async permission(permission: string): Promise<PermissionStatus> {
      const permissionName = permission as PermissionName;
      const permissionStatus = await navigator.permissions.query({ name: permissionName });
      // Will be 'granted', 'denied' or 'prompt':
      return permissionStatus;
    }
  }
}

/**
 * Tools for document manipulation and more
 */
const dom: Dom_NS.IDom = Dom_NS.Platform;
export default dom;
