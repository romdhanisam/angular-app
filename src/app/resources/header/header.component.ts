import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Store} from "@ngrx/store";
import {AppTheme, THEMES, UpdateTheme} from "@Store/reducers/theme-reducer";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AboutComponent} from "@Resource/header/about/component";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'ot-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    //Mat
    MatSidenavModule,MatDividerModule,MatListModule,MatToolbarModule,MatIconModule,MatButtonModule,
    AboutComponent],
  templateUrl: 'header.template.html',
  styleUrls: ['header.style.scss']
})
export default class HeaderComponent implements AfterViewInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  env: string;
  isProdMode: boolean;
  isDarkMode = false;
  constructor(private readonly store: Store<AppTheme>,
              private observer: BreakpointObserver
  ) {
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

  ngAfterViewInit() {
    this.observer.observe(["(max-width: 800px)"]).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = "over";
        this.sidenav.close();
      } else {
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    });
  }

}
