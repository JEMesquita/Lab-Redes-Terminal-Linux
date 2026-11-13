# Arquitetura

Aplicação didática para Sistemas Operacionais Livres, curso Técnico em Redes de Computadores, EEEP Júlia Giffoni, ano letivo 2026. Professor substituto: João Mesquita.

## Stack
Vite, JavaScript, Firebase Authentication, Cloud Firestore e Firebase Hosting.

## Perfis
- Aluno: trilhas, terminal, manual e progresso próprio.
- Professor: painel consolidado de progresso.
- Administrador: gerenciamento por promoção segura no Firestore.

## Dados
`users/{uid}` guarda nome, papel, escola e ano letivo. `progress/{uid}` guarda tarefas concluídas e timestamp.

## Segurança
Terminal é simulador JavaScript em memória; não executa comandos no host nem inicia processos. Rotinas de rede, pacotes e administração são demonstrativas; práticas reais devem usar VM Ubuntu supervisionada.
