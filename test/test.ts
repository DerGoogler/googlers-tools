import { obj } from "./../src";

console.log(
  obj.omit("name", {
    name: "sf",
    sfdsdff: "",
  })
);
