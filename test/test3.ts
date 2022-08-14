import { print, obj, styl, util } from "./../src";

// print.out("Hello world!");

const test = {
  firstName: "John",
  lastName: "Smith",
  id: 123,
  isEnabled: true,
};

// print.log(self =>
//   self.stringify(
//     obj.keys<boolean>(test)((key, index) => {
//       return typeof test[key] == "boolean";
//     }),
//     null,
//     4
//   )
// );

// print.log(self => {
//   const text = "Hello world!";
//   return self.format("\x1b[36m{0}\x1b[0m", text);
// });

// const css = stl =>
//   obj
//     .entriesMap<string>(stl)((key, value, index) => {
//       return `${key}:${value}`;
//     })
//     .join(";");

// print.log((self, css) =>
//   self.format(
//     "{0}Hello world!",
//     css({
//       width: "1px",
//       height: "1px",
//       backgroundColor: "red",
//       transform: "rotateZ(45deg)",
//     })
//   )
// );

// print.log((self, css) => {
//   return self.format(["that's %s", "nice"]);
// });

// print.log("Hello {firstName} {lastName}! Your accout ID is: {id}", test);

// print.$()

// function create(text: string[], style: string[]) {
//   const textB = text.map((value, index)=> {
//     return `%c${text[index]}`
//   })
//   const styleB = style.map((value, index)=> {
//     return value
//   })
//   return [...[...textB, ...styleB]]
// }

// function log(texts: string[], styles: string[]) {
//   console.log(...[...create(texts, styles)]);

// }

// log(["Hello", "world!"], ["color: red", "color: blue"])

const dfg = {
  Hello: "color: blue",
  "World!": "color: red",
};

const g = obj.entriesMap(dfg)((key, value) => {
  return `%c${key}`;
});
const g2 = obj.entriesMap(dfg)((key, value) => {
  return `%c${key} ${g}`;
});


function showStatus(text, val) {
  var success = '#00a698';
  var error = '#ff7b71';
  return [{
    text: text,
    style: {
      padding: '2px 6px',
      fontSize: '8px',
      color: '#fff',
      background: '#555',
      borderRadius: '3px 0 0 3px'
    }
  }, {
    text: val ? 'success' : 'error',
    style: {
      padding: '2px 6px',
      fontSize: '8px',
      color: '#fff',
      background: val ? success : error,
      borderRadius: '0 3px 3px 0'
    }
  }]
}

print.styl(showStatus('request', true));
