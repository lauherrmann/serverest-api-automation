Feature: Cadastro de usuário

    Scenario Outline: Cadastrar usuário
    Given que um payload JSON de cadastro de usuário seja configurado
    When o usuário enviar uma requisição POST para o endpoint de cadastro de usuário com este payload
    Then o sistema deve retornar status 201 com a mensagem: "<mensagem>"

    Examples:
    | mensagem                       |
    | Cadastro realizado com sucesso |    

    