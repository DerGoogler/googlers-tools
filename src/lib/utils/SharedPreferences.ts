import util from "../util";

export interface ISharedPreferences {
  setString(key: string, value: string): void;
  setBoolean(key: string, value: boolean): void;
  setInt(key: string, value: number): void;
  getString(key: string, defValue: string): string;
  getBoolean(key: string, defValue: boolean): boolean;
  getInt(key: string, defValue: number): number;
  removePref(key: string): void;
  clearPrefs(): void;
}

/**
 * Simple class to manage the web local sotrage and the Android native preferences
 */
class SharedPreferences implements ISharedPreferences {
  private webStorage: Storage;

  public constructor() {
    this.webStorage = localStorage;
  }

  public setString(key: string, value: string): void {
    this.webStorage.setItem(key, String(value));
  }

  public setBoolean(key: string, value: boolean): void {
    this.webStorage.setItem(key, String(value));
  }

  public setInt(key: string, value: number): void {
    this.webStorage.setItem(key, String(value));
  }

  /**
   * Retrieve a String value from the preferences.
   *
   * @param key The name of the preference to retrieve.
   * @param defValue Value to return if this preference does not exist.
   *
   * @encode The `defValue` should also encoded
   *
   * @return Returns the preference value if it exists, or defValue. Throws ClassCastException if there is a preference with this name that is not a String.
   *
   * @throws ClassCastException
   */
  public getString(key: string, defValue: string): string {
    const get = this.webStorage.getItem(key);
    if (get === null) {
      return defValue;
    } else {
      return String(get);
    }
  }

  /**
   * Retrieve a boolean value from the preferences.
   *
   * @remember if it's from an Switch or Select, put `_switch` or `_select` after the name
   *
   * @param key The name of the preference to retrieve.
   * @param defValue Value to return if this preference does not exist.
   *
   * @returns Returns the preference value if it exists, or defValue. Throws ClassCastException if there is a preference with this name that is not a boolean.
   *
   * @throws ClassCastException
   */
  public getBoolean(key: string, defValue: boolean): boolean {
    const get = this.webStorage.getItem(key);
    if (get === null) {
      return defValue;
    } else {
      return util.stringToBoolean(get);
    }
  }

  /**
   * Retrieve a int value from the preferences.
   *
   * @param key The name of the preference to retrieve.
   * @param defValue Value to return if this preference does not exist.
   *
   * @returns Returns the preference value if it exists, or defValue. Throws ClassCastException if there is a preference with this name that is not an int.
   *
   * @throws ClassCastException
   */
  public getInt(key: string, defValue: number): number {
    const get = this.webStorage.getItem(key);
    if (get === null) {
      return defValue;
    } else {
      return Number(get);
    }
  }

  /**
   * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  public removePref(key: string): void {
    this.webStorage.removeItem(key);
  }

  /**
   * Removes all key/value pairs, if there are any.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  public clearPrefs(): void {
    this.webStorage.clear();
  }

  // Statics

  private static s: ISharedPreferences = new SharedPreferences();

  public static setString(key: string, value: string): void {
    this.s.setString(key, value);
  }

  public static setBoolean(key: string, value: boolean): void {
    this.s.setBoolean(key, value);
  }

  public static setInt(key: string, value: number): void {
    this.s.setInt(key, value);
  }

  /**
   * Retrieve a String value from the preferences.
   *
   * @param key The name of the preference to retrieve.
   * @param defValue Value to return if this preference does not exist.
   *
   * @return Returns the preference value if it exists, or defValue. Throws ClassCastException if there is a preference with this name that is not a String.
   *
   * @throws ClassCastException
   */
  public static getString(key: string, defValue: string): string | String {
    return this.s.getString(key, defValue);
  }

  /**
   * Retrieve a boolean value from the preferences.
   *
   * @remember if it's from an Switch or Select, put `_switch` or `_select` after the name
   *
   * @param key The name of the preference to retrieve.
   * @param defValue Value to return if this preference does not exist.
   *
   * @returns Returns the preference value if it exists, or defValue. Throws ClassCastException if there is a preference with this name that is not a boolean.
   *
   * @throws ClassCastException
   */
  public static getBoolean(key: string, defValue: boolean): boolean | Boolean {
    return this.s.getBoolean(key, defValue);
  }

  /**
   * Retrieve a int value from the preferences.
   *
   * @param key The name of the preference to retrieve.
   * @param defValue Value to return if this preference does not exist.
   *
   * @returns Returns the preference value if it exists, or defValue. Throws ClassCastException if there is a preference with this name that is not an int.
   *
   * @throws ClassCastException
   */
  public static getInt(key: string, defValue: number): number | Number {
    return this.s.getInt(key, defValue);
  }

  /**
   * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  public static removePref(key: string): void {
    this.s.removePref(key);
  }

  /**
   * Removes all key/value pairs, if there are any.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  public static clearPrefs(): void {
    this.s.clearPrefs();
  }
}

export default SharedPreferences;
