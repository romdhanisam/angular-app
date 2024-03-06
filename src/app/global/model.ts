export interface TTheme {
  name: string;
  displayName: string;
  isDark: boolean;
}

export enum TKIND {
  PROJECT = "PROJECT"
}

export interface IBASE  {
  kind: TKIND;
  creationDate: Date | string;
  updatingDate: Date | string;
  deletingDate: Date | string;
}

export interface ITemplate extends IBASE {
  id: string;
  name: string;
  version: {
    id: string;
    text: string
  };
}

export class Template implements ITemplate {
  id: string;
  name: string;
  version: {
    id: string;
    text: string
  };
  kind: TKIND = TKIND.PROJECT;
  creationDate: Date | string;
  updatingDate: Date | string;
  deletingDate: Date | string;
    constructor(name?: string, version?: { id: string; text: string },
                id?: string ,creationDate?: any, updatingDate?: any) {
      this.id = id;
      this.name = name;
      this.version = version;
      this.creationDate = creationDate;
      this.updatingDate = updatingDate;
    }
}

export const optionsCreationDate: Intl.DateTimeFormatOptions =
{ weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',hour: 'numeric', minute: 'numeric' };
export const optionsUpdatingDate: Intl.DateTimeFormatOptions =
{ weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',hour: 'numeric', minute: 'numeric'};
