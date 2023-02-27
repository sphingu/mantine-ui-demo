/// <reference types="cypress" />

const mockUserInfo = {
  id: '0d50ab4a-e8ae-458d-9f9d-8a753c57642d',
  email: 'test@example.com',
  user_metadata: {
    avatar_url: 'https://avatars.githubusercontent.com/u/8?v=4',
    full_name: 'Test User',
    user_name: 'testuser',
  },
}

describe('perform actions', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://*.supabase.co/auth/v1/user', {
      body: mockUserInfo,
    }).as('userGET')
    cy.visit('/customers')
  })
  it('should validate focus for add customer dialog', () => {
    cy.contains('div', 'Loading customers...').should('be.visible')
    cy.contains('div', 'No customers found').should('be.visible')
    cy.contains('button', 'Add Customer').click()

    cy.get('[role=dialog').within(() => {
      cy.contains('h1', 'Add Customer').should('be.visible')
      cy.focused().click()
    })
    cy.get('[role=dialog').should('not.exist')
    cy.focused().should('contain.text', 'Add Customer').click()
    cy.get('[role=dialog').within(() => {
      cy.contains('h1', 'Add Customer').should('be.visible')
      cy.contains('button', 'Cancel').click()
    })
    cy.get('[role=dialog').should('not.exist')
    cy.focused().should('contain.text', 'Add Customer')
  })

  it.only('should add edit customer', () => {
    cy.contains('button', 'Add Customer').click()
    cy.get('[role=dialog]')
      .should('be.visible')
      .within(() => {
        cy.contains('h1', 'Add Customer').should('be.visible')
        cy.contains('button', 'Create').should('be.disabled')
        cy.contains('label', 'Name *')
          .should('be.visible')
          .closest('div')
          .find('input')
          .as('name')
          .type('a')
        cy.contains('button', 'Create').should('be.enabled')
        cy.get('@name').type('{enter}')
        cy.contains('name must be at least 5 characters').should('be.visible')
        cy.get('@name').type('bcde')
        cy.contains('name must be at least 5 characters').should('not.exist')
        cy.contains('button', 'Create').click()
      })
    cy.get('[role=dialog]').should('not.exist')
    cy.get('[role=alert').should(
      'have.text',
      'Customer has been created successfully'
    )

    cy.contains('button', 'ABabcdea few seconds ago').click()
    cy.get('[role=dialog]')
      .should('be.visible')
      .within(() => {
        cy.contains('h1', 'Edit Customer').should('be.visible')
        cy.contains('button', 'Create').should('not.exist')
        cy.contains('button', 'Update').should('be.visible')
        cy.contains('button', 'Cancel').should('be.visible')
        cy.get('input')
          .eq(0)
          .should('have.value', 'abcde')
          .clear()
          .type('mock name')
        cy.get('input').eq(1).type('1234567890')
        cy.get('textarea').eq(0).type('mock address')
        cy.get('textarea').eq(1).type('mock notes')
        cy.contains('button', 'Update').click()
      })

    cy.get('[role=dialog]').should('not.exist')
    cy.get('[role=alert').should(
      'have.text',
      'Customer has been updated successfully'
    )
    cy.contains('button', 'MOmock name1234567890a few seconds ago')
      .should('be.visible')
      .click()
    cy.get('[role=dialog]')
      .should('be.visible')
      .within(() => {
        cy.contains('h1', 'Edit Customer').should('be.visible')
        cy.get('input').eq(0).should('have.value', 'mock name')

        cy.get('input').eq(1).should('have.value', '1234567890')
        cy.get('textarea').eq(0).should('have.value', 'mock address')
        cy.get('textarea').eq(1).should('have.value', 'mock notes')
      })
  })
})
