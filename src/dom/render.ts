import * as React from "react";
import { createRoot } from "react-dom/client";

/**
 * New React DOM render method. Requires React 18+
 * @param component
 * @param element
 */
export default function(component: React.ReactNode, element: string): void {
  const app = document.createElement(element);
  document.body.prepend(app);
  const container = document.querySelector<Element>(element);
  const root = createRoot(container!);
  root.render(component);
}
