export default function(value: string) {
  if (typeof value == "boolean") return value;
  switch (value) {
    case "true":
    case "yes":
    case "1":
      return true;

    case "false":
    case "no":
    case "0":
    case null:
      return false;

    default:
      return Boolean(value);
  }
}
