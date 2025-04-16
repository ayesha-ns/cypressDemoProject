const faker = require('faker')
describe('Sign up', () => {

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
  
  it('Sign up with new user', () => {
    cy.fixture('testData').then((credentialsData) => {
      cy.get('#signin2').click()
      cy.get("#sign-username").type(credentialsData.correctUserName)
      cy.get('#sign-password').type(credentialsData.correctPassword)
      cy.get('button[onclick="register()"]').click();
      cy.on('window:alert',(txt)=>{
        expect(txt).to.contains('Sign up successful.');
      })
    })
  })

  it('Sign up with existing user', () => {
      cy.fixture('testData').then((credentialsData) => {
      cy.get('#signin2').click()
      cy.get("#sign-username").type(credentialsData.correctUserName)
      cy.get('#sign-password').type(credentialsData.correctPassword)
      cy.get('button[onclick="register()"]').click();
      cy.on('window:alert',(txt)=>{
        expect(txt).to.contains('This user already exist.')
      })
    })
  })

})

describe('Login', () => {

  beforeEach(() => {
    cy.fixture('testData').then((credentialsData) => {
      cy.visit(credentialsData.link)
    })
  })

  it('Sign in with wrong user', () => {
    cy.fixture('testData').then((credentialsData) => {
      cy.get('#login2').click()
      cy.get("#loginusername").type(credentialsData.incorrectUserName)
      cy.get('#loginpassword').type(credentialsData.incorrectPassword)
      cy.get('button[onclick="logIn()"]').click();
      cy.on('window:alert',(txt)=>{
        expect(txt).to.contains('User does not exist.')
      })
    })
  })

  it('Sign in with correct user', () => {
    cy.fixture('testData').then((credentialsData) => {
      cy.get('#login2').click()
      cy.get("#loginusername").type(credentialsData.correctUserName)
      cy.get('#loginpassword').type(credentialsData.correctPassword)
      cy.get('button[onclick="logIn()"]').click()
      cy.wait(2000)
      cy.get('#nameofuser').contains('Welcome ' + credentialsData.correctUserName)
    })
  })

})