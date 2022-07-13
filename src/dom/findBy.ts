import * as React from "react";

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
// @ts-ignore --> Not all code paths return a value.ts(7030)
export default function<Object = any>(id: string | React.RefObject<Object>, callback: (...props: any) => void): Object | HTMLElement | React.RefObject<Object> | undefined {
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
}