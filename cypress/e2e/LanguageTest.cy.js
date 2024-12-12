// Import the LanguagePage class

const loginPage = require('D:/CypressProject/cypress/PageObject/LoginPage');
const LanguagePage = require('D:/CypressProject/cypress/PageObject/Language'); 


describe('Language Feature Tests', () => {
    
  it('should add a new language', () => {
    cy.visit('http://localhost:5000/'); // Replace with the actual URL of your app
    loginPage.loginSteps();
    // Load test data from a JSON file
    cy.fixture('languageData').then((data) => {
      const { language, languageLevel } = data.addLanguage;
      const successMessage = `${language} has been added to your languages`;
      // Add a new language
      LanguagePage.createLanguage(language, languageLevel);

      // Verify success message
      LanguagePage.getSuccessMessage().should('contain', successMessage);

      // Verify the language is displayed in the table
      LanguagePage.getLastLanguage().should('equal', language);
    });
  });

 it('should update an existing language', () => {
    cy.visit('http://localhost:5000/'); // Replace with the actual URL of your app
    loginPage.loginSteps();
    // Load test data from a JSON file
     cy.fixture('languageData').then((data) => {
       const { updatedLanguage, updatedLanguageLevel } = data.updateLanguage;
       const successMessage2 = `${updatedLanguage} has been updated to your languages`;

       // Update the language
       LanguagePage.updateLanguage(updatedLanguage, updatedLanguageLevel);

       // Verify success message
       LanguagePage.getSuccessMessage().should('contain', successMessage2);

       // Verify the updated language is displayed in the table
       LanguagePage.getLastLanguage().should('equal', updatedLanguage);
     });
   });

   it('should delete a language', () => {
    cy.visit('http://localhost:5000/'); // Replace with the actual URL of your app
    loginPage.loginSteps();
     // Load test data from a JSON file
     cy.fixture('languageData').then((data) => {
       const { languageToDelete } = data.deleteLanguage;
       const successMessage3 = `${languageToDelete} has been deleted from your languages`;

       // Delete the language
       LanguagePage.deleteLanguage(languageToDelete);

       // Verify success message
       LanguagePage.getSuccessMessage().should('contain', successMessage3);
       // Verify the language is no longer displayed
       LanguagePage.getLastLanguage().should('not.equal', languageToDelete);
     });
   });

   it('should display an error message for invalid input', () => {
    cy.visit('http://localhost:5000/'); // Replace with the actual URL of your app
    loginPage.loginSteps();
    cy.fixture('languageDatawithempty').then((data) => {
      const { language, languageLevel } = data.addLanguage;
     // Attempt to add a language with invalid data
     LanguagePage.createLanguage(language, languageLevel);
     // Verify error message
     LanguagePage.getErrorMessage().should('contain', 'Please enter valid data');
   });  
  });
 
});

