import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'ot-child',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './child.component.html'
})
export default class ChildComponent {

}
