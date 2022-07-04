namespace Link {
  /**
   * Checks if an string link is valid
   * @param input string
   * @returns {boolean} boolean
   */
  export function validURL(input: string): boolean {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(input);
  }

  /**
   * Sets an custom fake path to the current url
   * @param callback
   */
  export function setURL(callback: (set: (data?: any, unused?: string, url?: string | URL | null | undefined) => void, currentPath?: string | undefined) => void): void {
    const loc = window.location.pathname;
    const set = (data?: any, unused?: string, url?: string | URL | null | undefined) => window.history.pushState(data!, unused!, url!);
    const currentPath: string = loc === "/" ? "" : loc;
    if (typeof callback == "function") {
      callback(set, currentPath);
    }
  }

  /**
   * Retuns the given subpath from the current url
   * @param url Your url
   * @returns {string} Given subpath
   */
  export function getSubPath(url: string) {
    return window.location.href.replace(/(\?(.*?)=(.*)|\?)/gm, "") + url;
  }
}

export default Link;
