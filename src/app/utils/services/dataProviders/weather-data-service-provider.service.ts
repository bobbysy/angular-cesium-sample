/* global Cesium */
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AcEntity, AcNotification, ActionType } from "angular-cesium";
import { Observable, Subscriber } from "rxjs";
import { publish } from "rxjs/operators";

export interface TwoHourWeatherForecast {
  area_metadata: [
    {
      name: string;
      label_location: {
        latitude: number;
        longitude: number;
      };
    }
  ];
  api_info: {
    status: string;
  };
  items: [
    {
      update_timestamp: number;
      timestamp: number;
      valid_period: {
        start: number;
        end: number;
      };
      forecasts: [
        {
          area: string;
          forecast: string;
        }
      ];
    }
  ];
}

@Injectable({
  providedIn: "root",
})
export class WeatherDataServiceProvider {
  private dataCache = new Map<string, AcNotification>();

  private readonly weatherData$;

  constructor(public http: HttpClient) {
    const dateTime = new Date();
    dateTime.setUTCHours(dateTime.getHours());
    dateTime.setMinutes(0, 0, 0);
    const dataAPIURL =
      "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast";
    const term = `date_time=${dateTime.toISOString().substr(0, 19)}`;
    this.weatherData$ = publish()(
      new Observable((observer: Subscriber<any>) => {
        this.mapDataToAcNotification(observer, dataAPIURL, term);
        setInterval(() => {
          this.mapDataToAcNotification(observer, dataAPIURL, term);
        }, 1.8e6);
      })
    );
    this.weatherData$.connect();
  }

  private static convertToCesiumEntity(
    data: any,
    forecastData: string
  ): AcNotification {
    const weather = {
      image: "assets/room-24px.svg",
      scale: 0.2,
      position: Cesium.Cartesian3.fromDegrees(
        data.label_location.longitude,
        data.label_location.latitude
      ),
      forecast: forecastData,
      ...data,
    };
    return {
      id: data.name,
      entity: new AcEntity(weather),
      actionType: ActionType.ADD_UPDATE,
    };
  }

  private saveInCache(data: AcNotification): void {
    this.dataCache.set(data.id, data);
  }

  private mapDataToAcNotification(
    observer: Subscriber<any>,
    dataAPIURL: string,
    term: string
  ): void {
    this.getWeatherData(dataAPIURL, term).subscribe(
      (serverData: TwoHourWeatherForecast) => {
        console.log(serverData.items[0].timestamp);
        serverData.area_metadata
          .filter(
            (data) =>
              data.name &&
              data.label_location.latitude &&
              data.label_location.longitude
          )
          .map((data: any) => {
            return serverData.items[0].forecasts
              .filter((forecast) => forecast.area === data.name)
              .map((forecast) => {
                const dataNotification = WeatherDataServiceProvider.convertToCesiumEntity(
                  data,
                  forecast.forecast
                );
                if (!this.dataCache.has(data.name)) {
                  this.saveInCache(dataNotification);
                }
                observer.next(dataNotification);
                return dataNotification;
              });
          });
      }
    );
  }

  private getWeatherData(dataAPIURL: string, term: string): Observable<any> {
    return this.http.get(`${dataAPIURL}?${term}`);
  }

  get(): Observable<AcNotification> {
    return this.weatherData$;
  }
}

export default "WeatherDataServiceProvider";
