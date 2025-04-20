import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
})

export class CountrySearchInputComponent {

  placeholder = input();
  initialValue = input<string>('');
  capitalToSearch = output<string>();
  inputSearch = linkedSignal<string>(() => this.initialValue() ?? '');

  search(value: string) {
    this.capitalToSearch.emit(value)
  }

  debounceEffect = effect((onClenaup) => {
    const value = this.inputSearch();

    const timeout = setTimeout(() => {
      this.search(value);
    } , 500);

    onClenaup(() => {
      clearTimeout(timeout);
    });
  });
}
