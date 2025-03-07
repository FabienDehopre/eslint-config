import { CoreConfiguration } from './core-configuration';

/**
 * Root configuration object.
 *
 * @public
 */
export interface RootConfiguration {
  /**
   * Contains the configuration of the \@equans/core package.
   */
  readonly core: CoreConfiguration;
}
