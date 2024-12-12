const loginData1 = require('D:/CypressProject/cypress/fixtures/login.json');

class LoginPage {
  // Locators
  elements = {
    signinButton: () => cy.get("a[class='item']"), // CSS selector for Sign In button
    usernameField: () => cy.get("input[placeholder='Email address']"), // CSS selector for username field
    passwordField: () => cy.get("input[placeholder='Password']"), // CSS selector for password field
    loginButton: () => cy.get('.fluid.ui.teal.button'), // CSS selector for Login button
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
}

module.exports = new LoginPage();