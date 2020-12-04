# Sistema
API com interface básicas para resolver problemas em um chat.


# VERSÕES
## Chat, User, Message v1
  ### Database
- [x] Chat
- [x] User
- [x] SEND_BY
- [x] YYYY-MM-DD
- [x] IS_ON

  ### Api
- [x] Interface básica para chat
- [x] Criar usuários clientes
- [x] Criar usuários funcionários
- [x] Abrir chat pelo id dos usuários 
- [x] Veriicar se chat/usuários existem


## Staff, Client, Problem v2
  ### Database
- [X] Staff
- [X] Client
- [x] Problem, Solution
- [x] HAS_PROBLEM
- [x] SOLVED

  ### Api
- [x] especificar o tipo de usuário ao criar
- [x] cadastrar problema resolvido e eliminar staff do chat
- [x] editar quem está no chat
- [x] cadastrar chat pelo problema
- [x] definir os funcionários ao criar o problema
- [x] get para problems de client e staff
- [x] flexibilizar o identificador do websocket
- [x] padronizar variáveis com o esquema

### api 0.2
- [ ] controle entre staff no chat de acordo com o problema ao qual foi cadastrado
- [x] documentação detalhada do swagger
- [x] mensagens de exception

## Ações para implementar com o front
- [x] enviar hora para poder ordenar as mensagens no chat
- [ ] a computação das datas de tempo médio para resolver problema
- [ ] a regra de negócio deve ditar quantidade máxima de user no chat e se ao final de todos os problemas quem deve sair
- [ ] responsividade
- [ ] subtela para cadastrar problema
- [ ] socket no front