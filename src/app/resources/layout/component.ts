import {
  Component,
  DestroyRef,
  HostListener,
  inject,
  OnInit,
  ViewChild
} from "@angular/core";
import {MatDrawerMode, MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {environment} from "../../../environments/environment";
import {MatRippleModule} from "@angular/material/core";
import {BehaviorSubject} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import NavItemComponent from "@Resource/layout/nav-item/component";
import LayoutSmComponent from "@Resource/layout/layout-sm/component";

@Component({
  selector: 'ot-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule, MatDividerModule, MatListModule, MatToolbarModule, MatIconModule, MatButtonModule,
    MatRippleModule, MatDialogModule,
    LayoutSmComponent, NavItemComponent
  ],
  providers: [MatDialog],
  templateUrl: 'template.html',
  styleUrls: ['style.scss']
})
export default class LayoutComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  mode: MatDrawerMode;
  openSidenav:boolean;
  private destroyRef = inject(DestroyRef);
  environment = environment;
  isProdMode: boolean = environment.production;
  public screenWidth$ = new BehaviorSubject<number>(window.innerWidth);

  constructor(private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.screenWidth$.asObservable().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(width => {
       if(width < 640) {
        this.mode = 'over';
        if(this.sidenav?.opened) {
          this.dialog.open(LayoutSmComponent,
              {
                maxWidth: '100vw',
                maxHeight: '100vh',
                height: '100%',
                width: '100%',
              }).afterClosed().pipe(takeUntilDestroyed(this.destroyRef))
              .subscribe((openSidenav: any) => this.openSidenav = !openSidenav);
        }
       }
    });
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

  @HostListener('window:resize', ['$event'])
  private onResize(event: any) {
    this.screenWidth$.next(event.target.innerWidth);
  }

  // @HostListener("window:scroll", ["$event"])
  // onWindowScroll(event: any) {
  //   event.stopPropagation();
  // }

  toggle() {
      this.dialog.open(LayoutSmComponent, {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%'})
          .afterClosed().pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((openSidenav: any) => this.openSidenav = !openSidenav);
  }

  openedStart() {
    this.sidenav.mode = "side";
    this.sidenav.open();
  }

}
