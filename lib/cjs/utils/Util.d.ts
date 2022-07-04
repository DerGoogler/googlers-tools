declare namespace Util {
    function stringToBoolean(value: string): boolean;
    /**
     * @deprecated
     */
    function typeIF(_: any, __: any, ___: any): any;
    function typeCheck(_: any, __: any): any;
    function returnUndefined(value: undefined | any, theReturn: string | boolean | number): any;
}
export default Util;
