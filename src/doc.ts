/**
 * Typing for Doc/doc
 */
namespace Doc {
  export type FindCallback<T> = (element: T) => void;
  export type FindRefObject<T> = React.MutableRefObject<T | undefined> | React.RefObject<T>;
  export type HeadInjectablePicker<E, P extends keyof E> = Pick<Partial<E>, P>;
  export type HeadInjectable = {
    links?: {
      [name: string]: HeadInjectablePicker<HTMLLinkElement, "href">;
    };
    scripts?: {
      [name: string]: HeadInjectablePicker<HTMLScriptElement, "src">;
    };
    styles?: {
      [name: string]: HeadInjectablePicker<HTMLStyleElement, "innerHTML" | "type">;
    };
  };
  export interface Types {
    /**
     * **Usage**
     * ```ts
     * import { doc } from "googlers-tools";
     *
     * const htm = doc.findId("container")?.innerHTML
     * console.log(htm)
     *
     * // Won't work!
     * doc.findId("from")?.style.display = "dfsdf";
     *
     * // Works!
     * doc.findId<HTMLDivElement>("from", e => {
     *  e.style.display = "none"
     * });
     *
     * ```
     * ----
     * @param id
     * @param callback
     * @returns
     */
    readonly findId: <T = HTMLElement>(id: string, callback?: Doc.FindCallback<T>) => void | T | null;
    /**
     * **Usage**
     * ```ts
     * import { doc } from "googlers-tools";
     *
     * const htm = doc.findRef("container")?.innerHTML
     * console.log(htm)
     *
     * // Won't work!
     * doc.findRef("from")?.style.display = "dfsdf";
     *
     * // Works!
     * doc.findRef<HTMLDivElement>("from", e => {
     *  e.style.display = "none"
     * });
     *
     * ```
     * ----
     * @param ref
     * @param callback
     * @returns
     */
    readonly findRef: <T = HTMLElement>(ref: Doc.FindRefObject<T>, callback?: FindCallback<T>) => void | T | undefined;
    readonly head: (elements: Doc.HeadInjectable) => void;
  }
}

type doc = typeof doc[keyof typeof doc];
const doc: Doc.Types = {
  findId: <T = HTMLElement>(id: string, callback?: Doc.FindCallback<T>): void | T | null => {
    let element: T | null;
    if ((element = document.getElementById(id) as any)) {
      if (callback && typeof callback == "function") {
        callback(element);
      } else {
        return element;
      }
    } else {
      return null;
    }
  },
  findRef: function<T = HTMLElement>(ref: Doc.FindRefObject<T>, callback?: Doc.FindCallback<T>): void | T | undefined {
    let reff: Doc.FindRefObject<T>;
    if ((reff = ref)) {
      if (reff && reff.current) {
        if (typeof callback == "function") {
          callback(reff.current);
        } else {
          return reff.current;
        }
      }
    } else {
      return undefined;
    }
  },
  head: (elements: Doc.HeadInjectable): void => {
    const link = document.createElement("link");
    const script = document.createElement("script");
    const style = document.createElement("style");

    Object.entries(elements.links ? elements.links : {}).forEach(([key, value]) => {
      link.id = key;
      link.href = value.href as string;
      link.type = "text/css";
      link.rel = "stylesheet";
    });
    Object.entries(elements.scripts ? elements.scripts : {}).forEach(([key, value]) => {
      script.id = key;
      script.src = value.src as string;
      script.type = "application/javascript";
    });
    Object.entries(elements.styles ? elements.styles : {}).forEach(([key, value]) => {
      style.id = key;
      style.innerHTML = value.innerHTML as string;
      style.type = value.innerHTML as string;
    });

    document.getElementsByTagName("head")[0].appendChild(link);
    document.getElementsByTagName("head")[0].appendChild(script);
    document.getElementsByTagName("head")[0].appendChild(style);
  },
} as const;

export { Doc, doc };
