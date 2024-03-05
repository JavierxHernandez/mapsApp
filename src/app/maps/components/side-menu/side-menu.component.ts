import {Component} from '@angular/core';

interface MenuItem {
  name: string;
  route: string;
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  public menuItems: MenuItem[] = [
    {route: '/maps/full-screen', name: 'FullScreen'},
    {route: '/maps/zoom', name: 'ZoomRange'},
    {route: '/maps/markers', name: 'Markers'},
    {route: '/maps/properties', name: 'Houses'},
  ]

}
