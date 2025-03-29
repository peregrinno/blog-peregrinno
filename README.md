# Blog Peregrinno

Um blog simples desenvolvido com React, TypeScript e Supabase.

## 📋 Sobre o Projeto

Blog Peregrinno é uma aplicação web que permite aos usuários criar e visualizar posts em um formato de blog. O projeto foi construído utilizando tecnologias modernas para oferecer uma experiência de usuário agradável e responsiva.

## 🚀 Tecnologias Utilizadas

- **Frontend**:

  - React 19
  - TypeScript
  - React Router v7
  - shadcn/ui (componentes UI)
  - Tailwind CSS (estilização)
  - Sonner (notificações toast)
- **Backend**:

  - Supabase (autenticação e banco de dados)

## ✨ Funcionalidades

- **Autenticação de Usuários**:

  - Cadastro de novos usuários
  - Login de usuários existentes
  - Logout
- **Gerenciamento de Posts**:

  - Criação de posts (título e conteúdo)
  - Visualização de posts na página inicial
  - Visualização detalhada de posts individuais
  - Contagem de visualizações

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Conta no Supabase

### Passos para Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/blog-peregrinno.git
   cd blog-peregrinno
   ```
2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```
3. Configure as variáveis de ambiente:

   - Crie um arquivo `.env` na raiz do projeto
   - Adicione suas credenciais do Supabase:
     ```
     VITE_SUPABASE_KEY=sua_chave_supabase
     ```
4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```
5. Acesse a aplicação em `http://localhost:5173`

## 🗄️ Estrutura do Banco de Dados

O projeto utiliza o Supabase como backend, com a seguinte estrutura de tabela:

### Tabela: posts

| Coluna      | Tipo      | Descrição                                                            |
| ----------- | --------- | ---------------------------------------------------------------------- |
| id          | uuid      | Identificador único do post (chave primária)                         |
| created_at  | timestamp | Data e hora de criação do post                                       |
| title       | varchar   | Título do post                                                        |
| content     | text      | Conteúdo do post                                                      |
| count_views | int8      | Contador de visualizações                                            |
| posted_by   | uuid      | ID do usuário que criou o post (chave estrangeira para auth.users.id) |

## 🔐 Configuração de Segurança no Supabase

Para que a aplicação funcione corretamente, é necessário configurar as políticas de segurança (RLS) no Supabase:

```sql
-- Habilitar RLS na tabela posts
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir que usuários autenticados criem seus próprios posts
CREATE POLICY "Usuários podem criar seus próprios posts"
ON posts
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = posted_by);

-- Criar política para permitir que qualquer pessoa visualize todos os posts
CREATE POLICY "Qualquer pessoa pode visualizar posts"
ON posts
FOR SELECT
TO anon, authenticated
USING (true);

-- Criar política para permitir que usuários atualizem seus próprios posts
CREATE POLICY "Usuários podem atualizar seus próprios posts"
ON posts
FOR UPDATE
TO authenticated
USING (auth.uid() = posted_by)
WITH CHECK (auth.uid() = posted_by);

-- Criar política para permitir que usuários excluam seus próprios posts
CREATE POLICY "Usuários podem excluir seus próprios posts"
ON posts
FOR DELETE
TO authenticated
USING (auth.uid() = posted_by);
```

## 📱 Capturas de Tela

*Adicione capturas de tela da sua aplicação aqui*

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

## 📞 Contato

*Adicione suas informações de contato aqui*
