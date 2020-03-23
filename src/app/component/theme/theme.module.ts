import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ThemeService } from "../../service/theme.service";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ThemeService],
})
export class ThemeModule {}

export default "ThemeModule";
