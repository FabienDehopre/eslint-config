/**
 * Defines the different environments where an application can be deployed.
 *
 * @public
 */
export type Environment = 'acc' | 'dev' | 'prod';

/**
 * Defines the possibles levels of logging that the {@link LoggerService} will be using.
 *
 * @public
 */
export type LogLevel = 'ALL' | 'DEBUG' | 'ERROR' | 'INFO' | 'OFF' | 'TRACE' | 'WARN';
