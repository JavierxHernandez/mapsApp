import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {LngLat, Map, Marker} from "maplibre-gl";

@Component({
  selector: 'app-minimap',
  templateUrl: './minimap.component.html',
  styleUrl: './minimap.component.css'
})
export class MinimapComponent implements AfterViewInit {

  @Input()
  public lngLat?: [number, number];

  @ViewChild('map')
  public divMap?: ElementRef;

  public map?: Map;

  ngAfterViewInit() {
    if (this.lngLat === undefined) throw new Error('LngLat is required');

    this.map = new Map({
      container: this.divMap?.nativeElement, // container id
      style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
      center: this.lngLat, // starting position [lng, lat]
      zoom: 6, // starting zoom
      interactive: false,
    });

    new Marker({
      color: '#FF5733',
      draggable: false,
    })
      .setLngLat(this.lngLat)
      .addTo(this.map);

  }

}
