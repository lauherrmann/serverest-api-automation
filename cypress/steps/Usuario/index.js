import { cadastrarUsuario } from "../../support/Requests/Usuario/cadastrarUsuario";

import gerarNomeAleatorio from "../../support/gerarNomeAleatorio";

Given("que um payload JSON de cadastro de usuário seja configurado", () => {
    const email = `${gerarNomeAleatorio()}@teste.com`; 

    cy.log(`E-mail gerado: ${email}`);

    cy.fixture('cadastrarUsuario').then(res => {
        //res.name = gerarNomeAleatorio();
        res.email = email;
        res.password = Cypress.env('SENHA_USUARIO');

        cy.wrap(res).as('cadastroUsuarioPayload');
    });
});

When("o usuário enviar uma requisição POST para o endpoint de cadastro de usuário com este payload", () => {
    cy.get('@cadastroUsuarioPayload').then(payload => {
        cadastrarUsuario(payload).then(res => {
            cy.wrap(res).as('responseCadastroUsuario');
        });
    });
});

Then("o sistema deve retornar status 201 com a mensagem: {string}", (mensagem) => {
    cy.get('@responseCadastroUsuario').then(res => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal(mensagem);
        expect(res.body._id).to.not.be.null;
    });
});
