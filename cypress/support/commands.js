// Cypress --> chama comandos customizados
// Commands tem a função .add()
//nome do comando customizado fillMandatoryFieldsAndSubmit
// na função .add('primeiro argumento é o nome do comando customizado', () segundo argumento é uma fuction call back =>{
    // e aqui dentro é implementado o comando
    //})
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvxyzw', 10 )
    cy.get('#firstName').click().type('Leonardo')
    cy.get('#lastName').click().type('Oliveira')
    cy.get('#email').click().type('teste@123.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
     cy.get('button[type="submit"]').click()
})
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', data => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvxyzw', 10 )
    cy.get('#firstName').click().type(data.firstName)
    cy.get('#lastName').click().type(data.lastName)
    cy.get('#email').click().type(data.email)
    cy.get('#open-text-area').type(data.text, { delay: 0 })
    cy.get('button[type="submit"]').click()
})
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = { 
    firstName: 'Jhon',
    lastName: 'Cruz',
    email: 'jhon@cruz.com',
    text: 'Jhon do CobraKai'
}) => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvxyzw', 10 )
    cy.get('#firstName').click().type(data.firstName)
    cy.get('#lastName').click().type(data.lastName)
    cy.get('#email').click().type(data.email)
    cy.get('#open-text-area').type(data.text, { delay: 0 })
    cy.contains('button','Enviar').click() //utilização do cy.contains('a', 'Clique aqui!') 
// primeiro argumento a TAG no meu caso button
// segundo argumento o que está escrito dentro da tag no caso do button 'Enviar'
})
