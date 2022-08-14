import { print, obj, styl, util } from "./../src";

print.log(self => {
  return self.format("\x1b[36m{content}\x1b[0m", { content: "Hello world!" });
});

// Alternative way
print.log("\x1b[36m{content}\x1b[0m", { content: "Hello world!" })