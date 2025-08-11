Feature: Login no sistema

  Scenario Outline: Login bem-sucedido com credenciais válidas
    Given que o usuário informa seu usuário e senha corretamente
    When solicita o acesso ao sistema
    Then o login deve ser realizado com sucesso e o sistema deve exibir a mensagem: "<mensagem>"

    Examples:
      | mensagem                    |
      | Login realizado com sucesso |

