const loginPage = require('D:/CypressProject/cypress/PageObject/LoginPage'); // Update path as per your structure

describe('Login Tests', () => {
  it('Should login using valid credentials from dataset 1', () => {
    cy.visit('http://localhost:5000/'); // Replace with the actual URL of your app
    loginPage.loginSteps(); // Calls loginSteps() method from LoginPage
  });
});