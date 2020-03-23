/* global Cesium */
import { Component, ViewChild } from "@angular/core";
import {
  CameraService,
  CirclesEditorService,
  EditorObservable,
  EllipsesEditorService,
  PolygonsEditorService,
  PolylineEditorObservable,
  PolylinesEditorService,
  RangeAndBearingComponent,
} from "angular-cesium";

@Component({
  selector: "app-map-toolbar",
  templateUrl: "./map-toolbar.component.html",
  styleUrls: ["./map-toolbar.component.scss"],
  providers: [
    CirclesEditorService,
    EllipsesEditorService,
    PolygonsEditorService,
    PolylinesEditorService,
  ],
})
export class MapToolbarComponent {
  rnb: PolylineEditorObservable;

  Cesium = Cesium;

  editing$: EditorObservable<any>;

  @ViewChild("rangeAndBearing")
  private rangeAndBearing: RangeAndBearingComponent;

  constructor(
    private cameraService: CameraService,
    private circlesEditor: CirclesEditorService,
    private ellipsesEditor: EllipsesEditorService,
    private polygonsEditor: PolygonsEditorService,
    private polylineEditor: PolylinesEditorService
  ) {
    this.cameraService = cameraService;
    this.circlesEditor = circlesEditor;
    this.ellipsesEditor = ellipsesEditor;
    this.polygonsEditor = polygonsEditor;
    this.polylineEditor = polylineEditor;
  }

  createRangeAndBearing(): void {
    if (this.rnb) {
      this.rnb.dispose();
      this.rnb = undefined;
    }

    this.rnb = this.rangeAndBearing.create();
  }

  drawCircle(): void {
    this.startEdit(this.circlesEditor.create());
  }

  drawEllipse(): void {
    this.startEdit(this.ellipsesEditor.create());
  }

  drawPolygon(): void {
    this.startEdit(this.polygonsEditor.create());
  }

  drawPolyline(): void {
    this.startEdit(this.polylineEditor.create());
  }

  startEdit(editor: EditorObservable<any>): void {
    if (this.editing$) {
      this.stopEdit();
    }
    this.editing$ = editor;
  }

  stopEdit(): void {
    if (this.editing$) {
      this.editing$.dispose();
      this.editing$ = undefined;
    }
  }

  goHome(): void {
    this.cameraService.cameraFlyTo({
      destination: this.Cesium.Cartesian3.fromDegrees(
        103.851959,
        1.29027,
        200000
      ),
    });
  }
}

export default "MapToolbarComponent";
