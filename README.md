
# Portal para Projeto de Extensão de Engenharia Química da Universidade Federal de Uberlândia

Este projeto surge da necessidade do grupo PET de modernizar a comunicação com a comunidade acadêmica e externa. Nosso objetivo é substituir uma página desatualizada, permitindo a atualização das informações do grupo de forma rápida e fácil. Além disso, o portal possibilitará o gerenciamento eficiente das atividades e dos membros, tanto ativos quanto inativos, do grupo.

O projeto que serviu como base para o desenvolvimento deste foi: 
Notus Angular (<https://github.com/creativetimofficial/public-assets/blob/master/notus-angular/notus-angular.jpg?raw=true>)

## Principais Funcionalidades

- Atualização de Informações: Permite a atualização fácil e rápida das informações do grupo a partir de uma pagina de administracão.

- Gerenciamento de Membros: Facilita o controle de membros ativos e inativos.

- Relatórios Automatizados: Gera relatórios para prestação de contas de forma automatizada, em csv.

- Redução de Custos: Diminui os custos de manutenção e sustentacão da página web, visto arquitetura utilizando azure e outros servicos gratuitos.

- Menor Necessidade de Alteração de Código: Minimiza a necessidade de modificações no código, com a implementacão de um banco de dados, visto que o grupo é composto por futuros engenheiros químicos, não programadores.

- O portal foi desenvolvido com o intuito de reduzir a carga administrativa, permitindo que o grupo PET se concentre em suas atividades principais e continue a fornecer um impacto positivo na comunidade.

## Instalação

- Instale o Node.js
  - Certifique-se de ter o Node.js na versão 22.12 instalado em seu sistema

- Acesse a Pasta do Projeto
  - Navegue até a pasta do projeto onde os arquivos estão localizados.

- Instalação Segura
  - Execute o comando a seguir para realizar uma instalação segura das dependências: `npm run install:clean`

- Configuração da Página de Administração
  - A página de administração utiliza o recurso MSAL da Azure. Para testar o fluxo da parte de administração, altere o valor de redirectUri no arquivo auth.config.ts para: `http://localhost:4200/admin/dashboard`

- Configuração do Backend
  - Se você deseja executar o backend em conjunto com a aplicação frontend, ajuste a URL no arquivo environment.ts conforme necessário.

- Iniciar a Aplicação
  - Para rodar a aplicação, utilize o comando: `npm run start`

## Páginas
Falando um pouco especificamente sobre as páginas disponíveis neste projeto, temos:

- Administração
  - Dashboard (Página Inicial): Visão geral e acesso rápido às principais funcionalidades administrativas.
  - Integrantes: Gerenciamento dos membros ativos e inativos do grupo.
  - Planejamento e Relatório: Gerenciamento de anexos a serem disponibilizados no site sobre planejamento e relatorio de atividades do grupo.
  - Processo Seletivo: Publicacão de edital de processos seletivos e seus resultados.
  - Extensão: Gerenciamento das atividades de extensão do grupo.
  - Pesquisa: Gerenciamento das atividades de pesquisa.
  - Minicursos: Administração dos minicursos oferecidos.
  - Calendário de Atividades: Visualização e gerenciamento do calendário de atividades a serem realizadas para a comunidade externa ao grupo PET.
  - Estilo JornEQ: Configurações e personalizações específicas para o evento JornEQ.
  - Autenticação: Página para inserir usuário e acessar a administração.
- Autenticação
  - Login: Página de login para acesso ao sistema.
- Páginas Públicas
  - Ensino: Informações e atividades relacionadas ao ensino.
  - Atividades: Visão geral das atividades realizadas pelo grupo.
  - Pesquisa: Informações e atividades relacionadas à pesquisa.
  - Extensão: Informações e atividades relacionadas à extensão.
  - Página Inicial: Página inicial pública do site.
  - Notícias: Atualizações e notícias relevantes do grupo para a comunidade externa. (EM DESENVOLVIMENTO)
  - Processo Seletivo: Informações sobre os processos seletivos abertos ao público e seus resultados.
  - Sobre: Informações sobre o grupo PET, membros e seus objetivos.

Um dos desenvolvimentos futuros do projeto é a integração da JORNEQ, um evento anual organizado pelo grupo PET. Atualmente, a página do evento é construída via Google Sites, mas a intenção é incorporá-la ao mesmo projeto para uma experiência mais integrada e profissional.

## Navegadores Suportados

Até o presente momento os seguintes navegadores foram validados para uso da aplicacão

| Chrome | Firefox | Edge | Safari | Opera |
|:---:|:---:|:---:|:---:|:---:|
| ![Logo do Chrome](https://github.com/creativetimofficial/public-assets/blob/master/logos/chrome-logo.png?raw=true) | ![Logo do Firefox](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/firefox-logo.png) | ![Logo do Edge](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/edge-logo.png) | ![Logo do Safari](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/safari-logo.png) | ![Logo do Opera](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/opera-logo.png) |