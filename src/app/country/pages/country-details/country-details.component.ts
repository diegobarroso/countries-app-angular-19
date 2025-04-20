import { Component, inject, OnInit, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryInformationComponent } from './country-information/country-information.component';
import { CountryGlobeComponent } from './country-globe/country-globe.component';
import { Country } from '../../interfaces/country.interface';
import { CountryBordersComponent } from './country-borders/country-borders.component';

@Component({
  selector: 'app-country-details',
  imports: [
    CountryInformationComponent,
    NotFoundComponent,
    CountryGlobeComponent,
    CountryBordersComponent
  ],
  templateUrl: './country-details.component.html',
})
export default class CountryDetailsComponent implements OnInit {
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.countryCode.set(params['code']);
    });
  }

  countryCode = signal<string>('');
  route = inject(ActivatedRoute);
  countryService = inject(CountryService);
  showGlobe = false;
  showGoogleMap = false;

  countryBorders: Country[] = [];

  countryResource = rxResource({
    request: () => ({query: this.countryCode(), endpoint: 'alpha' }),
    loader: ({request}) => {
      if (!request.query) return of([]);
      return this.countryService.searchCountry(request.query, request.endpoint)
    }
  });

  getCountryBorders(countryBorders: string[]) {
    return countryBorders.join(',');
  }
}
