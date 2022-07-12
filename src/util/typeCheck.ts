export default function(_: any, __: any) {
  if (_ === undefined || _ === null || _ === "" || __ === 0 || _ === "0" || _ === false || _ === "false") {
    return __;
  } else {
    return _;
  }
}
