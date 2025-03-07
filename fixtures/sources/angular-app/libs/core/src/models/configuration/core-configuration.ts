import { AppInsightsConfiguration } from './app-insights-configuration';
import { Environment, LogLevel } from './types';

/**
 * Configuration structure for the \@equans/core package.
 *
 * @public
 */
export interface CoreConfiguration {
  /**
   * The environment on which the application is running.
   */
  readonly environment: Environment;

  /**
   * Configure the logging level of the {@link LoggerService}.
   */
  readonly logLevel: LogLevel;

  /**
   * Configure the usage of Microsoft Application Insights. This is optional.
   */
  readonly appInsights?: AppInsightsConfiguration;
}
