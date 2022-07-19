import * as React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";

interface DomTypes {
  /**
   * @param id Given element or ref
   * @param callback HTMLElement or React.RefObject
   *
   * @description
   * Usage
   * ```ts
   * // Id's
   * findBy("element", (element: HTMLElement) => { element.style.display = "none" })
   *
   * // Refs
   * findBy(this.myRef, (ref: HTMLElement) => { ref.style.display = "none" })
   * ```
   */
  readonly findBy: <Object = any>(id: string | React.RefObject<Object>, callback: (...props: any) => void) => Object | HTMLElement | React.RefObject<Object> | undefined;
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
  readonly permission: (permission: string) => Promise<PermissionStatus>;
  /**
   * Prevents event listener
   * @param prevents {Array<string>} `["contextmenu", "mousedown"]`
   */
  readonly preventer: (prevents: Array<string>) => void;
  /**
   * New React DOM render method. Requires React 18+
   * @param component
   * @param element
   */
  readonly render: (component: React.ReactNode, element: string) => void;
  /**
   * React DOM render method to render the DOM and root element automatically. Requires React 18+ and an component with call syntax.
   * @param InitComponent {ComponentClass} Uses the given component to render the DOM and the required HTML root element
   */
  readonly renderAuto: (InitComponent: React.ElementType) => void;

  /**
   * React DOM legacy render method
   * @param component
   * @param element
   * @param callback
   */
  readonly renderLegacy: (component: React.DOMElement<React.DOMAttributes<Element>, Element>, element: string, callback?: () => void) => void;
}

type dom = typeof dom[keyof typeof dom];
const dom: DomTypes = {
  permission: async (permission: string): Promise<PermissionStatus> => {
    const permissionName = permission as PermissionName;
    const permissionStatus = await navigator.permissions.query({ name: permissionName });
    // Will be 'granted', 'denied' or 'prompt':
    return permissionStatus;
  },
  preventer: (prevents: Array<string>): void => {
    prevents.map(item => {
      window.addEventListener(item, (e: Event) => {
        e.preventDefault();
        console.info(`${item} is prevented from using`);
      });
    });
  },
  render: (component: React.ReactNode, element: string): void => {
    const app = document.createElement(element);
    document.body.prepend(app);
    const container = document.querySelector<Element>(element);
    const root = createRoot(container!);
    root.render(component);
  },
  renderAuto: (InitComponent: React.ElementType): void => {
    const app = document.createElement(InitComponent.constructor.name!);
    document.body.prepend(app);
    const container = document.querySelector<Element>(InitComponent.constructor.name!);
    const root = createRoot(container!);
    root.render(<InitComponent />);
  },

  renderLegacy: (component: React.DOMElement<React.DOMAttributes<Element>, Element>, element: string, callback?: () => void): void => {
    ReactDOM.render(component, document.querySelector<Element>(element), callback);
  },
  // @ts-ignore --> Not all code paths return a value.ts(7030)
  findBy: function<Object = any>(id: string | React.RefObject<Object>, callback: (...props: any) => void): Object | HTMLElement | React.RefObject<Object> | undefined {
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
      var reff: React.RefObject<Object>;
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
  },
} as const;

export default dom;
