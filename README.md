# Googlers Tools

Some samples

```ts
import { Link } from "googlers-tools";

// You want get https://example.com/data.json on http://127.0.0.1:8080/data.json?
const path = Link.getSubPath("data.json");
console.log(path); // >> http://example.com/data.json or http://127.0.0.1:8080/data.json
```
