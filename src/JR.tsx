import * as React from "react";

/**
 * JsonReact
 */
namespace JR {
  export type DefinedProps = {
    key?: React.Key | null | undefined;
    id?: string;
    style?: React.CSSProperties;
    className?: string;
  };

  export type JRNode = {
    [element in keyof Partial<JSX.IntrinsicElements>]?: Partial<Partial<JSX.IntrinsicElements[element]> | Readonly<Partial<JSX.IntrinsicElements[element]>>>;
  };

  /**
   * Create an Json JSX Element
   */
  export function c(elements: Partial<JRNode>): Array<JSX.Element> {
    return Object.keys(elements).map((e, i) => {
      //@ts-ignore
      return React.createElement(e, elements[e], elements[e]?.children);
    });
  }

  /**
   * Extends the object to an array
   */
  export function r(element: Array<JRNode>): Array<JSX.Element> {
    return element.map(e => {
      return <>{c(e)}</>;
    });
  }

  /**
   * Makes an component without jsx
   */
  export function mc<P = {}>(MC: React.FunctionComponent<P> | React.ComponentClass<P>, props: P): JSX.Element {
    return <MC {...props} />;
  }

  /**
   * Makes children more useable and return as ReactNode
   */
  export function rn(
    rncl: (r: (element: Array<JRNode>) => Array<JSX.Element>, mc: <P = {}>(MC: React.FunctionComponent<P> | React.ComponentClass<P>, props: P) => JSX.Element) => Array<JSX.Element>
  ): React.ReactNode {
    return rncl(r, mc);
  }

  export class Component<P = {}, S = {}, SS = any> extends React.Component<P, S, SS> {
    public constructor(props: P | Readonly<P>) {
      super(props);
      this.jrender = this.jrender.bind(this);
    }

    /**
     * Always use `jrender` in an `JJ.Component`
     * @returns {JR.JRNode}
     */
    public jrender(): Array<JR.JRNode> {
      return [];
    }

    public render(): React.ReactNode {
      return JR.r(this.jrender());
    }
  }
}

export default JR;
