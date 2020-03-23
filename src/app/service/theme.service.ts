import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { dark, light, Theme } from "../component/theme/theme";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private active: Theme = light;

  private availableThemes: Theme[] = [light, dark];

  private darkTheme = new Subject<boolean>();

  private darkTheme$ = this.darkTheme.asObservable();

  getAvailableThemes(): Theme[] {
    return this.availableThemes;
  }

  getActiveTheme(): Theme {
    return this.active;
  }

  isDarkTheme(): boolean {
    return this.active.name === dark.name;
  }

  setDarkTheme(): void {
    this.setActiveTheme(dark);
  }

  setLightTheme(): void {
    this.setActiveTheme(light);
  }

  setActiveTheme(theme: Theme): void {
    this.active = theme;

    Object.keys(this.active.properties).forEach((property) => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }

  getDarkThemeDynamic(): Observable<boolean> {
    return this.darkTheme$;
  }

  setDarkThemeDynamic(isDarkTheme: boolean): void {
    this.darkTheme.next(isDarkTheme);
  }
}

export default "ThemeService";
