import { ChangeDetectionStrategy, Component, inject, input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { RESTCountry } from '../../../interfaces/rest-country.interface';
import { CountUpComponent } from "../../../../shared/components/count-up/count-up.component";
import { WikipediaSearchService } from '../../../services/wikipedia-search.service';
import { WikipediaArticle } from '../../../interfaces/wikipedia-article.interfase';

@Component({
  selector: 'app-country-information',
  imports: [CountUpComponent],
  templateUrl: './country-information.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryInformationComponent implements OnChanges{

  wikipediaSearch = inject(WikipediaSearchService);
  wikipediaArticle = signal<WikipediaArticle | null>(null);
  country = input.required<RESTCountry>();
  countUpOptions = {
    enableScrollSpy: true,
    scrollSpyOnce: true,
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.wikipediaSearch.searchCountryArticle(this.country().name.common)
      .subscribe(article => this.wikipediaArticle.set(article));
  }

  getCurrency(currency: Object): {name: string, symbol: string}[] {
    return Object.values(currency);
  }
  getLanguage(language: Object): {name: string}[] {
    return Object.values(language);
  }
}
