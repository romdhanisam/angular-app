import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { projectReducer } from '@Store/reducers/app-reducer';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { themeReducer } from "@Store/reducers/theme-reducer";
import LayoutComponent from "@Resource/layout/layout.component";

export const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
      { path: 'main',
        loadComponent: () => import('@Resource/core/main.component'),
      },
      { path: 'about',
        loadComponent: () => import('@Global/foundation/about.component'),
      },
      {path: '', redirectTo: 'main', pathMatch: 'full'},
    ]
  },
    {path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: '**', redirectTo: 'main'},
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    StoreModule.forRoot({ projects: projectReducer, theme: themeReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: environment.production,
    //   // Register the ServiceWorker as soon as the application is stable
    //   // or after 30 seconds (whichever comes first).
    //   registrationStrategy: 'registerWhenStable:30000'
    // }),

    ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
