import {NgModule} from '@angular/core';
import {MylibComponent} from './mylib.component';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {SharedModule} from "./shared.module";
import {NgxPowsyblSldViewerComponent} from "./ngx-powsybl-sld-viewer/ngx-powsybl-sld-viewer.component";


@NgModule({
  declarations: [MylibComponent, NgxPowsyblSldViewerComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgOptimizedImage,
  ],
  providers: [],
  exports: [
    MylibComponent,
    NgxPowsyblSldViewerComponent
  ],
})
export class MylibModule { }
