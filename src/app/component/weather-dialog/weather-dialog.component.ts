import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-weather-dialog",
  templateUrl: "./weather-dialog.component.html",
  styleUrls: ["./weather-dialog.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherDialogComponent implements OnInit, OnDestroy {
  public weather$: Observable<any>;

  public weather: any;

  public weatherEntityFn: any;

  private stopper$ = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cd: ChangeDetectorRef
  ) {
    this.cd = cd;
  }

  ngOnInit(): void {
    this.weatherEntityFn = this.data.weatherEntityFn;
    this.weather = this.data.weather;
    this.weather$ = this.data.weatherObservable;

    this.cd.detectChanges();
    this.weather$ = this.data.weatherObservable.pipe(takeUntil(this.stopper$));
    this.weather$.subscribe((weather) => {
      this.weather = { ...weather };
      this.changePosToDeg(weather);
      this.cd.detectChanges();
    });
  }

  private changePosToDeg = (weather: any) => {
    const pos = Cesium.Cartographic.fromCartesian(weather.position);
    // console.log(pos);
    // this.weather.position = {
    //   lat: this.toDegrees(pos.latitude),
    //   long: this.toDegrees(pos.longitude)
    // };
  };

  ngOnDestroy(): void {
    this.stopper$.next(true);
  }

  toDegrees = (value: number) => {
    const result =
      Math.round((360 - (((180 * value) / Math.PI) % 360.0)) * 100) / 100;
    return result < 0 ? result + 360 : result;
  };

  fixTextSize = (text: string) => {
    if (text && text.length > 25) {
      return text.slice(0, 25).concat("...");
    }
    return text;
  };
}

export default "WeatherDialogComponent";
