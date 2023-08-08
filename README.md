# API da aplicação Food-Explorer

Este projeto foi desenvolvido para ser uma API própria para a aplicação fornt-end: https://github.com/lucassaymon1/Food-Explorer-front
Através desta aplicação, o front-end é capaz de realizar requisições para o servidor e assim criar, mostrar, alterar e excluir pratos que estão à venda em um site para restaurante.

## Instruções para acessar o projeto

Para acessar diretamente a aplicação e testá-la você mesmo, basta acessar: https://foodexplorer-vacherin-303ff0.netlify.app e seguir as instruções disponíveis em https://github.com/lucassaymon1/Food-Explorer-front#readme

## Configurando ambiente

Caso queira rodar o projeto localmente, você deve seguir os seguintes passos:

 #### --> No arquivo `.env.example`:

  Crie um hash para que possa ser usado como chave secreta dos tokens que forem criados.
  Você pode gerar uma pelo site https://www.md5hashgenerator.com

  Substitua conforme o exemplo:

  <img width="810" alt="hash-example" src="https://github.com/lucassaymon1/Food-Explorer-back/assets/102837549/18deec06-68e6-4523-80be-78a2c1d2eefe">
  

  #### --> No arquivo `server.js`:
   Habilite o acesso de requisições do servidor front-end conforme o exemplo:
 
   <img width="810" alt="Cors-origin-example" src="https://github.com/lucassaymon1/Food-Explorer-back/assets/102837549/1aff99b2-6cae-4a96-9c82-a7ea45700892">

   No campo `cors` altere, se necessário, para a url de origem do front-end.
   

   ## Inicializando servidor
 #### --> Na pasta raiz do projeto, insira os comandos:
   `npm install` - Instala todos os pacotes de dependencias do projeto, bem como a pasta `node_modules`.
   
   `npm run migrate` - Inicializa as migrações para o banco de dados e cria o arquivo `database.db`, onde serão armazenados todos os dados.
   
   `npm run dev` - Inicializa um servidor local para que o front-end possa acessá-lo.
   
## Conclusão
Seguindo esses passos, um servidor local será gerado e você poderá acessá-lo ao também rodar localmente a aplicação front-end.
