Feature: Efetuar o login

    Scenario Outline: Efetuar Login
    Given que um payload de login seja configurado com usuário e senha
    When o usuário enviar uma requisição POST para o endpoint de login com este payload
    Then o sistema deve retornar status 200 com a mensagem: "<mensagem>"

    Examples:
    | mensagem                       |
    | Login realizado com sucesso    |