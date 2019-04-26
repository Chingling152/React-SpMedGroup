# Site Sp Medical Group  
Site para a empresa fantasma Sp Medical Group  
## Sumario  
1. **[Instalando o projeto](#Instalando-o-projeto)**  
 1.1. **[Dependencias](#Dependencias-do-projeto)**  
 1.2. **[Instalação](#Instalação)**  
2. **[Sobre o projeto](#Sobre-o-projeto)**  
 2.1. **[Arquitetura do projeto](#Arquitetura-do-projeto)**  
 2.2. **Cronograma do projeto**  
3. **Utilizando o projeto**  
 3.1. **Paginas**  
 3.2. **Permissões**  
4. **Responsividade**  
 4.1. **Telas suportadas**  
 4.2. **Mudanças**  
5. **Prototipação**  
 5.1. **Wireframe**  
 5.2. **Design**  
6. **Agradecimentos**  

## 1. Instalando o projeto
Para iniciar esse projeto você irá precisar executar **todos** esses passos para que o programa funcione
### 1.1. Dependencias do projeto  
Para que esse projeto se possa ser executado será necessario algumas coisas e aqui estão elas na ordem :
 - **[Banco de dados](https://github.com/Chingling152/SQL-SPMedGroup)** :  
   É necessario para armazenar os dados desse site. Lá no repositorio tem mais informações de como usar o banco de dados e como é a sua arquitetura.  
 - **[API](https://github.com/Chingling152/WebApi-SPMedGroup)** :  
  Qualquer dado que é buscado, inserido, deletado ou alterado do banco de dados deve passar pela API . Lá tambem tem informações de como instalar e usar a API (**Requer banco de dados**).  
 - **React**  
  Para usar essa aplicação você irá precisar de algumas bibliotecas de Javascript instaladas dentro na pagina do seu projeto (Veja : [Instalação](#Instalação))  
  
### 1.2. Instalação  
Aqui ficará a*"receita"* de como instalar a aplicação, siga todos os passos :
 1. Instale o banco de dados  
 2. Instale a API  
 3. Execute a API e verifique que ela está conectada ao banco de dados (tente logar e cadastrar algo)  
 4. Instale o React  
   4.1. Baixe e instale o Node.js neste link -> [Node.js](https://nodejs.org/en/download/) 
   4.2. Abra o prompt de comando e digite : *npm install -g create-react-app*  
   4.3. Instale as dependencias do projeto : *npm install -g react-router-dom*  
   4.4. Baixe esse projeto  
   4.5. Vá para pasta C:\Users\\**{NomeDoUsuario}**\AppData\Roaming\npm\node_modules\create-react-app e copie a pasta **node_modules**
   4.6. Cole a pasta node_modules dento da pasta **sp-medical-group**   
 5. Abra o prompt de comando no diretorio do projeto (mesma pasta) e execute o comando *npm start*  
 6. O projeto será aberto em uma aba do seu navegador padrão  
 7. Algumas informações extras -> [README.md](https://github.com/Chingling152/React-SpMedGroup/blob/master/sp-medical-group/README.md)  

### 2.. Sobre o projeto  
Aqui terá informações sobre o projeto em geral.  
#### 2.1. Arquitetura do projeto  
Precisei criar esse arquivo para explicar onde está cada coisa do projeto (pois ele é muito grande e dividido em várias pastas).  
##### 2.1.1. Paginas  
Aqui ficam todas as páginas do projeto.  Todas os arquivos de cada pasta são acessados através do arquivo **src/index.js**.  

* **Administrador**   
Aqui ficam todas as pastas de funcionalidades do Administrador. Essas páginas só podem ser acessadas caso o usuário seja um administrador.  
**Home**: A página inicial do administrador, todas as outras páginas só podem ser acessadas através dela.  
**Médicos/Pacientes/Especialidades/Instituições/Consultas**: São pastas onde o administrador poderá alterar ou cadastrar novos dados utilizando a API.  
* **Usuário**  
Aqui ficam todas as pastas de funcionalidades de um Usuário autenticado. Não deve ser confundida com a pasta Público. Essas páginas só são acessíveis para um usuário que tenha uma conta e esteja logado nela.  
Todas as páginas podem ter diferenças (depende do nível de privilégio do usuário. Exemplo: a página de usuário de um médico terá mais funcionalidades do que a de um paciente)
**Home**: A página inicial do usuário, todas as outras páginas só podem ser acessadas através dela.
**Consultas**: Aqui ficará todas as informações de todas as consultas desse usuário. Médicos poderão alterar algumas informações delas enquanto pacientes poderão apenas visualiza-las.  
* **Publico**  
Aqui ficam todas as páginas que podem ser acessadas por qualquer pessoa independentemente de estar logada.  
**Home**: A página inicial da aplicação, todos os usuários começam aqui caso não estejam logados.
**Login**: Aqui é a página onde qualquer pessoa pode entrar em sua conta e ter acesso a todas as funções de um Administrador ou Usuário.  
Falhas: Páginas que são acessadas apenas quando o usuário tenta acessar uma página que não existe ou que ele não tem permissão.  

##### 2.1.2. Componentes
Nesta pasta ficarão partes que são reutilizadas em várias pastas (um bom exemplo é o Cabeçalho)
* **Feedback**  
Pasta onde tem qualquer componente responsável por retornar uma mensagem ao usuário.
* **Partes**  
São componentes comuns que compõem as paginas  

##### 2.1.3. Recursos  
Qualquer outro recurso que é usado pelas paginas do site (fotos/videos/icones/arquivos de estilização)  

##### 2.1.4. Services
Todos scripts que são usados e compartilhados por varias paginas (e sim, poderia haver mais arquivos e eles poderiam estar mais organizados. Só que por agora está bom)  
* **Autenticacao.TokenUsuario**  
Busca o valor do token armazenado localmente e o retorna  
* **Autenticacao.jwtParse**  
Converte o token do metodo *Autenticacao.TokenUsuario* e envia para o metodo *Autenticacao.TokenValido* se ele for valido , o retorna em forma de objeto , se não , retorna null  
* **Autenticacao.TokenValido**  
Verifica se a data de espiração do token é menor do que a data atual. Se ela for , ele ainda é valido.  
* **ApiService.chamada**  
Uma promessa que pode fazer 4 ações diferentes. 
Essa promessa precisa ter um endpoint (parte do link da API) para saber onde deverá ser feita a requisição.  
Os metodos dessa promessa serão o que será feito nessa requisição (Alterar valores , cadastrar , enviar , buscar ,etc).  
  * **Login** : Metodo uti apenas para o usuario. Semelhante ao CADASTRAR , mas este metodo não precisa do token.  
  * **Alterar** : Envia uma requisição na API para alterar algum valor (precisa de um corpo para ser enviado , ou seja um objeto que se encaixe no padrão da endpoint API)  
  * **Cadastrar** : Envia uma requisição na API para enviar um valor (possivelmente inseri-lo no banco de dados) , assim como o metodo ALTERAR , precisa de um corpo que se encaixe com o valor aceito no endpoint da API  
* **Cabecalho**  
Recebe os valores do token (armazenado localmente), verifica se ele não é nulo e qual o nivel de privilegio dele e retorna um cabeçalho com as funcionalidades disponiveis para o Usuario  
* **Enums.enumParse**  
Converte uma enumeração do tipo EnSituacaoConsulta para um valor numerico sendo :  
 - 1 => Aguardando  
 - 2 => Concluida  
 - 3 => Cancelada  
  
#### Cronograma do projeto
Aqui ficara  o cronograma do projeto (Iniciado de 12/04 e finalizado dia 26/04)  

- **Dia 1**  
Apenas inicieis os layouts de baixa fidelidade e organizei as pastas do projeto.  
- **Dia 2**  
Finalizei a pagina de login e já criei ela (sem funcionalidade). Também criei os redirecionamento para todas as telas (ainda vazias)  
- **Dia 3**  
Finalizei o design da pagina de listagem de consultas e a criei (sem nenhuma funcionalidade)  
- **Dia 4**  
Reformulei a API  

## Agradecimentos
Alguns links que foram muito uteis na criação desse projeto
- **[Propriedades, componentização , redirecionamento , validação , conexão com API ,etc..](https://github.com/senai-desenvolvimento/1s2019-t2-sprint-4-frontend)**
- **[Como resetar campos com react](https://stackoverflow.com/questions/47171437/is-this-correct-way-to-clean-input-in-react)**  
- **[Tokens e validação](https://github.com/senai-desenvolvimento/1s2019-t2-sprint-4-frontend/blob/master/manha/senai-svigufo-ui/src/services/auth.js)**
- **[Patern (HTML5)](https://www.w3schools.com/code/tryit.asp?filename=G3CAISEPDS3T)**
- **[Date.dateParse](https://www.codeproject.com/Questions/186641/Convert-string-in-to-date-using-javascript)**  
- **[Recebendo dados com o State](https://medium.freecodecamp.org/get-pro-with-react-setstate-in-10-minutes-d38251d1c781)**  
- **[Usando metodos como referencia](https://blog.logrocket.com/how-to-use-react-createref-ea014ad09dba)**