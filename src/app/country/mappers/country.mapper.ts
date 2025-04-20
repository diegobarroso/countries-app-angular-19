import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-country.interface";

export class CountryMapper {
  static mapCountry(country: RESTCountry): Country {
    return {
        cca2: country.cca2,
        name: country.name.common,
        capital: country.capital?.length ? country.capital.join(', ') : 'No capital city',
        population: country.population,
        flag: country.flag,
        flagSvg: country.flags.svg,
        alt: country.flags.alt
    };
  }

  static mapCountries(countries: RESTCountry[]): Country[] {
    return countries.map(CountryMapper.mapCountry);
  }
}
