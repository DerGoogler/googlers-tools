import React from "react";

namespace Dom {
  /**
   * @param id Given element or ref
   * @param callback HTMLElement or React.RefObject
   *
   * @description
   * Usage
   * ```ts
   * // Id's
   * tools.findBy("element", (element: HTMLElement) => { element.style.display = "none" })
   *
   * // Refs
   * tools.findBy(this.myRef, (ref: HTMLElement) => { ref.style.display = "none" })
   * ```
   */
  export function findBy<Object = any>(id: string | React.RefObject<Object>, callback: (...props: any) => void) {
    if (typeof id == "string") {
      var element: HTMLElement | null;
      if ((element = document.getElementById(id))) {
        if (typeof callback == "function") {
          callback(element);
        }
      }
    } else {
      var reff: React.RefObject<Object>;
      if ((reff = id)) {
        if (reff && reff.current) {
          if (typeof callback == "function") {
            callback(reff.current);
          }
        }
      }
    }
  }
}

export default Dom;
