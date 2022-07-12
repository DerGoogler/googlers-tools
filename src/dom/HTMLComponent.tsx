import * as React from "react";

namespace HTMLTypes {
  export interface DefinePropsInterface<E> extends React.HTMLAttributes<E> {}
  export type HTMLAttributes<E, P = {}> = React.DetailedHTMLProps<React.HTMLAttributes<E> & P, E>;
  export type AnchorHTMLAttributes<E, P = {}> = React.DetailedHTMLProps<React.AnchorHTMLAttributes<E> & P, E>;
  /**
   * Define props with html attributes
   */
  export type Props<P = {}, E = HTMLElement> = HTMLAttributes<E, P>;
}

class HTMLComponent<P = {}, S = {}, E = HTMLElement, SS = any> extends React.Component<HTMLTypes.Props<P, E>, S, SS> {
  public constructor(props: HTMLTypes.Props<P, E> | Readonly<HTMLTypes.Props<P, E>>) {
    super(props);
  }

  /**
   * @deprecated
   */
  public componentDidCatch() {
    this.onCatch();
  }

  /**
   * @deprecated
   */
  public componentDidMount() {
    this.onMount;
  }

  /**
   * @deprecated
   */
  public componentDidUpdate(prevProps: Readonly<HTMLTypes.Props<P, E>>, prevState: Readonly<S>, snapshot?: SS) {
    this.onUpdate(prevProps, prevState, snapshot);
  }

  /**
   * Catches exceptions generated in descendant components. Unhandled exceptions will cause
   * the entire component tree to unmount.
   */
  public onCatch() {}

  /**
   * Called immediately after a component is mounted. Setting state here will trigger re-rendering.
   */
  public onMount() {}

  /**
   * Called immediately after updating occurs. Not called for the initial render.
   *
   * The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.
   */
  public onUpdate(prevProps: Readonly<HTMLTypes.Props<P, E>>, prevState: Readonly<S>, snapshot?: SS) {}

  /**
   * Called to render the component
   * @param props
   * @param state
   * @returns
   */
  public onRender(props?: HTMLTypes.Props<P, E> | Readonly<HTMLTypes.Props<P, E>>, state?: Readonly<S>): React.ReactNode {
    return <></>;
  }

  /**
   * @deprecated
   */
  public render(): React.ReactNode {
    const props = this.props;
    const state = this.state;
    return this.onRender(props, state);
  }
}

export { HTMLTypes };
export default HTMLComponent;
