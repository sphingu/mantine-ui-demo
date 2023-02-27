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
const mockTodoList = [
  {
    id: 1,
    user_id: '68c53ca2-4140-4a85-9723-e0fa849fa103',
    task: 'first todo',
    is_complete: false,
    inserted_at: '2023-02-13T11:19:42.148157+00:00',
  },
  {
    id: 2,
    user_id: '68c53ca2-4140-4a85-9723-e0fa849fa103',
    task: 'second todo',
    is_complete: true,
    inserted_at: '2023-02-13T11:19:42.148157+00:00',
  },
]
const interceptTodoList = (items = mockTodoList) =>
  cy
    .intercept(
      'GET',
      'https://*.supabase.co/rest/v1/todos?select=*&order=id.desc',
      {
        body: items,
      }
    )
    .as('todosGET')
const interceptTodoPost = () =>
  cy
    .intercept('POST', 'https://*.supabase.co/rest/v1/todos', { body: {} })
    .as('todoPOST')
const interceptTodoPatch = () =>
  cy
    .intercept('PATCH', 'https://*.supabase.co/rest/v1/todos?id=*', {
      body: {},
    })
    .as('todoPATCH')
const interceptTodoDelete = () =>
  cy
    .intercept('DELETE', 'https://*.supabase.co/rest/v1/todos?id=*', {
      body: {},
    })
    .as('todoDELETE')

describe('todo page tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://*.supabase.co/auth/v1/user', {
      body: mockUserInfo,
    }).as('userGET')
    interceptTodoList()
    interceptTodoPost()
    interceptTodoPatch()
    interceptTodoDelete()
  })
  describe('validate rendered things', () => {
    it('should show no record for empty todo list', () => {
      interceptTodoList([])
      cy.visit('/todo')
      cy.contains('div', 'Todo List').should('be.visible')
      cy.contains('div', 'Loading ...').should('be.visible')
      cy.wait('@todosGET')

      cy.contains('div', 'No records found').should('be.visible')
    })
    it('should show todo items', () => {
      cy.visit('/todo')
      cy.wait('@todosGET')

      cy.contains('div', 'No records found').should('not.exist')
      cy.dataCy('todo-list')
        .should('exist')
        .within(() => {
          cy.get('button').should('have.length', 4).as('buttons')
          cy.get('@buttons')
            .eq(0)
            .should('have.attr', 'aria-label', 'Mark as complete')
            .next('div')
            .should('have.text', mockTodoList[0].task)
            .next('button')
            .should('have.attr', 'aria-label', 'Delete')
          cy.get('@buttons')
            .eq(2)
            .should('have.attr', 'aria-label', 'Mark as incomplete')
            .next('div')
            .should('have.text', mockTodoList[1].task)
            .next('button')
            .should('have.attr', 'aria-label', 'Delete')
        })
    })
    it('should show add todo input with button', () => {
      cy.visit('/todo')

      cy.get('input')
        .should('have.attr', 'placeholder', 'What needs to be done?')
        .next('div')
        .find('button')
        .should('have.attr', 'type', 'submit')
        .should('have.attr', 'aria-label', 'Add todo')
    })
  })

  describe('perform actions', () => {
    it('should add new todo', () => {
      interceptTodoList([])
      cy.visit('/todo')

      // check list have no items
      cy.contains('div', 'No records found').should('be.visible')

      cy.get('[aria-label="Add todo"]').as('addTodoButton').click()
      // intercept list API again which get called automatically after todo added
      interceptTodoList([
        {
          id: 2,
          user_id: mockUserInfo.id,
          task: 'test one',
          is_complete: false,
          inserted_at: '',
        },
      ])
      cy.focused()
        .should('have.attr', 'placeholder', 'What needs to be done?')
        .type('test one{Enter}')
      cy.wait('@todoPOST')
        .its('request.body')
        .then(($body) => {
          expect($body).to.deep.equal({
            task: 'test one',
            user_id: mockUserInfo.id,
          })
        })
      cy.get('input').should('be.enabled').should('have.value', '')
      cy.get('@addTodoButton').should('be.enabled')

      cy.dataCy('todo-list')
        .should('exist')
        .within(() => {
          cy.get('button').should('have.length', 2).as('buttons')
          cy.get('@buttons')
            .eq(0)
            .should('have.attr', 'aria-label', 'Mark as complete')
            .next('div')
            .should('have.text', 'test one')
            .next('button')
            .should('have.attr', 'aria-label', 'Delete')
        })
    })

    it('should mark todo as completed', () => {
      cy.visit('/todo')
      cy.wait('@todosGET')
      interceptTodoList(
        mockTodoList.map((todo) => ({ ...todo, is_complete: true }))
      )
      cy.get('[aria-label="Mark as incomplete"]').should('have.length', 1)
      cy.get('[aria-label="Mark as complete"]')
        .should('have.length', 1)
        .click()
        .should('be.disabled')
      cy.wait('@todoPATCH')
        .its('request.body')
        .then(($body) => {
          expect($body).to.deep.equal({
            is_complete: true,
          })
        })

      // first todo should be marked as completed now
      cy.get('[aria-label="Mark as incomplete"]')
        .should('have.length', 2)
        .eq(0)
        .should('be.enabled')
        .next('div')
        .should('have.text', 'first todo')
      cy.get('[aria-label="Mark as complete"]').should('not.exist')
    })

    it('should mark todo as in-completed', () => {
      cy.visit('/todo')
      cy.wait('@todosGET')
      interceptTodoList(
        mockTodoList.map((todo) => ({ ...todo, is_complete: false }))
      )
      cy.get('[aria-label="Mark as complete"]').should('have.length', 1)
      cy.get('[aria-label="Mark as incomplete"]')
        .should('have.length', 1)
        .click()
        .should('be.disabled')
      cy.wait('@todoPATCH')
        .its('request.body')
        .then(($body) => {
          expect($body).to.deep.equal({
            is_complete: false,
          })
        })

      // second todo should be marked as incomplete now
      cy.get('[aria-label="Mark as complete"]')
        .should('have.length', 2)
        .eq(1)
        .should('be.enabled')
        .next('div')
        .should('have.text', 'second todo')
      cy.get('[aria-label="Mark as incomplete"]').should('not.exist')
    })

    it('should delete todos', () => {
      cy.visit('/todo')
      cy.wait('@todosGET')
      interceptTodoList([mockTodoList[0]])

      cy.get('[aria-label="Delete"]')
        .should('have.length', 2)
        .eq(1)
        .click()
        .should('be.disabled')

      cy.get('[aria-label="Delete"]')
        .should('have.length', 1)
        .should('be.enabled')
      interceptTodoList([])
      cy.get('[aria-label="Delete"]').click()

      cy.dataCy('todo-list').should('not.exist')
      cy.contains('div', 'No records found').should('be.visible')
    })
  })
})
