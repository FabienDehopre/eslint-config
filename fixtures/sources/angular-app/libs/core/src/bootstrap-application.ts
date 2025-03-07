import { ApplicationRef, Type, ApplicationConfig, isDevMode } from '@angular/core';
import { bootstrapApplication as ngBootstrapApplication } from '@angular/platform-browser';
import { PartialDeep } from 'type-fest';

import { CORE_BASE_CONFIGURATION, CORE_OVERRIDE_CONFIGURATION } from './models/injection-tokens';
import { selectorFactory } from './utilities/fetch-helpers';

const BASE_CONFIG_PATH = '/config/config.base.json';
const OVERRIDE_CONFIG_PATH = '/config/config.overrides.json';

async function load<TConfig>(url: string, optional: false): Promise<TConfig>;
async function load<TConfig>(url: string, optional: true): Promise<PartialDeep<TConfig> | undefined>;
async function load<TConfig>(url: string, optional: boolean): Promise<PartialDeep<TConfig> | TConfig | undefined> {
  const selector = selectorFactory<TConfig>();
  const response = await fetch(url, {
    // headers: new Headers({ 'cache-control': 'no-store', pragma: 'no-cache', expires: '0' }),
    cache: 'no-cache',
    method: 'get',
    mode: 'same-origin',
    credentials: 'omit',
    redirect: 'error',
  });
  return optional ? selector(response).catch(() => undefined) : selector(response);
}

/**
 * Function that replaces the Angular boostrapApplication function.
 * It loads the application configuration before bootstrapping the application.
 *
 * @param rootComponent - A reference to a standalone component that should be rendered.
 * @param options - Extra configuration for the bootstrap operation, see ApplicationConfig for additional info.
 * @returns A promise that returns an ApplicationRef instance once resolved.
 * @public
 */
export async function bootstrapApplication(rootComponent: Type<unknown>, options: ApplicationConfig): Promise<ApplicationRef> {
  const baseConfig = await load(BASE_CONFIG_PATH, false);
  const overrideConfig = isDevMode() ? undefined : await load(OVERRIDE_CONFIG_PATH, true);
  return ngBootstrapApplication(rootComponent, {
    providers: [
      ...options.providers,
      { provide: CORE_BASE_CONFIGURATION, useValue: baseConfig },
      { provide: CORE_OVERRIDE_CONFIGURATION, useValue: overrideConfig },
    ],
  });
}
