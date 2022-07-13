declare module 'react-console' {
  export function render<T = string>(
    root: T,
    context: Console,
    method: string
  ): void;
  export function log<T = string>(message: T): void;
  export function warn<T = string>(message: T): void;
  export function error<T = string>(message: T): void;
  export function debug<T = string>(message: T): void;
  export function info<T = string>(message: T): void;
  export function group<T = string>(message: T): void;
  export function groupCollapsed<T = string>(message: T): void;
  export function trace<T = string>(message: T): void;
}
declare module 'react-dom';
