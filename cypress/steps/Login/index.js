import { login } from '../../support/Requests/Login/login';

Given("que um payload de login seja configurado com usuário e senha",() =>{
    cy.fixture('login').then(res => {
        res.email = Cypress.env('EMAIL_USUARIO');
        res.password = Cypress.env('SENHA_USUARIO');

        cy.wrap(res).as('loginPayload');
    })
})

When("o usuário enviar uma requisição POST para o endpoint de login com este payload",() =>{
    cy.get('@loginPayload').then(payload => {
        login(payload).then(res => {
            cy.wrap(res).as('responseLogin');
        })
    })
})

Then("o sistema deve retornar status 200 com a mensagem: {string}",(mensagem) =>{
    cy.get('@responseLogin').then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal(mensagem);
        expect(res.body.authorization).to.not.be.null;
    })
});