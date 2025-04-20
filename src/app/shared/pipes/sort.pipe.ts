import { Pipe, PipeTransform } from '@angular/core';
import { Country } from '../../country/interfaces/country.interface';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(countries: Country[], criteria: string | undefined): Country[] {
    if (!countries || countries.length === 0) {
      return [];
    }
    if (!criteria) {
      return countries;
    }
    if (criteria === 'name') {
      return countries.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === 'population') {
      return countries.sort((a, b) => b.population - a.population);
    } else if (criteria === 'capital') {
      return countries.sort((a, b) => a.capital[0].localeCompare(b.capital[0]));
    }
    return [];
  }

}
