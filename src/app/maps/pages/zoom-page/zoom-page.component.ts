import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {LngLat, Map} from "maplibre-gl";

@Component({
  selector: 'zoom-page',
  templateUrl: './zoom-page.component.html',
  styleUrl: './zoom-page.component.css'
})
export class ZoomPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map')
  public divMap?: ElementRef;

  public zoom: number = 4;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-68.1569328399101, 7.0097687884554745);

  ngAfterViewInit(): void {
    if (this.divMap === undefined) throw ('divMap is undefined');

    this.map = new Map({
      container: this.divMap?.nativeElement, // container id
      style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom // starting zoom
    });

    this.mapListener();
  }

  ngOnDestroy(): void {
    if (this.map === undefined) throw ('map is undefined');
    this.map?.remove();
  }

  mapListener() {
    if (this.map === undefined) throw ('map is undefined');

    this.map.on('zoom', () => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', () => {
      if (this.map!.getZoom() < 18) return;

      this.map!.zoomTo(18);
    });

    this.map.on('moveend', () => {
      this.currentLngLat = this.map!.getCenter();
    });
  }

  zoomIn() {
    if (this.map === undefined) throw ('map is undefined');
    this.map!.zoomIn();
  }

  zoomOut() {
    if (this.map === undefined) throw ('map is undefined');
    this.map!.zoomOut();
  }

  zoomChange(value: string) {
    if (this.map === undefined) throw ('map is undefined');
    this.map!.setZoom(parseInt(value));
  }

}
