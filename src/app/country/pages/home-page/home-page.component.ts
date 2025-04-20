import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
  styles: `.bg-image {
    background-image: url('public/mapamundi.png');
  }`
})
export class HomePageComponent {

}
