import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Map} from 'maplibre-gl';

@Component({
  selector: 'full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css'
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map')
  public divMap?: ElementRef;

  ngAfterViewInit(): void {
    if (this.divMap === undefined) throw ('divMap is undefined');

    const map = new Map({
      container: this.divMap?.nativeElement, // container id
      style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 4 // starting zoom
    });
  }

}
