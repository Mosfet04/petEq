# Portal para Projeto de Extensão de Engenharia Química da Universidade Federal de Uberlândia

[![Angular](https://img.shields.io/badge/Angular-%23DD0031.svg?logo=angular&logoColor=white)](#)
[![Firebase](https://img.shields.io/badge/Firebase-039BE5?logo=Firebase&logoColor=white)](#)
[![Microsoft Azure](https://custom-icon-badges.demolab.com/badge/Microsoft%20Azure-0089D6?logo=msazure&logoColor=white)](#)
[![Codacy](https://img.shields.io/badge/Codacy-222F29?logo=codacy&logoColor=fff)](#)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?logo=Cloudflare&logoColor=white)](#)

Este projeto surge da necessidade do grupo PET de modernizar a comunicação com a comunidade acadêmica e externa. Nosso objetivo é substituir uma página desatualizada, permitindo a atualização das informações do grupo de forma rápida e fácil. Além disso, o portal possibilitará o gerenciamento eficiente das atividades e dos membros, tanto ativos quanto inativos, do grupo.

**Sistema de Autenticação**: O projeto utiliza Firebase Authentication com suporte a login via Google OAuth e email/senha, garantindo segurança e facilidade de acesso aos usuários autorizados.

O projeto que serviu como base para o desenvolvimento deste foi: [Notus Angular](https://github.com/creativetimofficial/public-assets/blob/master/notus-angular/notus-angular.jpg?raw=true)

## Principais Funcionalidades

- **Atualização de Informações**: Permite a atualização fácil e rápida das informações do grupo e das informações públicas a serem divulgadas a partir de uma página de administração.
- **Gerenciamento de Membros**: Facilita o controle de membros ativos e inativos e de suas informacões.
- **Gerenciamento de Atividades**: Facilita o controle de atividades realizadas e em realizacão pela organizacão.
- **Gerenciamento de Processo Seletivos**: Publicacão rapido e facil para a comunidade de oportunidades e resultados.
- **Apresentacao da Organizacão**: Apresentacão da organizacão e um organograma para facil acesso aos membros de interesse do visitante.
- **Relatórios Automatizados**: Gera relatórios de forma automatizada, em CSV.
- **Redução de Custos**: Com a implementacão do projeto ocorreu a diminuicão de custos de sustentação da página web, utilizando arquitetura baseada em Azure e outros serviços gratuitos.
- **Monitoramento em Tempo Real**: Sistema integrado de health check que monitora a saúde da aplicação, incluindo métricas de performance, uso de recursos do sistema e status dos serviços.
- **Dashboard Inteligente**: Interface administrativa com alertas automatizados e indicadores visuais para facilitar o monitoramento mesmo por usuários não técnicos.
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

4. **Configuração Firebase (.env)**
   - Crie um arquivo `.env` na raiz do projeto copiando o arquivo exemplo:
     ```sh
     cp .env.example .env
     ```
   - Configure suas credenciais do Firebase no arquivo `.env`:
     ```env
     FIREBASE_API_KEY=sua_api_key_aqui
     FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
     FIREBASE_PROJECT_ID=seu_projeto_id
     FIREBASE_STORAGE_BUCKET=seu_projeto.firebasestorage.app
     FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
     FIREBASE_APP_ID=seu_app_id
     ```
   - **Importante**: O arquivo `.env` não será commitado (está no .gitignore) para proteger suas credenciais.

5. **Configuração de Emails Autorizados**
   - Edite o arquivo `src/app/config/authorized-emails.ts` para incluir os emails que terão acesso à área administrativa:
     ```typescript
     export const AUTHORIZED_EMAILS = [
       'admin@pet-eq.com',
       'seu-email@gmail.com',
       // Adicione mais emails conforme necessário
     ];
     ```

6. **Configuração do Backend**
   - Se você deseja executar o backend em conjunto com a aplicação frontend, ajuste a URL no arquivo `environment.ts` conforme necessário.

6. **Configuração do Backend**
   - Se você deseja executar o backend em conjunto com a aplicação frontend, ajuste a URL no arquivo `environment.ts` conforme necessário.

7. **Iniciar a Aplicação**
   - Para rodar a aplicação em modo de desenvolvimento, utilize o comando:
     ```sh
     npm start
     ```
   - O comando `npm start` automaticamente carregará as variáveis do arquivo `.env` e iniciará o servidor de desenvolvimento.

## Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento (carrega .env automaticamente)
- `npm run setup:env` - Configura o environment.ts com as variáveis do .env
- `npm run build` - Build padrão da aplicação
- `npm run build:prod` - Build de produção (usado no CI/CD)
- `npm run install:clean` - Instalação limpa das dependências

## Configuração de Segurança

### Sistema de Autenticação Firebase

O projeto utiliza Firebase Authentication com as seguintes características de segurança:

- **Autenticação Dupla**: Suporte a login via Google OAuth e email/senha
- **Controle de Acesso**: Lista de emails autorizados configurável
- **Tokens Seguros**: Tokens Firebase salvos localmente com expiração automática
- **Proteção de Rotas**: AuthGuard protege todas as rotas administrativas
- **Variáveis Seguras**: Credenciais Firebase protegidas via .env (local) e GitHub Secrets (produção)

### Configuração para Produção

Para deploy em produção, configure os seguintes GitHub Secrets:

- `FIREBASE_API_KEY`
- `FIREBASE_AUTH_DOMAIN`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_STORAGE_BUCKET`
- `FIREBASE_MESSAGING_SENDER_ID`
- `FIREBASE_APP_ID`

### Arquivos de Segurança

- `.env` - Credenciais locais (não commitado)
- `.env.example` - Modelo para configuração
- `src/app/config/authorized-emails.ts` - Lista de emails autorizados
- `.gitignore` - Protege arquivos sensíveis

## Sistema de Health Check e Monitoramento

O projeto inclui um sistema completo de monitoramento da saúde da aplicação, integrado ao dashboard administrativo, proporcionando visibilidade em tempo real do estado da aplicação.

### Funcionalidades do Health Check

- **Monitoramento Automático**: Verificações automáticas a cada 15-30 segundos
- **Métricas em Tempo Real**:
  - Status geral da aplicação (Saudável/Atenção/Crítico)
  - Tempo de resposta do banco de dados
  - Uso de CPU, Memória e Disco
  - Status dos serviços (Cache, Banco de dados)
- **Sistema de Alertas Inteligente**:
  - Alertas críticos para problemas que afetam a operação
  - Avisos para situações que precisam de atenção
  - Notificações informativas
  - Reconhecimento manual de alertas
- **Interface Amigável**: Projetada para ser compreensível por usuários não técnicos

### Endpoints de Health Check

O sistema consome os seguintes endpoints da API:

- `/api/health` - Verificação básica da saúde da aplicação
- `/api/health/detailed` - Verificação detalhada com métricas completas
- `/api/health/ready` - Verifica se a aplicação está pronta para receber tráfego
- `/api/health/live` - Verifica se a aplicação está respondendo

### Configuração do Health Check

O sistema utiliza **Axios** para comunicação com a API, configurado automaticamente através da variável `urlBackEnd` no environment. Os dados são atualizados automaticamente sem necessidade de intervenção manual.

### Benefícios para Administradores

- **Detecção Precoce**: Identifica problemas antes que afetem os usuários
- **Linguagem Simples**: Status traduzidos para termos não técnicos
- **Alertas Contextualizados**: Explicações claras sobre o impacto dos problemas
- **Histórico de Eventos**: Mantém registro dos últimos alertas para análise
- **Atualizações em Tempo Real**: Informações sempre atualizadas sem recarregar a página

## Páginas

Falando um pouco especificamente sobre as páginas disponíveis neste projeto, temos:

- **Administração**
  - **Dashboard (Página Inicial)**: Visão geral e acesso rápido às principais funcionalidades administrativas. Inclui sistema de monitoramento em tempo real da saúde da aplicação com:
    - **Status Geral da Aplicação**: Indicadores visuais do estado geral (Saudável/Atenção/Crítico)
    - **Métricas de Performance**: Score de performance, tempo de resposta do banco de dados e uso de recursos
    - **Alertas Inteligentes**: Sistema automatizado de alertas categorizados por criticidade (Crítico/Aviso/Informativo)
    - **Monitoramento de Recursos**: Acompanhamento em tempo real de CPU, Memória e Disco
    - **Status dos Serviços**: Monitoramento do banco de dados e cache
  - **Integrantes**: Gerenciamento dos membros ativos e inativos do grupo.
  - **Planejamento e Relatório**: Gerenciamento de anexos a serem disponibilizados no site sobre planejamento e relatório de atividades do grupo.
  - **Processo Seletivo**: Publicação de edital de processos seletivos e seus resultados.
  - **Extensão**: Gerenciamento das atividades de extensão do grupo.
  - **Pesquisa**: Gerenciamento das atividades de pesquisa.
  - **Minicursos**: Administração dos minicursos oferecidos.
  - **Calendário de Atividades**: Visualização e gerenciamento do calendário de atividades a serem realizadas para a comunidade externa ao grupo PET.
  - **Estilo JornEQ**: Configurações e personalizações específicas para o evento JornEQ.
  - **Autenticação**: Sistema de login com Firebase Authentication.
  - **Login**: Página de login com opções de autenticação via Google OAuth ou email/senha.

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
2. **Autenticação Firebase**: O usuário pode escolher entre duas opções de login:
   - **Login via Google OAuth**: Redirecionamento para autenticação Google
   - **Login via Email/Senha**: Autenticação direta com credenciais
3. **Verificação de Autorização**: O sistema verifica se o email do usuário está na lista de emails autorizados.
   - **Email autorizado?**
     - **Sim**: Se o email estiver autorizado, um token Firebase é gerado e salvo no localStorage.
     - **Não**: Se o email não estiver autorizado, o acesso é negado e o usuário é deslogado.
4. **Acesso Concedido**: Com o token válido, o usuário é redirecionado para o dashboard administrativo.

![Login](https://pub-55adf5718cd045b9ac6ed9a8aca88510.r2.dev/ImagensArquitetura/Login.png)

### Alteração de Dados na Base de Dados e Rotas Sensíveis

1. **Início**: Um site estático (PET-EQ) envia em uma rota um token Firebase para o backend em Python.
2. **Verificação do Token**: O backend em Python verifica a validade do token Firebase.
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

Até o presente momento os seguintes navegadores foram validados para uso da aplicação

| Chrome | Firefox | Edge | Safari | Opera |
|:---:|:---:|:---:|:---:|:---:|
| ![Logo do Chrome](https://github.com/creativetimofficial/public-assets/blob/master/logos/chrome-logo.png?raw=true) | ![Logo do Firefox](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/firefox-logo.png) | ![Logo do Edge](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/edge-logo.png) | ![Logo do Safari](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/safari-logo.png) | ![Logo do Opera](https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/opera-logo.png) |

## Troubleshooting

### Problemas Comuns

**Erro: "CONFIGURE_SUA_API_KEY"**
- Solução: Configure o arquivo `.env` com suas credenciais reais do Firebase

**Erro: "Email não autorizado"**
- Solução: Adicione seu email no arquivo `src/app/config/authorized-emails.ts`

**Erro: Firebase not initialized**
- Solução: Verifique se todas as variáveis do Firebase estão configuradas corretamente

**Build falha no GitHub Actions**
- Solução: Verifique se todos os GitHub Secrets estão configurados corretamente

**Health Check mostra "Desconhecido" ou "Falha na comunicação"**
- Solução: Verifique se a API está rodando e acessível na URL configurada no environment
- Verifique se os endpoints `/api/health/*` estão implementados na API

**Alertas não aparecem no dashboard**
- Solução: Verifique se a API está retornando dados válidos nos endpoints de health check
- Abra o console do navegador (F12) para ver logs de erro do serviço

**Métricas de performance mostram valores incorretos**
- Solução: Verifique se a API está retornando os campos corretos (cpu_usage_percent, memory_usage_percent, etc.)
- Confirme se os tipos de dados estão corretos (números para percentuais)

### Comandos Úteis

```bash
# Verificar se o .env está sendo carregado
npm run setup:env

# Limpar cache do npm
npm run install:clean

# Verificar logs de build
npm run build --verbose

# Testar endpoints de health check (se a API estiver rodando)
curl http://localhost:5000/api/health
curl http://localhost:5000/api/health/detailed

# Verificar conectividade com a API configurada
curl https://petback1-37607olh.b4a.run/api/health
```

### Suporte

Para mais informações ou suporte, consulte a documentação do Firebase ou entre em contato com a equipe de desenvolvimento.

**Documentação Adicional**:
- [HEALTH_CHECK_README.md](./HEALTH_CHECK_README.md) - Documentação completa do sistema de health check e monitoramento