import util from "../util";

interface IBSONCore {
  encode(): string;
  decode<T extends object = any>(options?: { parse?: boolean }): string | object | T | undefined | any;
}

interface IBSONCoreStatic {
  new (value: any): IBSONCore;
  parse<T extends object = any>(text: string, reviver?: (this: any, key: string, value: any) => any): T;
  isJsonString(str: any): boolean;
}

@util.ImplementsStatics<IBSONCoreStatic>()
class BSONCore {
  private value: string;

  public constructor(value: any) {
    if (BSON.isJsonString(value) || typeof value === "object") {
      this.value = JSON.stringify(value, null, 4);
    } else {
      this.value = value;
    }
  }

  public encode(): string {
    const compile = this.value
      .replace(/\{/g, "(")
      .replace(/\}/g, ")")
      .replace(/\: /g, "=")
      .replace(/\,/g, ".")
      .replace(/\"(.*?)\"/g, "<$1>");

    return compile.trim();
  }

  public decode<T extends object = any>(options?: { parse?: boolean }): string | object | T | undefined | any {
    const compile = this.value
      .replace(/\(/g, "{")
      .replace(/\)/g, "}")
      .replace(/\=/g, ": ")
      .replace(/\./g, ",")
      .replace(/\<(.*?)\>/g, '"$1"');

    if (options?.parse) {
      return BSON.parse<T>(compile.trim());
    } else {
      return compile.trim();
    }
  }

  public static parse<T extends object = any>(text: string, reviver?: (this: any, key: string, value: any) => any): T {
    return JSON.parse(text, reviver);
  }

  public static isJsonString(str: any): boolean {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
}

const BSON: IBSONCoreStatic = BSONCore;
export default BSON;
