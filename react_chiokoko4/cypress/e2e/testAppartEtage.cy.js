describe('testAppart', () => {//truc de base ça englobe tout
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.get("[data-cy='bouttonLogin']").click();
    cy.get("[data-cy='emailLogin']").type("marzat.jude@gmail.com");
    cy.get("[data-cy='loginLogin']").type("62636263Jude");
    cy.get("[data-cy='seConecterLogin']").click();
    cy.get("[data-cy='errorLogin']").should('contain', 'Conextion réussit');
  })
  it('trouverLapartement sucses', () => {
    cy.get('[data-cy*="nomDesRestorant"]').should(($els) => {
      const found = $els.toArray().some((el) => el.innerText.includes('76 Leberthon'))
      expect(found).to.be.true
    })
  })
  it('crée un appartement', () => {// c'est un test
    cy.get("[data-cy='new-restaurant-input-numero']").type("123");
    cy.get("[data-cy='new-restaurant-input-rue']").type("un super test");
    cy.get("[data-cy='new-restaurant-button']").click();
    cy.wait(1000);
    cy.get('[data-cy*="nomDesRestorant"]').should(($els) => {
      const found = $els.toArray().some((el) => el.innerText.includes('123 un super test'))
//      data-cy='buttonSuppreResto'
      expect(found).to.be.true
    })
  })
  it('crée un appartement et supprime un appart', () => {
    cy.get("[data-cy='new-restaurant-input-numero']").type("123");
    cy.get("[data-cy='new-restaurant-input-rue']").type("un super test");
    cy.get("[data-cy='new-restaurant-button']").click();
    cy.wait(1000);
    cy.get('[data-cy="nomDesRestorant"]').contains('123 un super test')
      .parents('[data-cy="divRestorant"]')
      .within(() => {
        cy.get('[data-cy="buttonSuppreResto"]').click();
      });
  });
  it('clique sur le bouton de sélection d\'appartement et vérifie la présence d\'une div pour créer un étage', () => {
    cy.get("[data-cy='buttonSelectAppart']").first().click();
    cy.get("[data-cy='makeEtage']").should('exist');
  })
  it('vérifie la sélection d un étage', () => {
    cy.get("[data-cy='buttonSelectAppart']").first().click();
    cy.get("[data-cy='makeEtage']").should('exist');
    cy.contains('pls select un truc...').should('be.visible');
    cy.get("[data-cy='buttonSelectionerEtage']").first().click();
    cy.contains('pls select un truc...').should('not.exist');
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
  
  
})

