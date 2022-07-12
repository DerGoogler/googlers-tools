export default function(value: undefined | any, theReturn: string | boolean | number): any {
  if (value === undefined) {
    return theReturn;
  } else {
    return false;
  }
}
