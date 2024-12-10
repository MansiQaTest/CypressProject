// Import required libraries
const loginData1 = require('D:/CypressProject/cypress/fixtures/login.json');
require('cypress-xpath');

class LoginPage {
  // Locators
  elements = {
    signinButton: () => cy.xpath("//a[text()='Sign In']"),
    usernameField: () => cy.xpath("//input[@name='email']"),
    passwordField: () => cy.xpath("//input[@name='password']"),
    loginButton: () => cy.xpath("//button[text()='Login']"),
  };

  // Login action
  loginAction(email, password) {
    this.elements.signinButton().click();
    this.elements.usernameField().type(email);
    this.elements.passwordField().type(password);
    this.elements.loginButton().click();
  }

  // Login steps for the first dataset
  loginSteps() {
    loginData1.forEach((testCase) => {
      if (testCase.TestCase === "LoginData") {
        const { Email: email, Password: password } = testCase.Data;
        this.loginAction(email, password);
      }
    });
  }

  // Login steps for the second dataset
  loginSteps2() {
    loginData2.forEach((testCase) => {
      if (testCase.TestCase === "LoginData") {
        const { Email: email, Password: password } = testCase.Data;
        this.loginAction(email, password);
      }
    });
  }
}

module.exports = new LoginPage();
