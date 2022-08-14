type test<T = {}> = {
  [name in keyof T]: string;
};

export type OmitElem<T> = {
  [name: string]: T;
};

function omit<T = {}>(key: keyof T | (keyof T)[], obj: T): T | undefined {
  switch (typeof key) {
    case "object":
      let tmp: OmitElem<T> = {};
        Object.entries(obj).forEach(([key_, value], i) => {
          if (key.some(elem => key_ == elem)) {
            null;
          } else {
            tmp[key_] = value;
          }
        });
        return tmp as unknown as T;
    case "string":
      let { [key]: omitted, ...rest } = obj;
      return rest as any;
  }
}

const ogg = {
  firstName: "John",
  lastName: "Doe",
  isEnabled: true,
  id: 5566,
};

const res = omit<typeof ogg>("id", ogg);
const res2 = omit<typeof ogg>(["id", "isEnabled", "lastName"], ogg);

console.log(`RES  : ${JSON.stringify(res, null, 4)}`);
console.log(`RES2 : ${JSON.stringify(res2, null, 4)}`);
