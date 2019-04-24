# Site Sp Medical Group  
Site para a empresa fantasma Sp Medical Group
## Sumario  
1. **[Instalando o projeto](#Instalando-o-projeto)**
 1.1. **[Dependencias](#Dependencias-do-projeto)**  
 1.2. **[Instalação](#Instalação)**  
2. **Sobre o projeto**  
 2.1. **Arquitetura do projeto**  
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

## Agradecimentos
Alguns links que foram muito uteis na criação desse projeto
- **[Propriedades, componentização , redirecionamento , validação , conexão com API ,etc..](https://github.com/senai-desenvolvimento/1s2019-t2-sprint-4-frontend)**
- **[Como resetar campos com react](https://stackoverflow.com/questions/47171437/is-this-correct-way-to-clean-input-in-react)**  
- **[Tokens e validação](https://github.com/senai-desenvolvimento/1s2019-t2-sprint-4-frontend/blob/master/manha/senai-svigufo-ui/src/services/auth.js)**
- **[Patern (HTML5)](https://www.w3schools.com/code/tryit.asp?filename=G3CAISEPDS3T)**
- **[Date.dateParse](https://www.codeproject.com/Questions/186641/Convert-string-in-to-date-using-javascript)**
