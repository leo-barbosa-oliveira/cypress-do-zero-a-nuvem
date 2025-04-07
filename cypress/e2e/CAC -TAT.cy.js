describe('Exercicios cypress', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')//visitando a página)
  });

  it('verifica o título da aplicação ', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  //Exercicio 1
  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').click().type('Leonardo')
    cy.get('#lastName').click().type('Oliveira')
    cy.get('#email').click().type('teste@123.com')
    cy.get('#open-text-area').click().type('Tudo bem obrigado!')
    cy.get('.button').click() // para ter certeza que é o certo --> cy.get('button[type="submit"]')

    //jeito certo
    cy.get('.success').should('be.visible')

    //jeito errado
    // cy.get('.success')
    //   .as('textfield')
    //   .should('be.equal', 'Mensagem enviada com sucesso.')
  })

  //EXERCICIO EXTRA 1 
  it('EXERCICIO EXTRA 1', () => {
    cy.get('#firstName').click().type('Leonardo')
    cy.get('#lastName').click().type('Oliveira')
    cy.get('#email').click().type('teste@123.com')
    cy.get('#open-text-area').type('Tudo bem obrigado!,Tudo bem obrigado!,Tudo bem obrigado!,Tudo bem obrigado!,Tudo bem obrigado!,Tudo bem obrigado!,Tudo bem obrigado!,Tudo bem obrigado!,Tudo bem obrigado!', { delay: 0 })
    cy.contains('button','Enviar').click()
    //verificação mensagem enviada com sucesso
    cy.get('.success').should('be.visible')
  })

  //correção adicionar MODULO Cypress._.repeat que chama o repeat
  it('EXERCICIO EXTRA 1 CORRIGIDO', () => {
      const longText = Cypress._.repeat('abcdefghijklmnopqrstuvxyzw', 10 )
      cy.get('#firstName').click().type('Leonardo')
      cy.get('#lastName').click().type('Oliveira')
      cy.get('#email').click().type('teste@123.com')
      cy.get('#open-text-area').type(longText, { delay: 0 })
      cy.contains('button','Enviar').click()
      cy.get('.success').should('be.visible')
  })
  
  
  //Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida
  it('EXERCICIO EXTRA 2 -> mensagem de erro ao submeter o formulário com um email com formatação inválida ', () => {
    
    cy.get('#firstName').click().type('Leonardo')
    cy.get('#lastName').click().type('Oliveira')
    cy.get('#email').click().type('teste@123,com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button','Enviar').click()
    cy.get('.error').should('be.visible')
  })

  // Campo telefone só deverá aceitar números se outro valor for inserido deverá continuar vazio
  it('EXERCICIO EXTRA 3 ', () => {
    cy.get('#phone')
      .type('abcde') // -> indica string no campo
      .should('have.value', '') // --> o have.value me diz que se o valor for diferente de number retorne vazio
  })

//Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário
  it('EXERCICIO EXTRA 4', () => {

    cy.get('#firstName').click().type('Leonardo')
    cy.get('#lastName').click().type('Oliveira')
    cy.get('#email').click().type('teste@123.com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
    cy.get('#phone-checkbox').click()
    cy.get('#phone')
      .type('abcde') 
      .should('have.value', '').type(112313131)
    cy.contains('button','Enviar').click()
  })

//Preenche e limpa os campos nome, sobrenome, email e telefone
  it('EXERCICIO EXTRA 5', () => {
    cy.get('#firstName')
      .type('Leonardo')
      .should('have.value', 'Leonardo')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Oliveira')
      .should('have.value', 'Oliveira')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('teste@123.com')
      .should('have.value', 'teste@123.com')
      .clear()
      .should('have.value', '')
      cy.get('#phone')
      .type('67453190')
      .should('have.value', '67453190')
      .clear()
      .should('have.value', '')
    cy.get('#open-text-area')
      .type('teste')
      .should('have.value', 'teste')
      .clear()
      .should('have.value', '')
      .clear()
  })

////exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios
  it('EXERCICIO EXTRA 6', () => {

    cy.contains('button','Enviar').click() //exercicio 8
    cy.get('.error').should('be.visible')

  })
////envia o formuário com sucesso usando um comando customizado
  it('EXERCICIO EXTRA 7', () => {
    cy.fillMandatoryFieldsAndSubmit()//chama o comando customizado
    cy.get('.success').should('be.visible')// verificação de resultado esperado não é interessante 
    // ir para os comandos customizados, para bater o olho no teste e ver o que está sendo verificado

  })
  /// criei uma variavel data como um obejto de valores diferentes do que estava preenchido no test anterior
  // e o comando customizado recebeu os novos valores 
  // assim eu não preciso repetir toda a lógica porque tem um comando customizado que o faz por mim tendo os dados do Leonardo e da Giovnna 
  // e de quem mais precisar por meio de uma variavel com objeto
  it('EXERCICIO EXTRA 7 mudando os comandos customizados com variaveis', () => {
    const data = {
      firstName: 'Giovanna',
      lastName: 'Carneiro',
      email: 'gigi@teste.com',
      text: 'TESTE2205'
    }
    cy.fillMandatoryFieldsAndSubmit(data)
    cy.get('.success').should('be.visible')

  })

  ///////////////// COMANDOS CUSTOMIZADOS COM VALORES DEFAULT
  it('EXERCICIO EXTRA 7 comandos customizados com valore default', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')

  })

