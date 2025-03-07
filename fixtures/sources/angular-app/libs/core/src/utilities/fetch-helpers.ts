/**
 * Use this factory to create a selector used in Fetch API to type the response.
 *
 * @returns A selector function used in Fetch API.
 * @internal Used in services that only fetch JSON files using the Fetch API.
 */
export function selectorFactory<T>(): (response: Response) => Promise<T> {
  return (response: Response): Promise<T> => {
    if (response.ok) {
      return response.json() as Promise<T>;
    }

    return Promise.reject(new Error(`${response.status} ${response.statusText} for ${response.url}`));
  };
}
