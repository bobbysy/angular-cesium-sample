import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import {
  AngularCesiumModule,
  AngularCesiumWidgetsModule,
} from "angular-cesium";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from "@angular/common/http";
import { SharedMaterialModule } from "./shared/material-module";
import { ThemeModule } from "./component/theme/theme.module";
import { AppComponent } from "./component/app/app.component";
import { MapComponent } from "./component/map/map.component";
import { MapToolbarComponent } from "./component/map-toolbar/map-toolbar.component";
import { routes } from "./app.route";
import { MapLayerComponent } from "./component/map-layer/map-layer.component";
import { WeatherDataLayerComponent } from "./component/weather-data-layer/weather-data-layer.component";
import { WeatherDialogComponent } from "./component/weather-dialog/weather-dialog.component";
import { CustomIconRegistry, SVG_ICONS } from "./shared/custom-icon-registry";
import { MatIconRegistry } from "@angular/material/icon";

// These are the hardcoded inline svg sources to be used by the `<mat-icon>` component.
export const svgIconProviders = [
  // Namespace: logos
  {
    provide: SVG_ICONS,
    useValue: {
      namespace: "logos",
      name: "github",
      svgSource:
        '<svg focusable="false" viewBox="0 0 51.8 50.4" xmlns="http://www.w3.org/2000/svg">' +
        '<path d="M25.9,0.2C11.8,0.2,0.3,11.7,0.3,25.8c0,11.3,7.3,20.9,17.5,24.3c1.3,0.2,1.7-0.6,1.7-1.2c0-0.6,0-2.6,0-4.8' +
        "c-7.1,1.5-8.6-3-8.6-3c-1.2-3-2.8-3.7-2.8-3.7c-2.3-1.6,0.2-1.6,0.2-1.6c2.6,0.2,3.9,2.6,3.9,2.6c2.3,3.9,6,2.8,7.5,2.1" +
        "c0.2-1.7,0.9-2.8,1.6-3.4c-5.7-0.6-11.7-2.8-11.7-12.7c0-2.8,1-5.1,2.6-6.9c-0.3-0.7-1.1-3.3,0.3-6.8c0,0,2.1-0.7,7,2.6" +
        "c2-0.6,4.2-0.9,6.4-0.9c2.2,0,4.4,0.3,6.4,0.9c4.9-3.3,7-2.6,7-2.6c1.4,3.5,0.5,6.1,0.3,6.8c1.6,1.8,2.6,4.1,2.6,6.9" +
        "c0,9.8-6,12-11.7,12.6c0.9,0.8,1.7,2.4,1.7,4.7c0,3.4,0,6.2,0,7c0,0.7,0.5,1.5,1.8,1.2c10.2-3.4,17.5-13,17.5-24.3" +
        'C51.5,11.7,40.1,0.2,25.9,0.2z" />' +
        "</svg>",
    },
    multi: true,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapToolbarComponent,
    MapLayerComponent,
    WeatherDataLayerComponent,
    WeatherDialogComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ThemeModule,
    HttpClientModule,
    // Angular Material
    SharedMaterialModule,
    // Angular Cesium
    AngularCesiumModule.forRoot(),
    // Router
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    AngularCesiumWidgetsModule,
  ],
  providers: [
    { provide: MatIconRegistry, useClass: CustomIconRegistry },
    svgIconProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export default "AppModule";
