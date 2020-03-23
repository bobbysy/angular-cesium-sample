import { Routes } from "@angular/router";
import { MapComponent } from "./component/map/map.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/map",
    pathMatch: "full",
  },
  {
    path: "map",
    component: MapComponent,
    // canActivate: [AuthGuard]
  },
];

export default "routes";
