# Firebase: criação, configuração e hospedagem

## Criar projeto
1. Acesse https://console.firebase.google.com/ e crie um projeto.
2. Em Configurações do projeto > Geral > Seus aplicativos, registre um app Web.
3. Copie a configuração para `.env.local` seguindo `.env.example`.

Variáveis `VITE_*` são incluídas no bundle cliente. Nunca coloque service-account JSON, chave privada ou Admin SDK no frontend.

## Authentication
1. Firebase Console > Authentication > Começar.
2. Ative E-mail/senha.
3. Cadastro público cria somente perfil `student`.

## Firestore
1. Crie Cloud Firestore em modo de produção.
2. Publique `firestore.rules`.
3. Documentos: `users/{uid}` e `progress/{uid}`.

## Rodar localmente
```bash
npm install
cp .env.example .env.local
# edite .env.local
npm run dev
```

## Promover professor
Identifique o UID em Authentication. No Firestore, altere `users/{uid}.role` para `teacher`. Conceda `admin` somente a pessoa institucional autorizada.

## Deploy
```bash
npm run build
npm install -g firebase-tools
firebase login
firebase use --add
firebase deploy --only firestore:rules
firebase deploy --only hosting
```
Hosting publica a pasta `dist`.

## Testes
- Criar dois alunos e um professor.
- Verificar isolamento do progresso entre alunos.
- Verificar painel docente.
- Confirmar que aluno não altera `role`.
- Testar desktop e celular.
- Confirmar que terminal não executa processos no host.
- Validar regras com Firebase Emulator Suite antes de produção.

## Privacidade
Colete somente dados escolares necessários e defina aviso de privacidade e retenção com a escola.
