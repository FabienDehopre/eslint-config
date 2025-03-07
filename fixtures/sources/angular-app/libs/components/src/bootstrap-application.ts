import { ApplicationRef, Type, ApplicationConfig } from '@angular/core';
import { bootstrapApplication as coreBootstrapApplication, isNeitherNullNorUndefined } from '@fabdeh/core';
import config from 'devextreme/core/config';
import themes from 'devextreme/ui/themes';
import { DxGlobalConfig } from './models/dx-global-config';

export function bootstrapApplication(
  rootComponent: Type<unknown>,
  options: ApplicationConfig,
  dxConfig?: DxGlobalConfig
): Promise<ApplicationRef> {
  if (isNeitherNullNorUndefined(dxConfig)) {
    config(dxConfig);
  }

  if (navigator.userAgent.includes('iPhone')) {
    // disable auto-zoom on iPhone devices
    document.querySelector('[name=viewport]')?.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1');
  }

  return new Promise<ApplicationRef>((resolve, reject) => {
    themes.initialized(() => coreBootstrapApplication(rootComponent, options).then(resolve, reject));
  });
}
