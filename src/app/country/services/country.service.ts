import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interface';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { CountryMapper } from '../mappers/country.mapper';
import { of, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';
@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCache = new Map<string, Country[]>();
  private countryCache = new Map<string, RESTCountry[]>();

  searchCountries(query: string, endpoint: string) {
    query = query.trim().toLowerCase();
    const queryKey = `${query}-${endpoint}`;
    if (this.queryCache.has(queryKey)) {
      return of(this.queryCache.get(queryKey));
    }
    return this.http.get<RESTCountry[]>(`${API_URL}/${endpoint}${endpoint === 'alpha?codes' ? '=' : '/'}${query}`)
      .pipe(
        map((countries) => CountryMapper.mapCountries(countries)),
        tap((countries) => this.queryCache.set(queryKey, countries)),
        delay(500),
        catchError((error) => {
          return throwError(() => new Error(`Error fetching countries by ${endpoint}`));
        })
      )
  }

  searchCountry(query: string, endpoint: string) {
    query = query.trim().toLowerCase();
    const queryKey = `${query}-${endpoint}`;
    if (this.countryCache.has(queryKey)) {
      return of(this.countryCache.get(queryKey));
    }
    return this.http.get<RESTCountry[]>(`${API_URL}/${endpoint}/${query}`)
      .pipe(
        delay(1000),
        tap((countries) => this.countryCache.set(queryKey, countries)),
        catchError((error) => {
          return throwError(() => new Error(`Error fetching countries by ${endpoint}`));
        })
      )
  }
}
