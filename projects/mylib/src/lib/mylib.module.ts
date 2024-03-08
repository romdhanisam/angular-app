import {NgModule} from '@angular/core';
import {MylibComponent} from './mylib.component';
import {CommonModule} from "@angular/common";
import {SharedModule} from "./shared.module";


@NgModule({
  declarations: [MylibComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [],
  exports: [
    MylibComponent,
  ],
})
export class MylibModule { }
