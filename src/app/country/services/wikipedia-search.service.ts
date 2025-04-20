import { inject, Injectable } from '@angular/core';
import { WikipediaArticle } from '../interfaces/wikipedia-article.interfase';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, pluck, tap } from 'rxjs';

interface WikipediaResponse {
  query: {
    search: WikipediaArticle[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class WikipediaSearchService {

  private http = inject(HttpClient);
  private readonly API_URL = 'https://en.wikipedia.org/w/api.php';
  private wikipediaCache = new Map<string, WikipediaArticle>();

  searchCountryArticle(country: string): Observable<WikipediaArticle> {
    if (this.wikipediaCache.has(country)) {
      return of(this.wikipediaCache.get(country) ?? {} as WikipediaArticle);
    }

    const params = {
      action: 'query',
      format: 'json',
      list: 'search',
      srsearch: country,
      utf8: '1',
      origin: '*'
    }

    return this.http.get<WikipediaResponse>(this.API_URL, {params})
      .pipe(
        map(response => response?.query?.search),
        map(articles => articles[0]),
        tap(article => this.wikipediaCache.set(country, article))
      );
  }
}
