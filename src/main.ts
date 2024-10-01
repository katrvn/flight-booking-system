import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { APP_CONFIG } from './app/features/flights/model/appconfig';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

fetch('/assets/config/environment.config.json')
  .then((res) => res.json())
  .then((appConfig: any) => {
    if (environment.production) {
      enableProdMode();
    }
    return platformBrowserDynamic([
      { provide: APP_CONFIG, useValue: appConfig },
    ]).bootstrapModule(AppModule, {
      ngZoneEventCoalescing: true
    });
  })
  .catch((err) => console.error(err));
