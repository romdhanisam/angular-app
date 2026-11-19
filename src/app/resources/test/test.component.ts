import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

// import {MylibModule} from "@CompoLib";
import {MylibModule} from "@cell4rom/mylib"; // prod version

@Component({
  standalone: true,
  selector: 'ot-lib-test',
  templateUrl: './test.component.html',
  imports: [CommonModule, RouterModule, MylibModule],
})
export default class TestComponent {

}
