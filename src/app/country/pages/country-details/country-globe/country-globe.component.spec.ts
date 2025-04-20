import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryGlobeComponent } from './country-globe.component';

describe('CountryGlobeComponent', () => {
  let component: CountryGlobeComponent;
  let fixture: ComponentFixture<CountryGlobeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryGlobeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryGlobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
