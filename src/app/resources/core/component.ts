import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import ButtonOverviewComponent from "@Resource/core/button/button-overview";

@Component({
  selector: 'ot-main',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonOverviewComponent],
  template: `<router-outlet>
    <ot-button/>
  </router-outlet>`
})
export default class MainComponent {}
