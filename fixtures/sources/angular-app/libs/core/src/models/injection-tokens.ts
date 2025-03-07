import { inject, InjectionToken } from '@angular/core';
import { PartialDeep } from 'type-fest';

import { RootConfiguration } from './configuration/root-configuration';
import { VersionInfo } from './version-info';

/**
 * Store the application version information in the DI for later use by the framework.
 * @internal
 */
export const CORE_VERSION_INFO_TOKEN = new InjectionToken<VersionInfo>('CORE_VERSION_INFO_TOKEN');

/**
 * Inject the application version information from the DI.
 */
export function injectVersionInfo(): VersionInfo {
  return inject(CORE_VERSION_INFO_TOKEN);
}

/**
 * Store the application base configuration value.
 * @internal
 */
export const CORE_BASE_CONFIGURATION = new InjectionToken<RootConfiguration>('CORE_BASE_CONFIGURATION');

/**
 * Store the application override configuration value.
 * @internal
 */
export const CORE_OVERRIDE_CONFIGURATION = new InjectionToken<PartialDeep<RootConfiguration> | undefined>('CORE_OVERRIDE_CONFIGURATION');
