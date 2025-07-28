const fs = require('fs');
const path = require('path');

// Script para configurar variáveis de ambiente do Firebase no build de produção
const targetPath = path.resolve(__dirname, '../src/environments/environment.prod.ts');
const targetPath2 = path.resolve(__dirname, '../src/environments/environment.ts');
// Validar se todas as variáveis estão disponíveis
const requiredVars = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN', 
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID'
];

console.log('🔍 Verificando variáveis de ambiente do Firebase...');

// Verificar se todas as variáveis estão definidas
const missingVars = requiredVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Variáveis de ambiente faltando:', missingVars);
  console.error('💡 Certifique-se de configurar os GitHub Secrets ou arquivo .env');
  
  // Em desenvolvimento local, use valores padrão
  if (process.env.NODE_ENV !== 'production') {
    console.log('⚠️  Modo desenvolvimento: usando valores padrão');
    const envConfigFile = `export const environment = {
  production: true,
  urlBackEnd: 'https://petback1-37607olh.b4a.run/api',
  firebase: {
    apiKey: "FIREBASE_API_KEY_PLACEHOLDER",
    authDomain: "FIREBASE_AUTH_DOMAIN_PLACEHOLDER", 
    projectId: "FIREBASE_PROJECT_ID_PLACEHOLDER",
    storageBucket: "FIREBASE_STORAGE_BUCKET_PLACEHOLDER",
    messagingSenderId: "FIREBASE_MESSAGING_SENDER_ID_PLACEHOLDER",
    appId: "FIREBASE_APP_ID_PLACEHOLDER"
  }
};
`;
    fs.writeFileSync(targetPath, envConfigFile);
    fs.writeFileSync(targetPath2, envConfigFile);
    console.log('⚠️  Arquivo environment.prod.ts criado com placeholders');
    return;
  } else {
    process.exit(1);
  }
}

const envConfigFile = `export const environment = {
  production: true,
  urlBackEnd: 'https://petback1-37607olh.b4a.run/api',
  firebase: {
    apiKey: "${process.env.FIREBASE_API_KEY}",
    authDomain: "${process.env.FIREBASE_AUTH_DOMAIN}",
    projectId: "${process.env.FIREBASE_PROJECT_ID}",
    storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET}",
    messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID}",
    appId: "${process.env.FIREBASE_APP_ID}"
  }
};
`;

console.log('✅ Todas as variáveis Firebase encontradas');
console.log('🔧 Configurando environment.prod.ts...');
fs.writeFileSync(targetPath, envConfigFile);
console.log('✅ Arquivo environment.prod.ts atualizado com sucesso!');
