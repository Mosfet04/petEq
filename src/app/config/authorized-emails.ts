// Lista de emails autorizados para acessar o sistema administrativo
// IMPORTANTE: Apenas usuários com estes emails poderão fazer login

export const AUTHORIZED_EMAILS = [
  // SUBSTITUA PELOS EMAILS REAIS DOS USUÁRIOS AUTORIZADOS:
  'admin@pet-eq.com',              // Administrador principal
  'coordenador@pet-eq.com',        // Coordenador do PET
  'seu-email@gmail.com',           // Seu email pessoal
  'mateusmr4@gmail.com', // Email institucional
  // Adicione mais emails conforme necessário:
  // 'membro1@gmail.com',
  // 'membro2@gmail.com',
  // 'secretario@universidade.edu.br'
];

// Função para verificar se um email está autorizado
export function isEmailAuthorized(email: string): boolean {
  return AUTHORIZED_EMAILS.includes(email.toLowerCase().trim());
}
