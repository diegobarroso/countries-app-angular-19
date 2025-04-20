import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySearchInputComponent } from './country-search-input.component';

describe('CountrySearchInputComponent', () => {
  let component: CountrySearchInputComponent;
  let fixture: ComponentFixture<CountrySearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountrySearchInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountrySearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
