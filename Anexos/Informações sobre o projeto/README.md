## Dia 1

- Layout iniciado
- Estrutura do projeto criado
- Todas as pastas e arquivos necessários foram criados

## Dia 2

- Pagina de login criada (sem qualquer funcionalidade ainda) 
- Layout da pagina principal foi finalizado (isso ta me atrasando)
- Decidi que a pagina de consultas será junta com a de consulta
- Criei um arquivo para explicar a arquitetura do projeto (ele é muito grande então ficaria difícil entender ele)
- Finalizei as rotas entre as paginas (sem qualquer autenticação envolvida)
- Iniciei a criação da pagina de listagem de consultas (sem nenhum design aparente)

## Dia 3

- Finalizei a criação da pagina de listagem de consultas mas acho que as paginas merecem uma cor no fundo pelo menos (está tudo meio morto)
- Componentizei grande parte dos elementos do site
- Estou iniciando a pagina de cadastro de usuário e depois vou usar esse mesmo template para todos os outros formulários de cadastro
- Amanhã terei que mudar algo na API para que as consultas retornem do jeito que eu quero (e terei que terminar o *arquitetura_do_projeto.docx*)

## Dia 4

- Fiquei preso à um problema na API hoje acho que vou ficar boa parte do dia resolvendo ele
- Finalizei todas as telas de cadastro do site amanhã irei inicias com as funcionalidades (possivelmente procurar entender um pouco sobre a *services.js*)
- Preciso pensar em uma cor para o site, ele parece meio morto

## Dia 5

- Hoje eu pensei em ignorar a parte do design e focar na autenticação e permissões do usuário
- Irei adicionar melhorias na minha API (que não serão usadas por enquanto)
- Vou testar as rotas entre paginas , só tenho que chegar em casa porque o SQL Server não está funcionando aqui 
- Finalizei a pagina de login , o usuário está recebendo o token e armazenando ele
- Iniciei a listagem cadastro de usuários 
- Não finalizei o cadastro de usuários apenas fiz as listagens

## Dia 6

- Finalizei o cadastro e a listagem de usuários e de especialidades
- Tenho que pensar em como componentizar os métodos de cadastro e alteração porque todos serão iguais
- Iniciei o cadastro de medicos mas antes tenho que fazer o cadastro de clinicas
- Fiz a autenticação com token e o usuário apenas pode acessar algumas paginas
- Finalizei o cadastro de Clinicas e comecei o cadastro de medicos
- Amanhã espero finalizar esse papo de cadastro e ir para alteração e feedback
- Ainda não iniciei a documentação....

### Dia 7

- Fiz com que o site verificasse a data de expiração de um token (hoje eu acordei e vi que tava usando o mesmo token de ontem (22:00) eu conseguia acessar as paginas , mas a API não aceitava)
- Tenho que alterar a API para retornar alguns valores filtrados
- Tenho que terminar o cadastro de medicos e paciente 

### Dia 8

- Fiquei em repouso então não produzi nada

### Dia 9

- Não me sinto 100% mas acho que consigo produzir algo hoje
- Terminei a pagina de cadastro de pacientes mas o design dela ta estranho As mensagens de erro quebram o site
- Finalizei o cadastro de consultas
- Preciso ver a listagem de consultas dos usuários
- Tenho que arrumar ainda a alteração de valores pro administrador
- Estou tendo um problema com a listagem de uma consulta de um usuário especifico 
 - o que está acontecendo é que a API retorna um Paciente/Medico com todas as consultas e em alguns casos isso atrapalha na hora da listagem de uma unica consulta porque a maneira de buscar dados seria diferente dependendo do tipo de usuário
 - Talvez eu tenha que alterar o retorno na API

### Dia 10

- Terminei a listagem de consultas do usuário , e a consulta detalhada . 
- Arrumei alguns bugs de retorno da API (ficou algo bem *gambiarrento* mas por agora está funcional)
- Agora estou tendo problemas na hora de alterar valores da consulta na parte do medico
- Produzi muito pouco hoje comparado aos outros dias.... tive uma duvida e fiquei nela o dia inteiro e ainda não a resolvi

### Dia 11

- Arrumei um jeito de contornar o problema de alteração (o método sempre é enviada como um **OPTION** ao invés de **PUT**)
- Por algum motivo o fetch não funciona se for usando o *ApiService.js* então vou ter que usar um fetch em todas paginas
- Preciso só fazer com que os valores vão para os input ao clicar em *Alterar*
- Iniciei a documentação agora 
- Finalizei a alteração de pacientes , usuários e medicos para o administrador . Minha meta para amanhã é finalizar tudo que tiver do administrador e correr para a documentação e a alteração de consultas do medico
- Fiz alguns retoques no código e no projeto (só estética mesmo)
- Não gostei do método que usei para alterar os valores do pacientes/medicos/usuários , mas vou ter que usar ele porque está funcionando

### Dia 12

- Finalizei todos os métodos de alteração do administrador
- Vou gastar o resto do dia focando na UX , Documentação e na alteração de consultas do Medico
- Talvez eu foque no design da aplicação também
- Tive problemas com a visualização de consultas do medico mas tudo ficou OK no final das contas 
- Incrementei minha API para que a pagina inicial não ficasse estática 

### Dia 13

- Documentação iniciada.
- Testei todo o projeto.
- Amanhã é o dia da entrega.