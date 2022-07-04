declare namespace Link {
    /**
     * Checks if an string link is valid
     * @param input string
     * @returns {boolean} boolean
     */
    function validURL(input: string): boolean;
    /**
     * Sets an custom fake path to the current url
     * @param callback
     */
    function setURL(callback: (set: (data?: any, unused?: string, url?: string | URL | null | undefined) => void, currentPath?: string | undefined) => void): void;
    /**
     * Retuns the given subpath from the current url
     * @param url Your url
     * @returns {string} Given subpath
     */
    function getSubPath(url: string): string;
}
export default Link;
