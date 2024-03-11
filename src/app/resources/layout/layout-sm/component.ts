import {Component, DestroyRef, HostListener, inject, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {MatDividerModule} from "@angular/material/divider";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MAT_RIPPLE_GLOBAL_OPTIONS, MatRippleModule} from "@angular/material/core";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {BehaviorSubject} from "rxjs";
import {environment} from "../../../../environments/environment";
import packageInfo from "../../../../../package.json";
import NavItemComponent from "@Resource/layout/nav-item/component";

@Component({
  selector: 'ot-layout-sm',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule, MatToolbarModule, MatIconModule, MatButtonModule,
    MatRippleModule, MatDialogModule,
    NavItemComponent
  ],
  providers: [{provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: {disabled: true}}],
  templateUrl: 'template.html',
  styleUrls: ['../style.scss']
})
export default class LayoutSmComponent implements OnInit{
  private screenWidth$ = new BehaviorSubject<number>(window.innerWidth);
  private destroyRef = inject(DestroyRef);
  public version: string = packageInfo.version;
  isProdMode: boolean = environment.production;
  protected readonly environment = environment;

  constructor(private readonly router: Router,
              public readonly dialogRef: MatDialogRef<Component>) {}

  ngOnInit(): void {
    this.screenWidth$.asObservable().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(width => {
      if (width > 640) this.dialogRef.close(true);
    });
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((_: any) =>  this.dialogRef.close(true));
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

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(event: any) {
    event.stopPropagation();
  }

}
