/**
 * Retuns the given subpath from the current url
 * @param url Your url
 * @returns {string} Given subpath
 */
export default function(url: string): string {
  return window.location.href.replace(/(\?(.*?)=(.*)|\?)/gm, "") + url;
}
