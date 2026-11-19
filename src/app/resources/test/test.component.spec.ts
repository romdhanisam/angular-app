import { TestComponent } from './test.component'

describe('TestComponent', () => {
  it('should mount', () => {
    cy.mount(TestComponent)
  })
})