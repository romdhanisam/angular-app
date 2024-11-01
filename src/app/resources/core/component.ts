import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'ot-main',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './template.html'
})
export default class MainComponent {}
