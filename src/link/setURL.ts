/**
 * Sets an custom fake path to the current url
 * @param callback
 */
export default function(callback: (set: (data?: any, unused?: string, url?: string | URL | null | undefined) => void, currentPath?: string | undefined) => void): void {
  const loc = window.location.pathname;
  // @ts-ignore
  const set = (data?: any, unused?: string, url?: string | URL | null | undefined) => window.history.pushState(data!, unused!, url!);
  const currentPath: string = loc === "/" ? "" : loc;
  if (typeof callback == "function") {
    callback(set, currentPath);
  }
}
