// Import Cypress commands
const languageData = require('D:/CypressProject/cypress/fixtures/languageData.json');

class LanguagePage {
  // Elements
  elements = {
    addNewLanguageButton: () => cy.get('.ui.active > .row > .twelve > .form-wrapper > .fixed > thead > tr > .right > .ui'),
    addLanguageNameInput: () => cy.get("input[placeholder='Add Language']"),
    languageDropdown: () => cy.get("select[name='level']"),
    addButton: () => cy.get("input[value='Add']"),
    lastLanguage: () => cy.get("tbody:last-of-type tr td:nth-child(1)"),
    lastLanguageLevel: () => cy.get("table tbody:last-of-type tr:first-child td:nth-child(2)"),
    editLanguageButton: () => cy.get("table tbody:last-of-type tr:first-child td:nth-child(3) span:first-child i"),
    updateButton: () => cy.get("input[value='Update']"),
    cancelButton: () => cy.get("input[value='Cancel']"),
    deleteButton: () => cy.get("table tbody:last-of-type tr:first-child td:nth-child(3) span:nth-of-type(2)"),
    errorMessage: () => cy.get(".ns-box.ns-growl.ns-effect-jelly.ns-type-error.ns-show"),
    successMessage: () => cy.get(".ns-box.ns-growl.ns-effect-jelly.ns-type-success.ns-show"),
    tabs: () => cy.get("a[data-tab='first']"),
    tableRows: () => cy.get("div.ui.bottom.attached.tab.segment.tooltip-target.active div.form-wrapper tbody tr"),
  };

  // Utility to wait for an element
  waitForElement(elementFn, timeout = 60000) {
    cy.log(`Waiting for element: ${elementFn.toString()}`);
    elementFn()
      .should('exist')
      .and('be.visible')
      .and('not.be.disabled');
  }

  // Create a new language
  createLanguage(language, languageLevel) {
    this.waitForElement(this.elements.addNewLanguageButton);
    this.elements.addNewLanguageButton().click();

    this.elements.addLanguageNameInput().type(language);
    this.elements.languageDropdown().select(languageLevel);

    this.waitForElement(this.elements.addButton);
    this.elements.addButton().click();
  }

  // Update an existing language
  updateLanguage(language, languageLevel) {
    this.waitForElement(this.elements.editLanguageButton);
    this.elements.editLanguageButton().click();

    this.waitForElement(this.elements.addLanguageNameInput);
    this.elements.addLanguageNameInput().clear().type(language);

    this.elements.languageDropdown().select(languageLevel);

    this.waitForElement(this.elements.updateButton);
    this.elements.updateButton().click();
  }

  // Get the last added language
  getLastLanguage() {
    this.waitForElement(this.elements.lastLanguage);
    return this.elements.lastLanguage().invoke('text');
  }

  // Delete a language
  deleteLanguage(language) {
    this.elements.tableRows().each(($row) => {
      cy.wrap($row)
        .find("td:first-child")
        .invoke('text')
        .then((text) => {
          if (text.trim() === language) {
            cy.wrap($row).find("td:nth-child(3) span:nth-of-type(2)").click();
          }
        });
    });
  }

  // Get the error message
  getErrorMessage() {
    this.waitForElement(this.elements.errorMessage);
    return this.elements.errorMessage().invoke('text');
  }

  // Get the success message
  getSuccessMessage() {
    this.waitForElement(this.elements.successMessage);
    return this.elements.successMessage().invoke('text');
  }

  // Click on a specific tab
  clickTab(tabName) {
    this.waitForElement(this.elements.tabs);
    this.elements.tabs().contains(tabName).click();
  }

  // Clean all language data
  cleanLanguageData() {
    this.waitForElement(this.elements.tableRows);
    this.elements.tableRows().each(($row) => {
      const deleteButton = () => cy.wrap($row).find("td:nth-child(3) span:nth-of-type(2)");
      this.waitForElement(deleteButton);
      deleteButton().click();
    });
  }
}

export default new LanguagePage();
