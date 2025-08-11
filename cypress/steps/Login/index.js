import { login } from '../../support/Requests/Login/login';

Given("que o usuário informa seu usuário e senha corretamente",() =>{
    cy.fixture('login').then(res => {
        res.email = Cypress.env('EMAIL_USUARIO');
        res.password = Cypress.env('SENHA_USUARIO');

        cy.wrap(res).as('loginPayload');
    })
})

When("solicita o acesso ao sistema",() =>{
    cy.get('@loginPayload').then(payload => {
        login(payload).then(res => {
            cy.wrap(res).as('responseLogin');
        })
    })
})

Then("o login deve ser realizado com sucesso e o sistema deve exibir a mensagem: {string}",(mensagem) =>{
    cy.get('@responseLogin').then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal(mensagem);
        expect(res.body.authorization).to.not.be.null;
    })
});