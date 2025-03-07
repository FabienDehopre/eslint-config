declare global {
  interface ArrayConstructor {
    // eslint-disable-next-line @typescript-eslint/method-signature-style
    isArray(arg: unknown): arg is readonly unknown[];
  }
}

/**
 * Special type alias required for the {@link isNullOrUndefined} function.
 *
 * @public
 */
export type NullOrUndefined = null | undefined;

/**
 * Describe an array of item that cannot be empty.
 *
 * @public
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * Describe a readonly array that cannot be empty.
 *
 * @public
 */
export type NonEmptyReadOnlyArray<T> = readonly [T, ...T[]];

/**
 * Check whether a value is either null or undefined.
 *
 * @param value - The value to check against null or undefined.
 * @returns `true` if the value is null or undefined, `false` otherwise.
 * @public
 */
export function isNullOrUndefined(value: unknown): value is NullOrUndefined {
  return value === null || value === undefined;
}

/**
 * Checks if an optional value is set and not null.
 *
 * @param value - The optional value to check.
 * @returns `true` when the value is set and not null, `false` otherwise.
 * @public
 */
export function isNeitherNullNorUndefined<T>(value: T | null | undefined): value is T {
  return !isNullOrUndefined(value);
}

/**
 * Checks if a value is a string.
 *
 * @param value - The value to check.
 * @returns `true` when the value is a string, `false` otherwise.
 * @public
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Checks if a value is a non-empty string.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a string and is not an empty string, `false` otherwise.
 * @public
 */
export function isNonEmptyString(value: unknown): value is string {
  return isString(value) && value.length > 0;
}

/**
 * Checks if a value is a string array.
 *
 * @param value - The value to check.
 * @returns `true` if the value is a non-empty string array, `false` otherwise.
 * @remarks The function will return `false` if the array is empty.
 * @public
 */
export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

/**
 * Checks if an array is not empty.
 *
 * @param value - THe value to check.
 * @returns `true` if the array contains at least one item, `false` otherwise.
 * @public
 */
export function isNonEmptyArray<T>(value: readonly T[]): value is NonEmptyReadOnlyArray<T>;

/**
 * Checks if an array is not empty.
 *
 * @param value - THe value to check.
 * @returns `true` if the array contains at least one item, `false` otherwise.
 * @public
 */
export function isNonEmptyArray<T>(value: T[]): value is NonEmptyArray<T>;
export function isNonEmptyArray<T>(value: T[] | readonly T[]): value is NonEmptyArray<T> | NonEmptyReadOnlyArray<T> {
  return Array.isArray(value) && value.length > 0;
}

/**
 * Make sure that a value is an array be either returning it unchanged if it is already an array or turning it into a single element array.
 * @param value - The value to convert to array if not yet an array.
 * @returns An array.
 * @public
 */
export function toArray<T>(value: NonEmptyArray<T> | T): NonEmptyArray<T>;
export function toArray<T>(value: T | T[]): T[] {
  if (Array.isArray(value)) {
    return value;
  }

  return [value] as T[];
}

/**
 * Make sure that a value is a readonly array be either returning it unchanged if it is already a readonly array or turning it into a single element readonly array.
 * @param value - The value to convert to readonly array if not yet an array.
 * @returns An array.
 * @public
 */
export function toReadOnlyArray<T>(value: NonEmptyReadOnlyArray<T> | T): NonEmptyReadOnlyArray<T>;
export function toReadOnlyArray<T>(value: T | readonly T[]): readonly T[] {
  if (Array.isArray(value)) {
    return value;
  }

  return [value] as const;
}

/**
 * Deep freeze an object or return the value as-is if it's not an object.
 * @param object -- The object to deep freeze.
 * @internal
 */
export function deepFreeze<T>(object: T): T {
  if (object && typeof object === 'object') {
    const propNames = Reflect.ownKeys(object);
    for (const propName of propNames) {
      const value = (object as Record<string | symbol, unknown>)[propName];
      if ((isNeitherNullNorUndefined(value) && typeof value === 'object') || typeof value === 'function') {
        deepFreeze(value);
      }
    }

    return Object.freeze(object);
  }

  return object;
}
