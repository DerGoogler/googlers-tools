/**
 * Prevents event listener
 * @param prevents {Array<string>} `["contextmenu", "mousedown"]`
 */
export default function(prevents: Array<string>): void {
  prevents.map(item => {
    window.addEventListener(item, (e: Event) => {
      e.preventDefault();
      console.info(`${item} is prevented from using`);
    });
  });
}