///////// USANDO cy.contains()
  it('EXERCICIO EXTRA 8', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

/////////// EXERCICIOS DE SELECT()
    // cy.get('select').select('Blog') --> Seleção pelo texto Blog
    // cy.get('select').select('youtube') --> Seleção pelo value youtube
    // cy.get('select').select(1) --> Seleção pelo índice 1

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('select')
      .select('YouTube')
      .should('have.value', 'youtube')

    //correção 
    // cy.get('#product')
    //   .select('YouTube')
    //   .should('have.value', 'youtube')
  })
  it('Exercicio extra 1 - seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product') 
      .select('Mentoria')
      .should('have.value', 'mentoria') 
  })
  it('Exercicio extra 2 - seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product') 
      .select(1)
      .should('have.value', 'blog') 
  })

/////////// Marcando inputs do tipo radio
// só pode selecionar 1 por vez 
// .check()
// exemplo cy.get('input[type="radio"]').check()
  it('Exercicio - marca o tipo de atendimento "Feedback"', () => {
    // cy.get('input[type="radio"]').check('feedback')
    // .should('have.value', 'feedback')

    //correção 
    cy.get('input[type="radio"][value = "feedback"]')
      .check()
      .should('be.checked')
  })

  //EXERCICIO EXTRA
  it('Exercicio extra - mmarca cada tipo de atendimento ', () => {
    //cy.get('input[type="radio"]')
    // .check('feedback')
    // .should('be.checked')
    // cy.get('input[type="radio"]').check('Ajuda')
    // .should('be.checked')
    // cy.get('input[type="radio"]').check('Elogio')
    // .should('be.checked')

    //correção com.each() e cy.wrap() usando array de elementos 
    cy.get('input[type="radio"]')
      .each(typeOfService => { // each é cada então pega cada um desses elementro funcção each recebe como argumento uma função
        // função tipo de serviço e cada função (typeOfService) recebe como argumento cada um dos radios buttons
        cy.wrap(typeOfService) //cy.wrap(empacotar)() --> empacotar cada tipo de atendimento e então vou checar e verificar que está checado
          .check()
          .should('be.checked')
      })
  })

  // Marcando (e desmarcando) inputs do tipo checkbox
  //Marcar um checkbox .check()
  //Desmarcar um check box.uncheck()

  // Exercicio
  it('Marca ambos checkboxes, depois desmarca o último ', () => {
    // cy.get('#email-checkbox')
    //   .check()
    //   .should('be.checked')

    // cy.get('#phone-checkbox')
    //   .check()
    //   .should('be.checked')
    // cy.get('#phone-checkbox')
    //   .uncheck()
    //   .last()

    //correção
    cy.get('input[type = "checkbox"]')  
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  

  })

  //Exercício extra
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário ', () => {

    cy.clock()

    cy.get('#firstName').click().type('Leonardo')
    cy.get('#lastName').click().type('Oliveira')
    cy.get('#email').click().type('teste@123,com')
    cy.get('#phone-checkbox')
      .check()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button','Enviar').click()
    cy.get('.error').should('be.visible')

    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })

////////////////Fazendo upload de arquivos com Cypress
//Cy.get('input[type="file"]') para identificar um campo de seleção de arquivo e encadear o comando .selectFile()
// Exemplo cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')


