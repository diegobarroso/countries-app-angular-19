import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CountryService } from '../../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryListComponent } from '../../../components/country-list/country-list.component';

@Component({
  selector: 'country-borders',
  imports: [ CountryListComponent],
  templateUrl: './country-borders.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryBordersComponent {

  countryBorders = input.required<string>();
  countryService = inject(CountryService);

  countryResource = rxResource({
    request: () => ({query: this.countryBorders(), endpoint: 'alpha?codes'}),
    loader: ({request}) => {
      if (!request.query) return of([]);
      return this.countryService.searchCountries(request.query, request.endpoint)
    }
  });

}
