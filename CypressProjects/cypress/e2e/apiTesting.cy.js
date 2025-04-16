describe('API Testing with Cypress', () => {
    it('GET - Users List', () => {
        cy.request({
                   method: 'GET',
                   url: "https://reqres.in/api/users?page=2",
                   failOnStatusCode: false,
               }).as('details')
               cy.get('@details').its('status').should('eq', 200)
               cy.get('@details').then((response) => {
                   const reqResponse = response.body
                   cy.log(reqResponse.data[1].email)
               })
        
    })
  })