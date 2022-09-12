# chat_solved_problems-nestjs-neo4j

Aplicação web desenvolvida no backend com o framework [NestJS](https://nestjs.com/) e o banco de dados em grafos [Neo4j](https://neo4j.com/) e no frontend com o framework [ReactJS](https://pt-br.reactjs.org/).

### Descrição das entidades

Nesta aplicação pelo lado do **Cliente** os problemas são cadastrados, daí a aplicação cria um **Chat** com **Funcionários** pré-definidos e nesse Chat é onde ocorre a troca de **Mensagens**. Posteriomente podem ser utilizadas requisições HTTPS para inserir ou remover determinado funcionário no chat.

Os relacionamentos das mensagens identificam quem enviou a mensagem (Cliente ou Funcionário) e também a data de envio com o chat.

Todos os Clientes e Funcionários são do tipo **User** que possui atributos de username, password e salt, apesar destes não serem mostrados no diagrama.

Os **Problemas** relacionam-se com os clientes que criaram e também com os funcionários que resolveram ele, além de serem rotulados como **Resolved** após serem resolvidos.

Os atributos utilizados em relacionamentos e principalmente para descrever as variáveis podem ser observados no diagrama abaixo.

![img](https://raw.githubusercontent.com/guimaraaes/chat_solved_problems-nestjs-neo4j/master/arrow-schema-chat/v.png)

### Outras observações

- Autenticação [JWT](https://jwt.io/) para proteger a API e o acesso é permitido para os funcionário autenticados com os atributos e-mail e password.

- Documentação da API com o [Swagger](https://swagger.io/).

- Biblioteca [Socket.IO](https://socket.io/) para permitir a troca de mensagens.

### :mailbox: Dúvidas? Me manda um [e-mail](sguimaraaes@gmail.com) 
