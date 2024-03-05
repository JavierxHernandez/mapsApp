import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {LngLat, Map, Marker} from "maplibre-gl";

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  selector: 'markers-page',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map')
  public divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public zoom: number = 6;
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

    this.loadFromLocalStorage();

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Example';
    //
    // const marker = new Marker({
    //   color: '#FF5733',
    //   draggable: true,
    //   element: markerHtml
    // })
    //   .setLngLat(this.currentLngLat)
    //   .addTo(this.map);
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  createMarker() {
    if (this.map === undefined) throw ('map is undefined');

    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMaker(lngLat, color);
  }

  addMaker(lngLat: LngLat, color: string) {
    if (this.map === undefined) throw ('map is undefined');

    const marker = new Marker({
      color: color,
      draggable: true
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({color, marker});
    this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage());
  }

  deleteMarker(i: number) {
    if (this.map === undefined) throw ('map is undefined');

    this.markers[i].marker.remove();
    this.markers.splice(i, 1);

  }

  flyTo(marker: Marker) {
    if (this.map === undefined) throw ('map is undefined');
    this.map.flyTo({
      zoom: 5,
      center: marker.getLngLat(),
      essential: true,
      speed: 0.5,
    });
  }

  saveToLocalStorage() {
    if (this.map === undefined) throw ('map is undefined');
    const plainMarker: PlainMarker[] = this.markers.map(({color, marker}) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      };
    });

    localStorage.setItem('plainMarker', JSON.stringify(plainMarker));
  }

  loadFromLocalStorage() {
    if (this.map === undefined) throw ('map is undefined');
    const plainMarkerString = localStorage.getItem('plainMarker');

    if (plainMarkerString === null) return;
    const plainMarker: PlainMarker[] = JSON.parse(plainMarkerString);

    plainMarker.forEach(({color, lngLat}) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);

      this.addMaker(coords, color);
    });
  }

}
