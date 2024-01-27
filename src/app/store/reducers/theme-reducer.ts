import {TTheme} from "@Global/model";
import {Action, INIT} from "@ngrx/store";

export interface AppTheme {
    readonly theme: TTheme;
}

export const UPDATE_THEME = 'UPDATE_THEME';

export class UpdateTheme implements Action {
  type: string = UPDATE_THEME

  constructor(public updatedTheme: TTheme) {
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const THEMES : TTheme[] = [
  {name: 'angular-app-light-theme', displayName: 'Light', isDark: false},
  {name: 'angular-app-dark-theme', displayName: 'Dark', isDark: true},
];

export function themeReducer(state: TTheme = THEMES[0], action: Action): TTheme {
  switch(action.type) {
    case UPDATE_THEME:
      return (action as UpdateTheme).updatedTheme;
    case INIT:
      return THEMES[0]
    default:
      return state
  }
}
