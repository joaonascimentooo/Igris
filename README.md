# 💪 IGRIS - Seu Assistente de Treino

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.0-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Firebase](https://img.shields.io/badge/Firebase-Realtime-orange?style=flat-square&logo=firebase)](https://firebase.google.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-06b6d4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

IGRIS é uma plataforma moderna, intuitiva e poderosa para gerenciar suas rotinas de academia e acompanhar seu progresso fitness com facilidade.

## 🎯 Funcionalidades

- ✅ **Autenticação Segura** - Login com Email/Password e Google OAuth
- ✅ **Gerenciamento de Rotinas** - Crie e organize suas rotinas de treino
- ✅ **Acompanhamento de Progresso** - Monitore seu desempenho ao longo do tempo
- ✅ **Interface Responsiva** - Funciona perfeitamente em desktop, tablet e mobile
- ✅ **Design Moderno** - UI/UX em gradiente com tema escuro elegante
- ✅ **Real-time Sync** - Sincronização em tempo real com Firebase

## 🚀 Tech Stack

| Layer | Tecnologia |
|-------|-----------|
| **Frontend** | Next.js 16.1.6 (App Router + Turbopack) |
| **Language** | TypeScript 5.3.0 |
| **Runtime** | React 18.2.0 |
| **State** | Zustand 4.4.0 |
| **Styling** | Tailwind CSS 3.3.0 |
| **Backend** | Firebase (Auth, Firestore) |
| **Testing** | Jest |

## 📋 Pré-requisitos

- **Node.js** 18.0.0 ou superior
- **npm** 9.0.0 ou superior
- **Conta Firebase** (gratuita em [firebase.google.com](https://firebase.google.com))

## ⚡ Quick Start

### 1️⃣ Clonar Repositório

```bash
git clone https://github.com/seu-usuario/igris.git
cd igris
```

### 2️⃣ Instalar Dependências

```bash
npm install
```

### 3️⃣ Configurar Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Crie um novo projeto
3. Ative **Authentication** → **Email/Password**
4. Ative **Authentication** → **Google** (opcional)
5. Crie **Firestore Database** em modo teste
6. Copie as credenciais da configuração do projeto

### 4️⃣ Variáveis de Ambiente

Crie `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_auth_domain.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_storage_bucket.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

### 5️⃣ Executar Projeto

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) 🎉

## 📁 Estrutura do Projeto

```
src/
├── app/                 # Páginas Next.js (App Router)
│   ├── login/           # Página de login
│   ├── register/        # Página de registro
│   ├── dashboard/       # Dashboard principal
│   └── routines/        # Gerenciador de rotinas
├── components/          # Componentes reutilizáveis
│   ├── Common/          # Input, Button, etc
│   └── Layout/          # Header, Sidebar, Layout
├── hooks/               # Custom hooks
│   ├── useAuth.ts       # Gerenciamento de autenticação
│   └── useRoutines.ts   # Gerenciamento de rotinas
├── lib/                 # Serviços e configurações
│   └── firebase/        # Serviços Firebase
├── store/               # Zustand State Management
├── types/               # TypeScript types
└── utils/               # Funções auxiliares
```

## 🏗️ Arquitetura

### Camadas

1. **Presentation** - Componentes React tipados
2. **Application** - Custom hooks com lógica
3. **Domain** - Serviços isolados
4. **Infrastructure** - Firebase config e APIs

### Design Patterns

- Service Pattern para isolamento de lógica
- Custom Hooks para reutilização
- Zustand para state global
- TypeScript em 100% do código

## 🔐 Autenticação

### Email/Password
- Registro com validação
- Login seguro
- Persistência de sessão
- Tratamento de erros

### Google OAuth
- Login/Registro com um clique
- Sincronização automática
- Perfil de usuário automático

## 🚀 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm start            # Inicia servidor de produção
npm run lint         # Executa ESLint
```

## 🔒 Segurança

- Firebase Security Rules configuradas
- Credenciais em `.env.local` (não commitadas)
- `.gitignore` configurado corretamente
- Autenticação obrigatória em rotas protegidas

## 📊 Funcionalidades em Desenvolvimento

- [ ] Histórico de treinos
- [ ] Gráficos de progresso
- [ ] Personal records
- [ ] Apple Sign-In
- [ ] Notificações push
- [ ] Modo offline

## 📝 Variáveis de Ambiente

Veja `.env.example` para um template completo

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add nova-feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

MIT

---

**Made with ❤️ para a comunidade fitness**
  startedAt: Date
  endedAt?: Date
  notes?: string
}
```

## 🎨 Componentes Reutilizáveis

- `Card` - Container genérico
- `Button` - Botão com variantes
- `Input` - Campo de entrada com validação
- `Modal` - Dialog modal
- `Layout` - Wrapper com sidebar e header

## 🧪 Testes

```bash
# Executar testes
npm test

# Coverage
npm test -- --coverage
```
