import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MapsLayoutComponent} from "./layouts/maps-layout/maps-layout.component";
import {FullScreenPageComponent} from "./pages/full-screen-page/full-screen-page.component";
import {MarkersPageComponent} from "./pages/markers-page/markers-page.component";
import {ZoomPageComponent} from "./pages/zoom-page/zoom-page.component";
import {PropertiesPageComponent} from "./pages/properties-page/properties-page.component";

const routes: Routes = [
  {
    path: '',
    component: MapsLayoutComponent,
    children: [
      {
        path: 'full-screen',
        component: FullScreenPageComponent,
      },
      {
        path: 'zoom',
        component: ZoomPageComponent,
      },
      {
        path: 'markers',
        component: MarkersPageComponent,
      },
      {
        path: 'properties',
        component: PropertiesPageComponent,
      },
      {
        path: '**',
        redirectTo: 'full-screen',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule {
}
