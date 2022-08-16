import * as React from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";

/**
 * Typing for Rct/rct
 */
namespace Rct {
  export type SetState<T> = ((newValue: T) => void) | ((prevValue: T) => T);
  export type UseStateArg<T> = T | (() => T);
  export type Types = Readonly<{
    /**
     * New React DOM render method. Requires React 18+
     * @param component
     * @param element
     */
    render: (component: React.ReactNode, element: string) => void;
    /**
     * React DOM render method to render the DOM and root element automatically. Requires React 18+ and an component with call syntax.
     * @param InitComponent {ComponentClass} Uses the given component to render the DOM and the required HTML root element
     */
    renderAuto: <P = {}>(InitComponent: React.ElementType, props?: P) => void;

    /**
     * React DOM legacy render method
     * @param component
     * @param element
     * @param callback
     */
    renderLegacy: (component: React.DOMElement<React.DOMAttributes<Element>, Element>, element: string, callback?: () => void) => void;
    withAddedProps: <P = {}>(Component: React.ElementType) => (props: P) => JSX.Element;
    /**
     * Custom React state hook
     */
    useState: <T extends any>(defaultValue: Rct.UseStateArg<T>) => [T, Rct.SetState<T>];
    useForceRender: () => any;
  }>;
}

type rct = typeof rct[keyof typeof rct];
const rct: Rct.Types = {
  render: (component: React.ReactNode, element: string): void => {
    const app = document.createElement(element);
    document.body.prepend(app);
    const container = document.querySelector<Element>(element);
    const root = createRoot(container!);
    root.render(component);
  },
  renderAuto: function <P = {}>(InitComponent: React.ElementType, props?: P): void {
    const app = document.createElement(InitComponent.constructor.name!);
    document.body.prepend(app);
    let container;
    if (InitComponent instanceof React.Component) {
      container = document.querySelector<Element>(InitComponent.constructor.name!);
    } else {
      // @ts-ignore
      container = document.querySelector<Element>(InitComponent.name!);
    }
    const root = createRoot(container!);
    root.render(<InitComponent {...props} />);
  },

  renderLegacy: (component: React.DOMElement<React.DOMAttributes<Element>, Element>, element: string, callback?: () => void): void => {
    ReactDOM.render(component, document.querySelector<Element>(element), callback);
  },
  withAddedProps: function <P = {}>(Component: React.ElementType): (props: P) => JSX.Element {
    return (props: P) => {
      return <Component {...props} />;
    };
  },
  useForceRender: () => {
    const [, forceRender] = React.useReducer((x) => x + 1, 0);
    return forceRender;
  },
  useState: <T extends any>(defaultValue: Rct.UseStateArg<T>): [T, Rct.SetState<T>] => {
    const forceRender = rct.useForceRender();
    const isFirstCallRef = React.useRef(true);
    const startingValue = isFirstCallRef.current ? (typeof defaultValue !== "function" ? defaultValue : (defaultValue as any)()) : undefined;
    isFirstCallRef.current = false;
    const value = React.useRef<T>(startingValue);
    const useSave = React.useRef<Rct.SetState<T>>((newState: T | ((curState: T) => T)) => {
      const prevState = value.current;
      if (typeof newState !== "function") {
        value.current = newState;
      } else {
        value.current = (newState as any)(prevState);
      }
      if (prevState !== value.current) {
        forceRender();
      }
    });

    return [value.current, useSave.current];
  },
} as const;

export { Rct, rct };
