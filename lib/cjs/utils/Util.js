"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util;
(function (Util) {
    function stringToBoolean(value) {
        if (typeof value == "boolean")
            return value;
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
    Util.stringToBoolean = stringToBoolean;
    /**
     * @deprecated
     */
    function typeIF(_, __, ___) {
        if (stringToBoolean(_)) {
            return __;
        }
        else {
            return ___;
        }
    }
    Util.typeIF = typeIF;
    function typeCheck(_, __) {
        if (_ === undefined || _ === null || _ === "" || __ === 0 || _ === "0" || _ === false || _ === "false") {
            return __;
        }
        else {
            return _;
        }
    }
    Util.typeCheck = typeCheck;
    function returnUndefined(value, theReturn) {
        if (value === undefined) {
            return theReturn;
        }
        else {
            return false;
        }
    }
    Util.returnUndefined = returnUndefined;
})(Util || (Util = {}));
exports.default = Util;
