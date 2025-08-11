Feature: Cadastro de usuário

  Scenario Outline: Cadastro bem-sucedido
    Given que o usuário tenha preenchido todos os dados obrigatórios para cadastro
    When solicitar a criação de sua conta
    Then o sistema deve confirmar o cadastro com status 201 e exibir a mensagem: "<mensagem>"

    Examples:
      | mensagem                       |
      | Cadastro realizado com sucesso |