/// EXERCICIO 1 seleciona um arquivo da pasta fixtures
  it('Seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
//nova forma .should() recebendo um callback
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
////////////// seleciona um arquivo simulando um drag-and-drop
  it('Exercicio extra 1 - seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action : 'drag-drop'})
// drag-drop simula como se o usuario estivesse arrastando um arquivo para o input do tipo arquivo
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  /// É POSSIVEL DAR ALIAS PARA FIXTURES 
  it('Exercicio extra 2 - seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json')//chamo a fixture
      .as('sampleFile')//renomear a fixture
    cy.get('#file-upload')
      .selectFile('@sampleFile')// chamando o alias com a fixture sempre que chama um alias usar @
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })


///////////////////Lidando com links que abrem em outra aba
//Se um elemento âncora (<a>) possuir o atributo target com o valor _blank, ao ser clicado, o valor do atributo href será aberto em uma nova aba. Este é o comportamento padrão em qualquer navegador.
//Alternativa 1 - confie que o navegador funciona (teste a aplicação, não o browser)
//cy.get('.some-link').should('have.attr', 'target', '_blank')

//Alternativa 2 - remova o atributo target do elemento  
//Se você precisar ir para outra página, o Cypress permite remover a propriedade target do elemento âncora.
//.invoke()  cy.get('#link-that-opens-in-another-tab').invoke('removeAttr', 'target')

//EXERCICIO
  it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    //cy.get('a')//muito generico
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html') 
      .and('have.attr', 'target', '_blank')//fazer mais de uma verificação para o mesmo sujeito no caso should() ao inves de usar varios should() usar and()
    //melhor usar contains sendo 1 argumento é a tag e o 2 argumento texto contido na tag 'Politica de privacidade'
  })
  //EXERCICIO EXTRA 1
  it(' Exercicio enxtra 1 - acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')//removi o atributo targer com o invoke()
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')

  })
  //EXERCICIO EXTRA 2
  it('EXERCICIO EXTRA 2 - testa a página da política de privacidade de forma independente', () => {
    cy.contains('a', 'Política de Privacidade')
      .click()
  
  //correção no arquivo privacyPolicy.cy.js
  })

////////////Simulando o viewport de um dispositivo móvel
//cypress open --config viewportWidth=370 viewportHeight=660


//////////Controle o "relógio" 🕐 do navegador com os comandos cy.clock() e cy.tick()
// Com a funcinalidade cy.clock(), você pode "congelar" 🧊 o relógio do navegador.

// E com a funcionalidade cy.tick(), você pode avançar no tempo. 🕒



// Cypress._.times() --> executa uma função de callback um certo número de vezes, onde o número de veses é o primeiro argumento
//e a função callback o segundo

it('Exercicio extra função Cypress._.times() ', () => {
      //cy.clock()

      const longText = Cypress._.repeat('abcdefghijklmnopqrstuvxyzw', 10 )

      cy.get('#firstName').click().type('Leonardo')
      cy.get('#lastName').click().type('Oliveira')
      cy.get('#email').click().type('teste@123.com')
      cy.get('#open-text-area').type(longText, { delay: 0 })
      cy.contains('button','Enviar').click()

      cy.get('.success').should('be.visible')

      cy.tick(3000)

      cy.get('.success').should('not.be.visible')
    })

///LODASH

Cypress._.times(3, () => { //--> Executa uma funçção de callback um número de vezes onde o número de vezes é o primeiro argumento e a função callback o segundo
  console.log('Olá Cypress!')
}) //Isso registrará 'Olá Cypress!' três vezes no console.

Cypress._.repeat() // --> a funcionalidade serve para repetir uma string certo número de vezes, onde o primeiro argumetno é a string 
//a qual deseja repetir, e o segundo argumento é quatas vezes a string deve ser repetida
const repeatedText = Cypress._.repeat('lorem ipsum, ', 3)

console.log(repeatedText) // Isso registrará 'lorem ipsum, lorem ipsum, lorem ipsum, ' no console.

it('preenche o campo da área de texto usando o comando invoke', () => {
  cy.get('.success')
    .should('not.be.visible')
    .invoke('show')// você pode forçar a exibição de um elemento HTML que está oculto, com display: none;
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide')//você pode ocultar um elemento que está sendo exibido.
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')
})
// Exercício extra 3 com uso do .invoke()
it('Exercício extra 3 de invoke', () => {
  cy.get('#open-text-area')
    .invoke('val', 'um texto qualquer')// digitou o texto estantaneo não 1 de cada vez
    .should('have.value', 'um texto qualquer')
})

//CY.REQUEST()
it('', () => {

  
})


})
