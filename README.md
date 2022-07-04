# Bota64

Simple string encryption

## Installing

```
npm install bota64 --save
```

# Usage

Encode

```js
import { Bota64 } from "bota64";

const bo = new Bota64();
console.log(bo.encode("Hello World!")); // => 𐑼𑫄𑫋𑫋𑫎𑁈𐓓𑫎𑫑𑫋𑫃᜵
```

Decode

```js
import { Bota64 } from "bota64";

const bo = new Bota64();
console.log(bo.decode("𐑼𑫄𑫋𑫋𑫎𑁈𐓓𑫎𑫑𑫋𑫃᜵")); // => Hello World!
```

## With base64

```js
import { Bota64 } from "bota64";

const bo = new Bota64({ withBase64: true });
// ...
```
