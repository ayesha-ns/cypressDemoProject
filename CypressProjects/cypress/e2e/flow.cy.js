const faker = require('faker')
describe('Item purchase flow', () => {

  before(() => {
    cy.readFile('cypress/fixtures/testData.json').then((updateUserName) => {
      updateUserName.correctUserName = faker.internet.userName()
      cy.writeFile('cypress/fixtures/testData.json', updateUserName)
    })
  })
  
  beforeEach(() => {
    cy.fixture('testData').then((credentialsData) => {
      cy.visit(credentialsData.link)
    })
  })

  it('Positive purchase flow', () => {
    cy.fixture('testData').then((credentialsData) => {
      cy.get('#signin2').click()
      cy.get("#sign-username").type(credentialsData.correctUserName)
      cy.get('#sign-password').type(credentialsData.correctPassword)
      cy.get('button[onclick="register()"]').click();
      cy.on('window:alert',(txt)=>{
        expect(txt).to.contains('Sign up successful.');
      })
      cy.reload()
      cy.get('#login2').click()
      cy.get("#loginusername").type(credentialsData.correctUserName)
      cy.get('#loginpassword').type(credentialsData.correctPassword)
      cy.get('button[onclick="logIn()"]').click()
      cy.wait(2000)
      cy.get('#nameofuser').contains('Welcome ' + credentialsData.correctUserName)
      cy.contains('Phones').click()
      cy.contains('Samsung galaxy s6').click()
      cy.get('a[onclick="addToCart(1)"]').click()
      cy.on('window:alert',(txt)=>{
        expect(txt).to.contains('Product added.')
      }) 
      cy.reload()
      cy.get('#cartur').click()
      cy.get('.btn.btn-success').click()
      cy.get('#name').type(credentialsData.buyerName)
      cy.get('#card').type(credentialsData.buyerCard)
      cy.get('button[onclick="purchaseOrder()"]').click()
      cy.contains('Thank you for your purchase!')
      cy.get('.confirm.btn.btn-lg.btn-primary').click()
      cy.reload()
      cy.get('a[onclick="logOut()"]').click()
      cy.reload()
      cy.contains('Log in')
    })
  })
})
