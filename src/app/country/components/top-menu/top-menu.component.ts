import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'country-top-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './top-menu.component.html',
})
export class TopMenuComponent implements OnInit {

  theme = 'dracula';

  ngOnInit(): void {
    this.changeTheme(this.theme);
  }

  changeTheme(theme: string) {
    this.theme = theme;
    const htmlTag = document.querySelector('html');
    if (htmlTag) {
      htmlTag.setAttribute('data-theme', theme);
    }
    const bodyTag = document.querySelector('body');
    if (bodyTag) {
      bodyTag.setAttribute('data-theme', theme);
    }
  }
}
