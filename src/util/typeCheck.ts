/**
 * An simple function to check if it's not equals null, "null" or something similar
 * @param toCheck The to checkin value function return
 * @param defValue The return value if there was an equal with null, "null" or something similar
 * @returns {String}
 */
export default function<R = string>(toCheck: any, defValue: any): R {
  if (toCheck === undefined || toCheck === null || toCheck === "null" || toCheck === "" || defValue === 0 || toCheck === "0" || toCheck === false || toCheck === "false") {
    return defValue;
  } else {
    return toCheck;
  }
}
