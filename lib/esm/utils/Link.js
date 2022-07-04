var Link;
(function (Link) {
    /**
     * Checks if an string link is valid
     * @param input string
     * @returns {boolean} boolean
     */
    function validURL(input) {
        var pattern = new RegExp("^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$", "i"); // fragment locator
        return !!pattern.test(input);
    }
    Link.validURL = validURL;
    /**
     * Sets an custom fake path to the current url
     * @param callback
     */
    function setURL(callback) {
        var loc = window.location.pathname;
        var set = function (data, unused, url) { return window.history.pushState(data, unused, url); };
        var currentPath = loc === "/" ? "" : loc;
        if (typeof callback == "function") {
            callback(set, currentPath);
        }
    }
    Link.setURL = setURL;
    /**
     * Retuns the given subpath from the current url
     * @param url Your url
     * @returns {string} Given subpath
     */
    function getSubPath(url) {
        return window.location.href.replace(/(\?(.*?)=(.*)|\?)/gm, "") + url;
    }
    Link.getSubPath = getSubPath;
})(Link || (Link = {}));
export default Link;
