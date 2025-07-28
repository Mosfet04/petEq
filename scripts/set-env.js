const fs = require('fs');
const path = require('path');

// Script para configurar variáveis de ambiente do Firebase no build de produção
const targetPath = path.resolve(__dirname, '../src/environments/environment.prod.ts');

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

console.log('Configurando variáveis de ambiente do Firebase...');
fs.writeFileSync(targetPath, envConfigFile);
console.log('✅ Arquivo environment.prod.ts atualizado com sucesso!');
