import { Component, input, signal } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SortPipe } from '../../../shared/pipes/sort.pipe';

@Component({
  selector: 'country-list',
  imports: [ DecimalPipe, SortPipe, RouterLink],
  templateUrl: './country-list.component.html',
})
export class CountryListComponent {

  countries = input.required<Country[]>();
  criteria = signal<string | undefined>(undefined);

  errorMessage = input<string | unknown | undefined>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);
  status = input<number>();
}
