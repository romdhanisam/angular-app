import { AddTemplate, ADD_PROJECT, RemoveTemplate, REMOVE_PROJECT, UpdateTemplate, UPDATE_PROJECT } from "../actions/app-action";
import {Action, INIT} from "@ngrx/store";
import { ITemplate, optionsCreationDate, optionsUpdatingDate, TKIND } from "@Global/model";

const initialState : ITemplate[] = [{
  name: "initial Project",
  version: {
    id: "id1",
    text: "description"
  },
  id: "708ef294-449d-4cf8-bead-d6c44d83ae51",
  creationDate: new Date().toLocaleString('EN', optionsCreationDate),
  updatingDate : new Date().toLocaleString('EN', optionsUpdatingDate),
  kind: TKIND.PROJECT,
  deletingDate: null
}]

export function projectReducer (state: ITemplate[] = initialState, action: Action): ITemplate[] {
    // console.log(action.type, state);
    switch(action.type) {
      case ADD_PROJECT:
        const newProject: ITemplate = {
          ...(action as AddTemplate).projectToBeAdded,
        };
        return [...state, newProject]
      case UPDATE_PROJECT:
        const updatedState = state.map((item) => {
          if(item.id == (action as UpdateTemplate).id){
            return Object.assign({}, item, {
                ...(action as UpdateTemplate).updatedProject,
            });
          }
          return item;
        });
        return [...updatedState];
      case REMOVE_PROJECT:
        const newState = [...state]
        newState.splice((action as RemoveTemplate).indexOfProjectToBeRemoved,1)
        return newState
      case INIT:
        return initialState
      default:
        return state
    }
  }
