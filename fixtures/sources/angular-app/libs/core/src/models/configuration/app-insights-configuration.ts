/**
 * Configuration structure to use Microsoft Application Insights.
 * @public
 */
export interface AppInsightsConfiguration {
  /**
   * The instrumentation key provided by Azure.
   */
  readonly instrumentationKey: string;

  /**
   * Identifies the application name in Application Insights logs.
   */
  readonly cloudRoleName: string;

  /**
   * Endpoint where telemetry data is sent. Defaults to https://dc.services.visualstudio.com/v2/track
   */
  readonly endpointUrl?: string;

  /**
   * Custom headers to send with the app insights traces.
   */
  readonly customHeaders?: { header: string; value: string }[];

  /**
   * AppId is used for the correlation between AJAX dependencies happening on the client-side with the server-side requets. When Beacon API is enabled, it cannot be used automatically, but can be set manually in the configuration.
   */
  readonly appId?: string;

  /**
   * Provide a way to exclude specific route from automatic tracking for XMLHttpRequest or Fetch request. For an ajax / fetch request that the request url matches with the regex patterns, auto tracking is turned off.
   */
  readonly excludeRequestFromAutoTrackingPatterns?: string[];
}
