import React from "react";
declare namespace Dom {
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
    function findBy<Object = any>(id: string | React.RefObject<Object>, callback: (...props: any) => void): void;
}
export default Dom;
