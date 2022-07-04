var Dom;
(function (Dom) {
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
    function findBy(id, callback) {
        if (typeof id == "string") {
            var element;
            if ((element = document.getElementById(id))) {
                if (typeof callback == "function") {
                    callback(element);
                }
            }
        }
        else {
            var reff;
            if ((reff = id)) {
                if (reff && reff.current) {
                    if (typeof callback == "function") {
                        callback(reff.current);
                    }
                }
            }
        }
    }
    Dom.findBy = findBy;
})(Dom || (Dom = {}));
export default Dom;
