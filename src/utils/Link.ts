import util from "./Util";

namespace Link_NS {
  export interface ILink {
    validURL(input: string): boolean;
    setURL(callback: (set: (data?: any, unused?: string, url?: string | URL | null | undefined) => void, currentPath?: string | undefined) => void): void;
    getSubPath(url: string): string;
    parseURLParams(url: string): string[] | undefined;
    request<T = any>(url: string, callback: (status: XMLHttpRequest["status"], data: T) => void): void;
  }

  @util.ImplementsStatics<ILink>()
  export class Platform {
    /**
     * Checks if an string link is valid
     * @param input string
     * @returns {boolean} boolean
     */
    public static validURL(input: string): boolean {
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
    public static setURL(callback: (set: (data?: any, unused?: string, url?: string | URL | null | undefined) => void, currentPath?: string | undefined) => void): void {
      const loc = window.location.pathname;
      // @ts-ignore
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
    public static getSubPath(url: string): string {
      return window.location.href.replace(/(\?(.*?)=(.*)|\?)/gm, "") + url;
    }

    public static parseURLParams(url: string): string[] | undefined {
      var queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms: any = {},
        i,
        n,
        v,
        nv;

      if (query === url || query === "") return;

      for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
      }
      return parms;
    }

    public static request<T = any>(url: string, callback: (status: XMLHttpRequest["status"], data: T) => void): void {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
          callback(xhr.status, xhr.response);
        }
      };
      xhr.open("GET", url, true);
      xhr.send();
    }
  }
}

/**
 * Tools for link manipulation and management
 */
const link: Link_NS.ILink = Link_NS.Platform;
export default link;
