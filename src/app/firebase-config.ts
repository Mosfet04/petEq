import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from '../environments/environment';

// Configuração do Firebase usando as variáveis do environment
const firebaseConfig = environment.firebase;

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
