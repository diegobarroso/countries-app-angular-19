import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, input, OnDestroy, viewChild } from '@angular/core';
import Globe from 'globe.gl';

@Component({
  selector: 'app-country-globe',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #globeContainerRef class="max-w-full overflow-auto grid content-center"></div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .marker-label {
      @apply absolute;
      @apply transform -translate-x-1/2 -translate-y-full;
    }
  `]
})
export class CountryGlobeComponent implements AfterViewInit, OnDestroy {

  lat = input.required<number>();
  lng = input.required<number>();
  country = input.required<string>();
  globeContainerRef = viewChild<ElementRef>('globeContainerRef');
  private globeInstance: any;

  ngAfterViewInit() {
    const markerSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5"/></svg>`;
    const globeEl = new Globe(this.globeContainerRef()!.nativeElement)
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundImageUrl('https://unpkg.com/three-globe/example/img/night-sky.png')
      .showAtmosphere(true)
      .atmosphereColor('#3a228a')
      .atmosphereAltitude(0.25)
      .htmlElementsData([{ lat: this.lat(), lng: this.lng(), country: this.country() }])
      .htmlElement((d: any) => {
        const el = document.createElement('div');
        el.className = 'marker-label';
        el.innerHTML = `${markerSvg} <span class="text-white">${d.country}</span>`;
        return el;
      })
      .htmlLat((d: any) => d.lat)
      .htmlLng((d: any) => d.lng)
      .htmlAltitude(0.02)
      .enablePointerInteraction(true);

    this.globeInstance = globeEl;

    // Centrar la cámara en las coordenadas del marcador
    globeEl.onGlobeReady(() => {
      globeEl.pointOfView({ lat: this.lat(), lng: this.lng(), altitude: 1.5 }, 3000);
    });
      }

  ngOnDestroy() {
    if (this.globeInstance && this.globeInstance.renderer()) {
      this.globeInstance.renderer().dispose();
    }
  }
}
