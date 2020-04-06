import { Component, NgZone, OnInit, ViewChild } from "@angular/core";
import {
  AcEntity,
  AcLayerComponent,
  AcNotification,
  CameraService,
  CesiumEvent,
  MapEventsManagerService,
  PickOptions,
} from "angular-cesium";
import { Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { WeatherDataServiceProvider } from "../../utils/services/dataProviders/weather-data-service-provider.service";
import { WeatherDialogComponent } from "../weather-dialog/weather-dialog.component";
import { ThemeService } from "../../service/theme.service";

@Component({
  selector: "app-weather-data-layer",
  templateUrl: "./weather-data-layer.component.html",
  providers: [WeatherDataServiceProvider, ThemeService],
  styleUrls: ["./weather-data-layer.component.scss"],
})
export class WeatherDataLayerComponent implements OnInit {
  @ViewChild(AcLayerComponent, { static: true }) layer: AcLayerComponent;

  private weather$: Observable<AcNotification>;

  private lastPickData: any;

  private isDialogOpen = false;

  constructor(
    private ngZone: NgZone,
    public dialog: MatDialog,
    private mapEventsManager: MapEventsManagerService,
    public weatherDataServiceProvider: WeatherDataServiceProvider,
    private themeService: ThemeService,
    private cameraService: CameraService
  ) {
    this.weather$ = weatherDataServiceProvider.get();
  }

  ngOnInit(): void {
    const mouseOverObservable = this.mapEventsManager.register({
      entityType: AcEntity,
      event: CesiumEvent.MOUSE_MOVE,
      pick: PickOptions.PICK_FIRST,
      priority: 2,
    });
    mouseOverObservable.subscribe((event) => {
      const data = event.entities !== null ? event.entities[0] : null;
      if (this.lastPickData && (!data || data.name !== this.lastPickData.id)) {
        this.lastPickData.picked = false;
        this.layer.update(this.lastPickData, this.lastPickData.id);
      }
      if (data && (!this.lastPickData || data.id !== this.lastPickData.id)) {
        data.picked = true;
        this.layer.update(data, data.id);
      }
      this.lastPickData = data;
    });

    // Open dialog on double click
    const doubleClickObservable = this.mapEventsManager.register({
      entityType: AcEntity,
      event: CesiumEvent.LEFT_DOUBLE_CLICK,
      pick: PickOptions.PICK_FIRST,
      priority: 2,
    });
    doubleClickObservable.subscribe((event) => {
      const data = event.entities !== null ? event.entities[0] : null;
      if (data) {
        this.ngZone.run(() => {
          this.openDialog(data, event.entities[0]);
        });
      }
    });
  }

  openDialog(weatherData: any, cesiumEntity: any): void {
    weatherData.dialogOpen = true;
    weatherData.picked = false;
    weatherData.icon = this.weatherIconFromForecast(weatherData.forecast);
    this.layer.update(weatherData, weatherData.id);
    this.dialog.closeAll();
    const weatherObservable = this.getSingleTrackObservable(weatherData.id);
    this.dialog
      .open(WeatherDialogComponent, {
        data: {
          weatherObservable,
          weather: { ...weatherData },
        },
        position: {
          top: "64px",
          left: "0",
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.cameraService.untrackEntity();
        weatherData.dialogOpen = false;
        this.isDialogOpen = false;
      });
    this.isDialogOpen = true;
  }

  getSingleTrackObservable(weatherId: string) {
    return this.weather$.pipe(
      filter((notification) => notification.id === weatherId),
      map((notification) => notification.entity)
    );
  }

  getTextColor = (): any => Cesium.Color.BLACK;

  weatherIconFromForecast(forecast: string): string {
    // Strip forecast of brackets, replace ' ' with '_' and convert to lowercase
    const themeName = this.themeService.getActiveTheme().name;

    // light rain => Drizzle
    // partly cloudy (day) / partly cloudy (night)

    let weatherIcon = forecast
      .toLowerCase()
      .replace(/\(/g, "")
      .replace(/\)/g, "")
      .replace(/ /g, "_");

    if (weatherIcon === "light_rain") {
      weatherIcon = "drizzle";
    }

    return `assets/weather-icons/${themeName}/${weatherIcon}_${themeName}_color_96dp.png`;
  }
}

export default "WeatherDataLayerComponent";
