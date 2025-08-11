export function cadastrarUsuario(payload) {
    return cy.request({
        method: "POST",
        url: `/usuarios`,
        body: payload,
        failOnStatusCode: false
    })
}