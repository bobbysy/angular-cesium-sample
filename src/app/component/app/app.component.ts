import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Observable } from "rxjs";
import { OverlayContainer } from "@angular/cdk/overlay";
import { MapLayerService } from "../../service/map-layer.service";
import { ThemeService } from "../../service/theme.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = "angular-cesium-sample";

  isDarkTheme: Observable<boolean>;

  constructor(
    private themeService: ThemeService,
    private overlayContainer: OverlayContainer,
    public mapLayerService: MapLayerService
  ) {
    this.themeService = themeService;
    this.overlayContainer = overlayContainer;
    this.mapLayerService = mapLayerService;
  }

  ngOnInit(): void {
    // this.setTheme();
    this.isDarkTheme = this.themeService.getDarkThemeDynamic();
  }

  private setTheme(): void {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setDarkTheme();
    } else {
      this.themeService.setLightTheme();
    }
  }

  private toggleTheme(): void {
    if (this.themeService.isDarkTheme()) {
      this.themeService.setLightTheme();
    } else {
      this.themeService.setDarkTheme();
    }
    this.setTheme();
  }

  toggleDarkTheme(checked: boolean): void {
    this.themeService.setDarkThemeDynamic(checked);
    const effectiveTheme = checked ? "app-dark-theme" : "app-default-theme";
    const { classList } = this.overlayContainer.getContainerElement();
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes("-theme")
    );
    if (toRemove.length) {
      classList.remove(...toRemove);
    }
    classList.add(effectiveTheme);
  }

  toggleLayerVisibility(): void {
    this.mapLayerService.updateMapLayerData();
  }
}

export default "AppComponent";
