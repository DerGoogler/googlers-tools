# Googlers Tools

Some samples

```ts
import { Link } from "googlers-tools";

// You want get https://example.com/data.json on http://127.0.0.1:8080/data.json?
const path = Link.getSubPath("data.json");
console.log(path); // >> http://example.com/data.json or http://127.0.0.1:8080/data.json
```

## Set fake url

```ts
import { Link } from "googlers-tools";

Link.setURL((set, currentPath) => {
  set(`view_${props.id}`, `view_${props.id}`, `${currentPath}/?module=${props.id}`);
});
```

## Using React render methods

```tsx
import { Dom as dom } from "googlers-tools";

// Renders the component completely automatically and creating the root element from the display name (Requires React 18+)
dom.renderAuto(<App />);

// Renders the component in the pre created <app></app> tag (Requires React 18+)
dom.render(<App />, "app");

// Renders the component in the pre created <app></app> tag
dom.renderLegacy(<App />, "app");
```
