import {Action} from "@ngrx/store";
import { ITemplate } from "src/app/global/model";

export const ADD_PROJECT = 'ADD_PROJECT';

export class AddTemplate implements Action {
  type: string = ADD_PROJECT

  constructor(public projectToBeAdded: ITemplate) {
  }
}

export const UPDATE_PROJECT = 'UPDATE_PROJECT';

export class UpdateTemplate implements Action {
  type: string = UPDATE_PROJECT

  constructor(public id: string, public updatedProject: ITemplate) {
  }
}

export const REMOVE_PROJECT = 'REMOVE_PROJECT';

export class RemoveTemplate implements Action {
  type: string = REMOVE_PROJECT

  constructor(public indexOfProjectToBeRemoved: number) {
  }
}
