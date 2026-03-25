# ⚛️ React Auth System (Wappy2_PPV)

Um sistema completo de autenticação e gerenciamento de rotas construído com **React**, focado em performance, design moderno e usabilidade.

## 🚀 Sobre o Projeto
Este projeto web implementa um fluxo de autenticação (Signup, Signin) com proteção de rotas públicas e privadas. O sistema foi desenvolvido com uma interface rica e responsiva, utilizando animações suaves e componentes interativos. Atualmente configurado para rodar de forma simplificada com validação local, é perfeito para testes, estudos de fluxo no front-end e pode ser facilmente expandido para um backend real.

## 🛠 Tecnologias Utilizadas
- **[React 19](https://react.dev/)** - Biblioteca principal para construção da interface estruturada.
- **[Tailwind CSS](https://tailwindcss.com/) & [Styled-Components](https://styled-components.com/)** - Para estilização ágil, moderna e componentizada.
- **[Framer Motion](https://www.framer.com/motion/)** - Aplicado para micro-interações e animações fluidas na interface.
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Gerenciamento global de estado leve, rápido e direto.
- **[React Router DOM](https://reactrouter.com/)** - Controle completo de roteamento da aplicação.
- **[PrimeReact](https://primereact.org/)** - Fornecimento de componentes de UI estruturados e acessíveis.

## ⚙️ Principais Funcionalidades
- **Fluxo de Registro (Signup)**: Validações de email, força de senha e verificação de duplicidade.
- **Fluxo de Login (Signin)**: Autenticação rápida utilizando persistência via `localStorage` simulando uma API.
- **Proteção de Rotas Inteligente**: Rotas privadas (como `/home` e `/profile`) bloqueadas para acesso anônimo, com redirecionamento automático.
- **Design Moderno e Responsivo**: Interface construída baseada nas melhores e mais atuais práticas de UX/UI.

## 🚀 Como Executar Localmente

**1. Clone o Repositório**
```bash
git clone https://github.com/Cairo-Carneiro/React-app-test.git
cd React-app-test
```

**2. Instale as Dependências**
Usando npm:
```bash
npm install
```

**3. Inicie o Servidor de Desenvolvimento**
```bash
npm start
```

Após iniciar, acesse [http://localhost:3000](http://localhost:3000) no seu navegador. Comece criando uma conta fictícia na rota `/signup` e, em seguida, utilize essas credenciais na tela inicial de login para visualizar o dashboard.

## 🤝 Próximos Passos e Melhorias (Produção)
- [ ] Implementar criptografia de senhas no front/backend.
- [ ] Integrar a um backend/banco de dados real (ex: Node/PostgreSQL, Firebase, Supabase).
- [ ] Implementar fluxo de recuperação de senhas por e-mail.
- [ ] Adoção de JWT e Refresh Tokens para manter a sessão ativa com segurança.

---
✨ Criado para demonstrar um fluxo de autenticação robusto e uma interface premium num ecossistema React.
