import { Component, input } from '@angular/core';
import { CountUpModule } from 'ngx-countup';


@Component({
  selector: 'app-count-up',
  imports: [ CountUpModule ],
  templateUrl: './count-up.component.html',
})
export class CountUpComponent {

  value = input.required<number>();
  options = input<object>({});
}
