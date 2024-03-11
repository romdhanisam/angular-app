import {Component} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatListModule} from "@angular/material/list";
import {RouterLink, RouterLinkActive} from "@angular/router";
@Component({
  selector: 'ot-nav-item',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
  ],
  templateUrl: 'navItem.template.html',
  styleUrls: ['navItem.style.scss']
})
export default class NavItemComponent {
}
