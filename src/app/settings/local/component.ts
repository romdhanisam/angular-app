import {Component, OnInit} from '@angular/core';
import {TTheme} from "@Global/model";
import {MatSelectModule} from "@angular/material/select";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Store} from "@ngrx/store";
import {AppTheme, THEMES, UpdateTheme} from "@Store/reducers/theme-reducer";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'ot-local-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        subscriptSizing: 'dynamic',
      }
    }
  ],
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
})
export default class LocalSettingsComponent implements OnInit{
  themeControl: FormControl;
  themes: TTheme[] = THEMES;
  systemTheme = 'Light';
  languageControl: FormControl;
  languages: string[] = [];
  systemLanguage = 'English';
  constructor(public readonly store: Store<AppTheme>) {}

  ngOnInit(): void {
    this.themeControl = new FormControl<string>(this.systemTheme)
    this.languageControl = new FormControl<string>(this.systemLanguage)
  }

  changeTheme(newThemeName: string) {
    this.store.dispatch(new UpdateTheme(this.themes.find(value => value.displayName == newThemeName)));
  }
}
