# Portal para Projeto de Extensão de Engenharia Química da Universidade Federal de Uberlândia

[![Angular](https://img.shields.io/badge/Angular-%23DD0031.svg?logo=angular&logoColor=white)](#)
[![Microsoft Azure](https://custom-icon-badges.demolab.com/badge/Microsoft%20Azure-0089D6?logo=msazure&logoColor=white)](#)
[![Codacy](https://img.shields.io/badge/Codacy-222F29?logo=codacy&logoColor=fff)](#)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?logo=Cloudflare&logoColor=white)](#)

Este projeto surge da necessidade do grupo PET de modernizar a comunicação com a comunidade acadêmica e externa. Nosso objetivo é substituir uma página desatualizada, permitindo a atualização das informações do grupo de forma rápida e fácil. Além disso, o portal possibilitará o gerenciamento eficiente das atividades e dos membros, tanto ativos quanto inativos, do grupo.

O projeto que serviu como base para o desenvolvimento deste foi: [Notus Angular](https://github.com/creativetimofficial/public-assets/blob/master/notus-angular/notus-angular.jpg?raw=true)

## Principais Funcionalidades

- **Atualização de Informações**: Permite a atualização fácil e rápida das informações do grupo e das informações públicas a serem divulgadas a partir de uma página de administração.
- **Gerenciamento de Membros**: Facilita o controle de membros ativos e inativos e de suas informacões.
- **Gerenciamento de Atividades**: Facilita o controle de atividades realizadas e em realizacão pela organizacão.
- **Gerenciamento de Processo Seletivos**: Publicacão rapido e facil para a comunidade de oportunidades e resultados.
- **Apresentacao da Organizacão**: Apresentacão da organizacão e um organograma para facil acesso aos membros de interesse do visitante.
- **Relatórios Automatizados**: Gera relatórios de forma automatizada, em CSV.
- **Redução de Custos**: Com a implementacão do projeto ocorreu a diminuicão de custos de sustentação da página web, utilizando arquitetura baseada em Azure e outros serviços gratuitos.
- **Menor Necessidade de Alteração de Código**: Minimiza a necessidade de modificações no código, com a implementação de um banco de dados e uso de CDN, visto que o grupo é composto por futuros engenheiros químicos, não programadores.

O portal foi desenvolvido com o intuito de reduzir a carga administrativa, permitindo que o grupo PET se concentre em suas atividades principais e continue a fornecer um impacto positivo na comunidade.

## Instalação

1. **Instale o Node.js**
   - Certifique-se de ter o Node.js na versão 22.12 instalado em seu sistema.

2. **Acesse a Pasta do Projeto**
   - Navegue até a pasta do projeto onde os arquivos estão localizados.

3. **Instalação Segura**
   - Execute o comando a seguir para realizar uma instalação segura das dependências:
     ```sh
     npm run install:clean
     ```

4. **Configuração da Página de Administração**
   - A página de administração utiliza o recurso MSAL da Azure. Para testar o fluxo da parte de administração, altere o valor de `redirectUri` no arquivo `auth.config.ts` para:
     ```sh
     http://localhost:4200/admin/dashboard
     ```

5. **Configuração do Backend**
   - Se você deseja executar o backend em conjunto com a aplicação frontend, ajuste a URL no arquivo `environment.ts` conforme necessário.

6. **Iniciar a Aplicação**
   - Para rodar a aplicação, utilize o comando:
     ```sh
     npm run start
     ```

## Páginas

Falando um pouco especificamente sobre as páginas disponíveis neste projeto, temos:

- **Administração**
  - **Dashboard (Página Inicial)**: Visão geral e acesso rápido às principais funcionalidades administrativas.
  - **Integrantes**: Gerenciamento dos membros ativos e inativos do grupo.
  - **Planejamento e Relatório**: Gerenciamento de anexos a serem disponibilizados no site sobre planejamento e relatório de atividades do grupo.
  - **Processo Seletivo**: Publicação de edital de processos seletivos e seus resultados.
  - **Extensão**: Gerenciamento das atividades de extensão do grupo.
  - **Pesquisa**: Gerenciamento das atividades de pesquisa.
  - **Minicursos**: Administração dos minicursos oferecidos.
  - **Calendário de Atividades**: Visualização e gerenciamento do calendário de atividades a serem realizadas para a comunidade externa ao grupo PET.
  - **Estilo JornEQ**: Configurações e personalizações específicas para o evento JornEQ.
  - **Autenticação**: Página para inserir usuário e acessar a administração.
  - **Autenticação - Login**: Página de login para acesso ao sistema.

- **Páginas Públicas**
  - **Ensino**: Informações e atividades relacionadas ao ensino.
  - **Atividades**: Visão geral das atividades realizadas pelo grupo.
  - **Pesquisa**: Informações e atividades relacionadas à pesquisa.
  - **Extensão**: Informações e atividades relacionadas à extensão.
  - **Página Inicial**: Página inicial pública do site com calendario de proximas atividades para a comunidade.
  - **Notícias**: Atualizações e notícias relevantes do grupo para a comunidade externa. (EM DESENVOLVIMENTO)
  - **Processo Seletivo**: Informações sobre os processos seletivos abertos ao público e seus resultados.
  - **Sobre**: Informações sobre o grupo PET, membros e seus objetivos.

Um dos desenvolvimentos futuros do projeto é a integração da JORNEQ, um evento anual organizado pelo grupo PET. Atualmente, a página do evento é construída via Google Sites, mas a intenção é incorporá-la ao mesmo projeto para uma experiência mais integrada e profissional.

## Fluxograma Base de Funcionamento da Aplicação

Logo abaixo apresento fluxogramas reduzidos que representam o funcionamento geral da ferramenta.

### Busca de Dados Públicos

1. **Início**: O processo começa com o "Site estático PET-EQ", que envia uma solicitação.
2. **Rota GET**: A solicitação é enviada ao backend Python através de uma rota GET.
3. **Backend Python**: O backend em Python recebe a solicitação e processa a busca. Caso ocorram filtros de busca e/ou paginação, o mesmo os aplica.
4. **Busca de Dados no Banco**: O backend Python busca os dados no banco de dados SQL.

![Dados Públicos](https://pub-55adf5718cd045b9ac6ed9a8aca88510.r2.dev/ImagensArquitetura/DadosPublicos.png)

### Login Administração

1. **Início**: O processo de login começa com o usuário acessando o site estático PET-EQ.
2. **Redirecionamento para Microsoft Entra**: O usuário é redirecionado para o Microsoft Entra para autenticação.
3. **Verificação do Usuário**: O Microsoft Entra verifica se o usuário é válido.
   - **Usuário é válido?**
     - **Sim**: Se o usuário for válido, um token é enviado de volta ao site estático PET-EQ.
     - **Não**: Se o usuário não for válido, ele é mantido na página de login.

![Login](https://pub-55adf5718cd045b9ac6ed9a8aca88510.r2.dev/ImagensArquitetura/Login.png)

### Alteração de Dados na Base de Dados e Rotas Sensíveis

1. **Início**: Um site estático (PET-EQ) envia em uma rota um token da Microsoft Entra para o backend em Python.
2. **Verificação do Token**: O backend em Python verifica a validade do token usando o Microsoft Graph.
   - **Token válido?**
     - **Sim**: Continuar para validação dos dados.
     - **Não**: **Exceção** - Token inválido.
3. **Validação dos Dados**: Se o token for válido, os dados enviados são validados.
   - **Dados válidos?**
     - **Sim**: Continuar para operação no banco de dados.
     - **Não**: **Exceção** - Dados inválidos.
4. **Operação no Banco de Dados**: Se tanto o token quanto os dados forem válidos, a operação é realizada com sucesso no banco de dados SQL.
5. **Tratamento de Erros**: Log de erros em caso de token ou dados inválidos.

![Fluxograma dados sensíveis](https://pub-55adf5718cd045b9ac6ed9a8aca88510.r2.dev/ImagensArquitetura/DadosSensiveis.png)

### Busca de Mídia

Todas as imagens do site se encontram em CDN Cloudflare. O motivo desta escolha se dá pela necessidade de troca de imagens sem a necessidade de alteração de código, além do aumento de performance.

![CDN](https://pub-55adf5718cd045b9ac6ed9a8aca88510.r2.dev/ImagensArquitetura/cnd.png)

## Navegadores Suportados

Até o presente momento os seguintes navegadores foram validados para uso da aplicacão

| Chrome | Firefox | Edge | Safari | Opera |
|:---:|:---:|:---:|:---:|:---:|
| ![Logo do Chrome](https://github.com/creativetimofficial/public-assets/blob/master/logos/chrome-logo.png?raw=true) | ![Logo do Firefox](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/firefox-logo.png) | ![Logo do Edge](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/edge-logo.png) | ![Logo do Safari](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/safari-logo.png) | ![Logo do Opera](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/opera-logo.png) |