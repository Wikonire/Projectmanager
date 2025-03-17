import {ApplicationConfig, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, provideHttpClient} from '@angular/common/http';
import {AuthInterceptor} from '../shared/interceptors/auth.interceptor';
import {provideNativeDateAdapter} from '@angular/material/core';
import {GANTT_GLOBAL_CONFIG, GanttGlobalConfig, GanttI18nLocale, NgxGanttModule} from '@worktile/gantt';

export const ganttConfig:GanttGlobalConfig  = {
  locale: GanttI18nLocale.deDe,
  dateOptions: {
    weekStartsOn: 1,
    timeZone: 'Europe/Zurich'
  },

}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'de-CH' },
    provideNativeDateAdapter(),
    importProvidersFrom(NgxGanttModule),
    {provide: GANTT_GLOBAL_CONFIG, useValue: ganttConfig}
  ]
};
