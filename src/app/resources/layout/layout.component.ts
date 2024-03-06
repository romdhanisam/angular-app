import {Component, ViewChild} from "@angular/core";
import {MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {Store} from "@ngrx/store";
import {AppTheme, THEMES, UpdateTheme} from "@Store/reducers/theme-reducer";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {environment} from "../../../environments/environment";
import {MatRippleModule} from "@angular/material/core";


@Component({
  selector: 'ot-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    //Mat
    MatSidenavModule,MatDividerModule,MatListModule,MatToolbarModule,MatIconModule,MatButtonModule,
      MatRippleModule
  ],
  templateUrl: 'layout.template.html',
  styleUrls: ['layout.style.scss']
})
export default class LayoutComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  env: string;
  isProdMode: boolean;
  isDarkMode = false;
  constructor(private readonly store: Store<AppTheme>) {
    this.env = environment.env;
    this.isProdMode = environment.production;
  }

  changeTheme(newThemeName: string) {
    this.isDarkMode = !this.isDarkMode;
    this.store.dispatch(new UpdateTheme(THEMES.find(value => value.displayName == newThemeName)));
  }

  getDebugClass(): string {
    switch (environment.env) {
      case 'DEV':
        return 'ot-toolbar-success';
      case 'QA':
        return 'ot-toolbar-warning';
      default:
        return '';
    }
  }

  openedStart() {
    this.sidenav.mode = "side";
    this.sidenav.open();
  }


}
