import { Component, inject, linkedSignal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | 'Antarctic';

@Component({
  selector: 'app-by-region-page',
  imports: [ CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export default class ByRegionPageComponent {

  private readonly countryService = inject(CountryService);
  placeholder = 'Search by Region';

  activatedRoute = inject(ActivatedRoute);
  queryParams = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  router = inject(Router)
  selectedRegion = linkedSignal(() => this.queryParams ?? '');

  regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryResource = rxResource({
    request: () => ({query: this.selectedRegion(), endpoint: 'region' }),
    loader: ({request}) => {
      if (!request.query) return of([]);
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          query: request.query
        }
      });
      return this.countryService.searchCountries(request.query, request.endpoint)
    }
  });

  selectRegion(region: Region) {
    this.selectedRegion.set(region);
  }

}
