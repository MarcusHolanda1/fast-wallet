# **Fast Wallet**

Uma plataforma para gerenciar sua carteira digital, construída com React Native.

---

## 🧰 **Tecnologias Utilizadas**

- **React Native + TypeScript** — Desenvolvimento mobile .
- **Jest + React Native Testing Library** — Testes unitários e de integração.
- **Redux Toolkit** — Gerenciamento de estado.
- **ESLint + Prettier** — Padronização e qualidade de código.

---

## 🚀 **Como Rodar o Projeto**

### 1. Clone o repositório

```bash
git clone https://github.com/MarcusHolanda1/fast-wallet.git
```

- Entre no projeto

```bash
cd fast-wallet
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente adicionando a váriavel -> EXPO_PUBLIC_API_URL

```bash
cp .env.example .env
```

### 4. Rode o json-server para utilizar o mock api

```bash
npm install json-server
```

```bash
npx json-server db.json
```

### 5. Inicie o projeto com Expo e escolha sua plataforma

```bash
npx run start:dev
```

### Estrutura do projeto

```
├── mocks
└── app
├── modules
│ ├── home
│ ├── register
│ └── wallet
├── shared
├── store
└── assets
```
