import * as React from "react";
import { createRoot } from "react-dom/client";

/**
 * React DOM render method to render the DOM and root element automatically. Requires React 18+ and an component with call syntax.
 * @param InitComponent {ComponentClass} Uses the given component to render the DOM and the required HTML root element
 */
export default function(InitComponent: React.ElementType): void {
  const app = document.createElement(InitComponent.constructor.name!);
  document.body.prepend(app);
  const container = document.querySelector<Element>(InitComponent.constructor.name!);
  const root = createRoot(container!);
  root.render(<InitComponent />);
}
