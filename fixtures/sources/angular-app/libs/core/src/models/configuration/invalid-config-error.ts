import { ValidationError } from '../validation-error';

function format(errors: ValidationError[]): string {
  return errors
    .map((error) => {
      return JSON.stringify(error);
    })
    .join('\n');
}

/**
 * Error thrown when the loaded configuration does not comply with the JSON schema.
 *
 * @public
 */
export class InvalidConfigError extends Error {
  /**
   * The name of the Error.
   */
  override readonly name = 'InvalidConfigError';

  /**
   * Initializes a new instance of the {@link InvalidConfigError} class.
   * @param errors - The list of validation error that occurred.
   * @param message - The error message.
   */
  constructor(
    readonly errors: ValidationError[],
    message?: string
  ) {
    super(`${message}\n${format(errors)}`);
  }
}
