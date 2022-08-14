# Googler's Tools

My own tools / scripts that I use.

## Link/link

Tools to manage URLs

### Typing

- `Link` - namespace
- `link` - constants

```ts
import { link, Link } from "googlers-tools";

// You want get https://example.com/data.json on http://127.0.0.1:8080/data.json?
const path = link.getSubPath("data.json");
console.log(path); // >> http://example.com/data.json or http://127.0.0.1:8080/data.json

// Experimental
link.setURL((set, currentPath) => {
  set(`view_${props.id}`, `view_${props.id}`, `${currentPath}/?module=${props.id}`);
});
```

## Rct/rct

Tools to manage some parts of React

### Typing

- `Rec` - namespace
- `rct` - constants

```tsx
import { rct, Rct } from "googlers-tools";

type AppProps {
  isMaintainable: boolean;
}

// Renders the component completely automatically and creating the root element from the display name (Requires React 18+)
rct.renderAuto<AppProps>(App, { isMaintainable: true });
// props are optional

// Renders the component in the pre created <app></app> tag (Requires React 18+)
rct.render(<App />, "app");

// Renders the component in the pre created <app></app> tag
rct.renderLegacy(<App />, "app");
```

## Print/print

`console` wrapper. This feature is experimental!

### Typing

- `Print` - namespace
- `print` - constants

```tsx
import { print, Print } from "googlers-tools";

// For colors in browsers
print.styl({
  text: "Hello, world!",
  style: {
    width: "1px",
    height: "1px",
    backgroundColor: "red",
    transform: "rotateZ(45deg)",
  },
});

// For Node.js
print.log(self => {
  return self.format("\x1b[36m{content}\x1b[0m", { content: "Hello world!" });
});

// Alternative way
print.log("\x1b[36m{content}\x1b[0m", { content: "Hello world!" });

// Stringify
const test = {
  firstName: "John",
  lastName: "Smith",
  id: 123,
  isEnabled: true,
};

print.info(self => self.stringify(test, null, 4));
```
