import findBy from "./findBy";
import permission from "./permission";
import preventer from "./preventer";
import render from "./render";
import renderAuto from "./renderAuto";
import renderLegacy from "./renderLegacy";

// --
import HTMLComponent, { HTMLTypes } from "./HTMLComponent";
// --

const dom = {
  findBy,
  permission,
  preventer,
  render,
  renderAuto,
  renderLegacy,
  r: {
    HTMLComponent,
  },
};

export { findBy, permission, preventer, render, renderAuto, renderLegacy, HTMLComponent, HTMLTypes };
export default dom;
