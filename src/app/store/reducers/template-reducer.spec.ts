import { ITemplate, optionsCreationDate, optionsUpdatingDate, TKIND, Template } from "@Global/model"
import { AddTemplate, RemoveTemplate, UpdateTemplate } from "@Store/actions/app-action"
import { projectReducer } from "./app-reducer"
import { expect } from '@jest/globals';

describe('Template Reducer Tests', () => {
  let initialTemplate: Template[]

  beforeEach(() => {
    initialTemplate = [{
        name: "initial Project",
        version: {
          id: "2007B4",
          text: "description"
        },
        id: "708ef294-449d-4cf8-bead-d6c44d83ae51",
        creationDate: new Date("2022-08-28"),
        updatingDate : new Date("2022-08-28"),
        kind: TKIND.PROJECT,
        deletingDate: null
      }];
  })

  it('called with AddTemplate action should return a state with the added project', () =>
    {
      const addedProject: ITemplate = {
        name: "new Project",
        version: {
          id: "id1",
          text: "description new project"
        },
        id: "808ef294-449d-4cf8-bead-d6c44d83ae51",
        creationDate: new Date("2022-08-28"),
        updatingDate : new Date("2022-08-28"),
        kind: TKIND.PROJECT,
        deletingDate: null
      };
      const expectedState = [...initialTemplate, addedProject]
      expect(projectReducer(initialTemplate, new AddTemplate(addedProject))).toEqual(expectedState)
    }
  )

  it('called with RemoveTemplate action should return a state with the correct project updated', () =>
    {
      const indexOfTheProjectToBeRemoved = 1
      const initialState = [
        {
        name: "Project 1",
        version: {
          id: "id1",
          text: "description"
        },
        id: "708ef294-449d-4cf8-bead-d6c44d83ae51",
        creationDate: new Date("2022-08-28"),
        updatingDate : new Date("2022-08-28"),
        kind: TKIND.PROJECT,
        deletingDate: null
        },
        {
            name: "Project 2",
            version: {
            id: "id1",
            text: "description"
            },
            id: "708ef294-449d-4cf8-bead-d6c44d83ae51",
            creationDate: new Date("2022-08-28"),
            updatingDate : new Date("2022-08-28"),
            kind: TKIND.PROJECT,
            deletingDate: null
        }
      ];
      const expectedState = [{
        name: "Project 1",
        version: {
          id: "id1",
          text: "description"
        },
        id: "708ef294-449d-4cf8-bead-d6c44d83ae51",
        creationDate: new Date("2022-08-28"),
        updatingDate : new Date("2022-08-28"),
        kind: TKIND.PROJECT,
        deletingDate: null
      }];
      expect(projectReducer(initialState, new RemoveTemplate(indexOfTheProjectToBeRemoved)))
      .toEqual(expectedState)
    }
  )

  it('called with UpdateTemplate action should return a state with the correct project deleted', () =>
  {
    const initialState = [
      {
      name: "Project 1",
      version: {
        id: "id1",
        text: "description"
      },
      id: "708ef294-449d-4cf8-bead-d6c44d83ae51",
      creationDate: new Date("2022-08-28").toLocaleString('EN', optionsCreationDate),
      updatingDate: new Date("2022-08-28").toLocaleString('EN', optionsUpdatingDate),
      kind: TKIND.PROJECT,
      deletingDate: null
      }
    ]
    const modifiedTemplate : ITemplate = {
      name: "Project 1 New state",
      version: {
        id: "id1",
        text: "description"
      },
      id: "708ef294-449d-4cf8-bead-d6c44d83ae51",
      creationDate: new Date("2022-08-28").toLocaleString('EN', optionsCreationDate),
      updatingDate: new Date("2022-08-28").toLocaleString('EN', optionsUpdatingDate),
      kind: TKIND.PROJECT,
      deletingDate: null
      }
    const expectedState = [modifiedTemplate]
    expect(projectReducer(initialState, new UpdateTemplate(modifiedTemplate.id,modifiedTemplate)))
    .toEqual(expectedState)
  }
)
})
