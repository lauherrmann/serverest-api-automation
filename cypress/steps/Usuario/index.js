import { cadastrarUsuario } from "../../support/Requests/Usuario/cadastrarUsuario";

import gerarNomeAleatorio from "../../support/gerarNomeAleatorio";

Given("que o usuário tenha preenchido todos os dados obrigatórios para cadastro", () => {
    const email = `${gerarNomeAleatorio()}@teste.com`; 

    cy.log(`E-mail gerado: ${email}`);

    cy.fixture('cadastrarUsuario').then(res => {
        //res.name = gerarNomeAleatorio();
        res.email = email;
        res.password = Cypress.env('SENHA_USUARIO');

        cy.wrap(res).as('cadastroUsuarioPayload');
    });
});

When("solicitar a criação de sua conta", () => {
    cy.get('@cadastroUsuarioPayload').then(payload => {
        cadastrarUsuario(payload).then(res => {
            cy.wrap(res).as('responseCadastroUsuario');
        });
    });
});

Then("o sistema deve confirmar o cadastro com status 201 e exibir a mensagem: {string}", (mensagem) => {
    cy.get('@responseCadastroUsuario').then(res => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal(mensagem);
        expect(res.body._id).to.not.be.null;
    });
});
