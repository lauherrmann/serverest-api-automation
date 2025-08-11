export function login (payload) {
    return cy.request({
        method: "POST",
        url: `/login`,
        body: payload,
        failOnStatusCode: false
    })
}