/**
 * Used as an class decorator
 */
export default function ImplementsStatics<T>(): <U extends T>(constructor: U) => void {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}
