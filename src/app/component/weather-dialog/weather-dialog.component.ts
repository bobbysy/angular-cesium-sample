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

  private stopper$ = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cd: ChangeDetectorRef
  ) {
    this.cd = cd;
  }

  ngOnInit(): void {
    this.weather = this.data.weather;
    this.weather$ = this.data.weatherObservable;

    this.cd.detectChanges();
    this.weather$ = this.data.weatherObservable.pipe(takeUntil(this.stopper$));
    this.weather$.subscribe((weather) => {
      this.weather = { ...weather };
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.stopper$.next(true);
  }
}

export default "WeatherDialogComponent";
