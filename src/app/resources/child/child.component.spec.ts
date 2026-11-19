import { ChildComponent } from './child.component'

describe('ChildComponent', () => {
  it('should mount', () => {
    cy.mount(ChildComponent)
  })
})