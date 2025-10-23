const fs = require('fs');
const path = require('path');

// Script para ler variáveis do .env e configurar environment para desenvolvimento
function readEnvFile() {
  const envPath = path.resolve(__dirname, '../.env');
  
  if (!fs.existsSync(envPath)) {
    console.log('⚠️  Arquivo .env não encontrado. Criando arquivo exemplo...');
    createEnvExample();
    return {};
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};

  envContent.split('\n').forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    }
  });

  return envVars;
}

function createEnvExample() {
  const envExampleContent = `# Configurações do Firebase para desenvolvimento local
# NUNCA commite este arquivo - ele deve estar no .gitignore

FIREBASE_API_KEY=sua_api_key_aqui
FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
FIREBASE_PROJECT_ID=seu_projeto_id
FIREBASE_STORAGE_BUCKET=seu_projeto.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
FIREBASE_APP_ID=seu_app_id`;

  fs.writeFileSync(path.resolve(__dirname, '../.env.example'), envExampleContent);
  console.log('✅ Arquivo .env.example criado. Copie para .env e configure suas credenciais.');
}

// Função para gerar environment.ts com variáveis do .env
function generateEnvironmentTs() {
  const envVars = readEnvFile();
  
  const targetPath = path.resolve(__dirname, '../src/environments/environment.ts');
  
  const envConfigFile = `// This file can be replaced during build by using the \`fileReplacements\` array.
// \`ng build --prod\` replaces \`environment.ts\` with \`environment.prod.ts\`.
// The list of file replacements can be found in \`angular.json\`.

export const environment = {
  production: false,
  urlBackEnd: 'https://api.petequfu.com.br/api',
  firebase: {
    apiKey: "${envVars.FIREBASE_API_KEY || 'FIREBASE_API_KEY_PLACEHOLDER'}",
    authDomain: "${envVars.FIREBASE_AUTH_DOMAIN || 'FIREBASE_AUTH_DOMAIN_PLACEHOLDER'}",
    projectId: "${envVars.FIREBASE_PROJECT_ID || 'FIREBASE_PROJECT_ID_PLACEHOLDER'}",
    storageBucket: "${envVars.FIREBASE_STORAGE_BUCKET || 'FIREBASE_STORAGE_BUCKET_PLACEHOLDER'}",
    messagingSenderId: "${envVars.FIREBASE_MESSAGING_SENDER_ID || 'FIREBASE_MESSAGING_SENDER_ID_PLACEHOLDER'}",
    appId: "${envVars.FIREBASE_APP_ID || 'FIREBASE_APP_ID_PLACEHOLDER'}"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as \`zone.run\`, \`zoneDelegate.invokeTask\`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
`;

  fs.writeFileSync(targetPath, envConfigFile);
  console.log('✅ Arquivo environment.ts atualizado com variáveis do .env');
}

module.exports = { readEnvFile, generateEnvironmentTs };

// Se executado diretamente
if (require.main === module) {
  generateEnvironmentTs();
}
