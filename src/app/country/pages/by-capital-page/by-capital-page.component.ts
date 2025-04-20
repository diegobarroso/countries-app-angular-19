import { Component, inject, linkedSignal } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export default class ByCapitalPageComponent {

  private readonly countryService = inject(CountryService);
  placeholder = 'Search by Capital City';

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParams = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParams ?? '');

  countryResource = rxResource({
    request: () => ({query: this.query(), endpoint: 'capital' }),
    loader: ({request}) => {
      if (!request.query) return of([]);
      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: request.query
        }
      });
      return this.countryService.searchCountries(request.query, request.endpoint)
    }
  });
}
