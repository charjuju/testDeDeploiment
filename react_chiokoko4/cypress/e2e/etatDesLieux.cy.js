describe('Etat des lieux', () => {//truc de base ça englobe tout
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.get("[data-cy='bouttonLogin']").click();
    cy.get("[data-cy='emailLogin']").type("marzat.jude@gmail.com");
    cy.get("[data-cy='loginLogin']").type("62636263Jude");
    cy.get("[data-cy='seConecterLogin']").click();
    cy.get("[data-cy='errorLogin']").should('contain', 'Conextion réussit');
  })
  it('vérifie la modification des info complemantaire', () => {
    cy.get("[data-cy='buttonSelectAppart']").first().click();
    cy.get("[data-cy='makeEtage']").should('exist');
    cy.contains('pls select un truc...').should('be.visible');
    cy.get("[data-cy='buttonSelectionerEtage']").first().click();
    cy.contains('pls select un truc...').should('not.exist');
    cy.get("[data-cy='etatDesLieuxeEitButton']").click();
    cy.get("[data-cy='etatDesLieuxInfocomplemantaireEditMode']").should('exist');
    cy.get("[data-cy='etatDesLieuxInfocomplemantaireEditMode']").type("je fait un petit test");
    cy.get("[data-cy='etatDesLieuxButtonPost']").click();
    cy.get("[data-cy='etatDesLieuxButtonQuit']").click();
    cy.contains('je fait un petit test').should('be.visible');
  })
  it('vérifie la modification des info complemantaire', () => {
    cy.get("[data-cy='buttonSelectAppart']").first().click();
    cy.get("[data-cy='makeEtage']").should('exist');
    cy.contains('pls select un truc...').should('be.visible');
    cy.get("[data-cy='buttonSelectionerEtage']").first().click();
    cy.contains('pls select un truc...').should('not.exist');
    cy.get("[data-cy='etatDesLieuxeEitButton']").click();
    cy.get("[data-cy='etatDesLieuxInfocomplemantaireEditMode']").should('exist');
    cy.get("[data-cy='etatDesLieuxInfocomplemantaireEditMode']").type("je casse un petit test");
    cy.get("[data-cy='etatDesLieuxButtonPost']").click();
    cy.get("[data-cy='etatDesLieuxButtonQuit']").click();
    cy.contains('je casse un petit test').should('be.visible');
  })
  it('vérifie la modification des info complemantaire', () => {
    cy.get("[data-cy='buttonSelectAppart']").first().click();
    cy.get("[data-cy='makeEtage']").should('exist');
    cy.contains('pls select un truc...').should('be.visible');
    cy.get("[data-cy='buttonSelectionerEtage']").first().click();
    cy.contains('pls select un truc...').should('not.exist');
    cy.get("[data-cy='etatDesLieuxeEitButton']").click();

    cy.get("[data-cy='buttonFourTraditionel']").click();
    
    cy.get("[data-cy='etatDesLieuxButtonPost']").click();
    cy.get("[data-cy='etatDesLieuxButtonQuit']").click();
    cy.get("[data-cy='icoFourTraditionel']").should('exist');
  })
  it('vérifie la modification des info complemantaire', () => {
    cy.get("[data-cy='buttonSelectAppart']").first().click();
    cy.get("[data-cy='makeEtage']").should('exist');
    cy.contains('pls select un truc...').should('be.visible');
    cy.get("[data-cy='buttonSelectionerEtage']").first().click();
    cy.contains('pls select un truc...').should('not.exist');
    cy.get("[data-cy='etatDesLieuxeEitButton']").click();

    cy.get("[data-cy='buttonFourTraditionel']").click();
    
    cy.get("[data-cy='etatDesLieuxButtonPost']").click();
    cy.get("[data-cy='etatDesLieuxButtonQuit']").click();
    cy.get("[data-cy='icoFourTraditionel']").should('not.exist');
  })
})

