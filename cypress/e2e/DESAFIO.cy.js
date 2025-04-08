describe('Exercicios cypress', () => {

    beforeEach(() => {
      cy.visit('./src/index.html')//visitando a página)
    })

    it('Desafio (encontre o gato) ', () => {
        cy.get('#cat')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')

    ////MUDANDO O NOME DA APLICAÇÃO DE CAC TAT PARA CAT TAT

    cy.get('#title')
    .invoke('text', 'CAT TAT')

    cy.get('#subtitle')
    .invoke('text', 'Eu amo cachorros')


    })
})