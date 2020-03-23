import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MapLayerService } from "../../service/map-layer.service";

@Component({
  selector: "app-map-layer",
  templateUrl: "./map-layer.component.html",
  styleUrls: ["./map-layer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapLayerComponent {
  constructor(public mapLayerService: MapLayerService) {
    this.mapLayerService = mapLayerService;
  }
}

export default "MapLayerComponent";
