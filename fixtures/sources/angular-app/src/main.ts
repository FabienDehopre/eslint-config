import { bootstrapApplication } from '@fabdeh/components';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig, { licenseKey: 'TODO' })
  .catch((err) => console.error(err));
