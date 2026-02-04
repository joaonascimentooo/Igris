# Gym Routine App

Plataforma moderna para gerenciar rotinas de academia e acompanhar progresso de treinos.

## 🚀 Tech Stack

- **Frontend**: Next.js 16.1.6 (App Router) + React 18.2.0
- **Language**: TypeScript 5.3.0
- **State Management**: Zustand 4.4.0
- **Styling**: Tailwind CSS 3.3.0
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Build**: Turbopack

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta Firebase

## ⚡ Quick Start

### 1. Clonar Repositório

```bash
git clone <seu-repo>
cd gym-routine-app
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Firebase

1. Crie um projeto em [Firebase Console](https://console.firebase.google.com/)
2. Ative **Email/Password** Authentication
3. Crie um **Firestore Database** em test mode
4. Copie as credenciais

### 4. Variáveis de Ambiente

Crie `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=seu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

### 5. Iniciar Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

## 📁 Estrutura do Projeto

```
src/
├── app/                 # App Router (Next.js)
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home
│   ├── login/           # Login page
│   ├── register/        # Register page
│   ├── dashboard/       # Dashboard
│   └── routines/        # Routines management
├── components/          # React components
│   ├── Layout/          # Layout components
│   └── Common/          # Reusable components
├── hooks/               # Custom hooks
├── lib/                 # Utilities & services
│   ├── firebase/        # Firebase config & services
│   └── types/           # TypeScript types
├── store/               # Zustand stores
└── styles/              # Global styles
```

## 🔒 Segurança

- Firebase Security Rules configuradas para acesso user-only
- Credenciais em `.env.local` (não commitadas)
- Autenticação via Email/Password

## 🧪 Build & Deploy

```bash
# Build para produção
npm run build

# Verificar erros
npm run lint

# Deploy para Firebase Hosting
firebase deploy
```

## 📚 Documentação

Para detalhes técnicos, veja:
- **Arquitetura**: Estrutura 4-camadas (Presentation, Application, Domain, Infrastructure)
- **Padrões**: Service Pattern, Repository Pattern, Custom Hooks
- **Estado**: Zustand com persistência localStorage

## 🤝 Contribuindo

1. Crie uma branch (`git checkout -b feature/sua-feature`)
2. Commit suas mudanças (`git commit -m 'Add sua-feature'`)
3. Push para a branch (`git push origin feature/sua-feature`)
4. Abra um Pull Request

## 📝 Licença

MIT

---

**Made with ❤️**
│   ├── lib/          # Serviços (Firebase)
│   ├── store/        # Zustand State Management
│   ├── types/        # TypeScript types
│   └── utils/        # Funções utilitárias
├── public/           # Assets estáticos
└── [config files]    # Configurações
```

## 🏗️ Arquitetura Profissional

### Camadas

1. **Presentation Layer** (Componentes)
   - Componentes presentacionais puros
   - Reutilizáveis e bem testáveis
   - Props tipadas com TypeScript

2. **Application Layer** (Hooks)
   - Encapsulam lógica de negócio
   - Comunicam com Services
   - Gerenciam state com Zustand

3. **Domain Layer** (Services)
   - Lógica de negócio isolada
   - Comunicação com Firebase
   - Tratamento centralizado de erros

4. **Infrastructure Layer** (Firebase)
   - Autenticação (Auth)
   - Banco de dados (Firestore)
   - Storage de arquivos

### Design Patterns Utilizados

- **Service Pattern:** Isolamento de lógica
- **Custom Hooks:** Reutilização de lógica React
- **State Management:** Zustand para state global
- **Typed Components:** TypeScript em tudo

## 🔧 Instalação

```bash
# Clone o repositório
git clone [seu-repo]
cd gym-routine-app

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais Firebase
```

## 📋 Variáveis de Ambiente

Crie `.env.local` na raiz:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## 🚀 Desenvolvimento

```bash
# Inicie servidor de desenvolvimento
npm run dev

# Acesse http://localhost:3000

# Linting e formatação
npm run lint
npm run format

# Type checking
npm run type-check
```

## 🏗️ Build e Deploy

```bash
# Build para produção
npm run build

# Inicie servidor de produção
npm start

# Deploy no Firebase Hosting
firebase deploy
```

## 📚 Fitur Principais

### Autenticação
- ✅ Registro de novo usuário
- ✅ Login com email/senha
- ✅ Logout
- ✅ Persistência de sessão

### Rotinas
- ✅ Criar rotinas personalizadas
- ✅ Adicionar exercícios
- ✅ Editar rotinas
- ✅ Deletar rotinas
- ✅ Ativar/desativar rotinas

### Treino
- ✅ Iniciar treino com rotina
- ✅ Registrar séries e repetições
- ✅ Registrar peso levantado
- ✅ Timer entre séries
- ✅ Notas de treino

### Progresso
- ✅ Histórico de treinos
- ✅ Gráficos de progresso
- ✅ Personal records (máximo peso levantado)
- ✅ Estatísticas e métricas

## 🔐 Segurança

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /routines/{routineId} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
    match /workouts/{workoutId} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
  }
}
```

## 📊 Model de Dados

### User
```typescript
{
  id: string
  email: string
  name: string
  photoURL?: string
  createdAt: Date
  updatedAt: Date
}
```

### Routine
```typescript
{
  id: string
  userId: string
  name: string
  description: string
  exercises: Exercise[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
```

### Workout
```typescript
{
  id: string
  userId: string
  routineId: string
  exercises: WorkoutExercise[]
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

## 📦 Dependencies Principais

```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "firebase": "^10.7.0",
  "zustand": "^4.4.0",
  "tailwindcss": "^3.3.0"
}
```

## 🛠️ Próximos Passos

1. Implementar Cloud Functions para lógica backend
2. Adicionar real-time sync com Realtime Database
3. Implementar upload de fotos no Storage
4. Push notifications com Cloud Messaging
5. Analytics e tracking de eventos

## 📝 Licença

MIT

## 👨‍💻 Autor

Desenvolvido como projeto profissional com arquitetura escalável.
