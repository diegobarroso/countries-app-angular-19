// crear rutas
import { Routes } from '@angular/router';
import { CountryLayoutComponent } from './layouts/country-layout/country-layout.component';

export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryLayoutComponent,
    children: [
      {
        path: 'by-capital',
        loadComponent: () => import('./pages/by-capital-page/by-capital-page.component')
      },
      {
        path: 'by-country',
        loadComponent: () => import('./pages/by-country-page/by-country-page.component')
      },
      {
        path: 'by-region',
        loadComponent: () => import('./pages/by-region-page/by-region-page.component')
      },
      {
        path: 'by/:code',
        loadComponent: () => import('./pages/country-details/country-details.component')
      },
      {
        path: '**',
        redirectTo: 'by-capital'
      }
    ]
    }
];

export default countryRoutes;
