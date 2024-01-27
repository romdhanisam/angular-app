import {NgModule} from '@angular/core';
import { CompoComponent } from './compo.component';
import {CommonModule} from "@angular/common";
import {SharedModule} from "./shared.module";


@NgModule({
  declarations: [
    CompoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [],
  exports: [
    CompoComponent,
  ],
})
export class CompoModule { }
