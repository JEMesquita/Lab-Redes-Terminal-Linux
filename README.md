# Lab-Redes_Terminal_Linux

Laboratório web didático para Sistemas Operacionais Livres no curso Técnico em Redes de Computadores da EEEP Júlia Giffoni — Ano Letivo 2026. Professor substituto: João Mesquita.

## Recursos
- Terminal Linux virtual no navegador (filesystem simulado).
- 12 lições progressivas com tarefas, dicas e validação.
- Manual rápido de comandos.
- Perfis aluno, professor e administrador.
- Firebase Authentication, Cloud Firestore e painel docente.
- Interface responsiva.

## Stack
Vite + JavaScript + Firebase Auth + Firestore + Firebase Hosting.

## Rodar localmente
```bash
npm install
cp .env.example .env.local
# preencha VITE_FIREBASE_* com os dados do app Web Firebase
npm run dev
```

## Build/deploy
Consulte docs/FIREBASE.md.

## Manuais
- docs/ARQUITETURA.md
- docs/MANUAL_ALUNO.md
- docs/MANUAL_PROFESSOR.md
- docs/FIREBASE.md

## Limite de segurança
O terminal é um simulador JavaScript e não executa comandos no computador/servidor nem inicia processos. Práticas que exigem Linux real devem ocorrer em VM Ubuntu supervisionada.

O cadastro público cria somente perfil student. Teacher/admin são concedidos por pessoa autorizada no Firestore.

