import { print, styl, util } from "./../src";


print.log((self, css,ncss)=> {
  return ncss.custom(3)`Hello World!`
})