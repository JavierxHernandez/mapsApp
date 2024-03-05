import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MapsLayoutComponent } from './layouts/maps-layout/maps-layout.component';
import { MapsRoutingModule } from './maps-routing.module';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { MinimapComponent } from './components/minimap/minimap.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { ZoomPageComponent } from './pages/zoom-page/zoom-page.component';



@NgModule({
  declarations: [
    FullScreenPageComponent,
    MapsLayoutComponent,
    MarkersPageComponent,
    MinimapComponent,
    PropertiesPageComponent,
    SideMenuComponent,
    ZoomPageComponent,
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
