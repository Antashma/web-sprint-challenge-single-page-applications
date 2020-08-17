describe('Testing Pizza Form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/order');
    })
    it('Add text to inputs', () => {
        cy.get('[data-cy=name]').type('Amora Lovee').should('have.value', 'Amora Lovee')
        cy.get('[data-cy=special]').type('Please cook with love ♥').should('have.value', 'Please cook with love ♥')
        cy.get('[data-cy=pepperoni]').check().should('have.checked')
        cy.get('[data-cy=xcheese]').check().should('have.checked')
        cy.get('[data-cy=size').select('').should('have.value', '')
        cy.get('form').submit()
    })
})