# Sair do Lovable Cloud: Supabase próprio + Amplify Hosting

Resumo do que foi decidido e por quê: o app (site de casamento Lucas & Brena) usa só
2 tabelas (`rsvps`, `user_roles`) e Supabase Auth (email/senha + Google). Nenhuma rota
que acessa o banco depende de servidor — todas já são `ssr: false`. Por isso o caminho
mais rápido é: criar seu próprio projeto Supabase gratuito (mesmo banco, zero reescrita
de queries) e publicar o front no AWS Amplify Hosting, que tem um preset nativo do Nitro
para esse framework (`aws_amplify`) — já configurado em `vite.config.ts`.

O que já foi alterado no código:
- `vite.config.ts`: preset do Nitro fixado em `aws_amplify` (fora de um build do Lovable).
- `src/routes/auth.tsx`: login com Google trocado do wrapper do Lovable
  (`@lovable.dev/cloud-auth-js`, que só funciona dentro do Lovable Cloud) para
  `supabase.auth.signInWithOAuth({ provider: "google" })`, nativo do Supabase.
- `package.json`: removida a dependência `@lovable.dev/cloud-auth-js` (não é mais usada).
- `amplify.yml`: build spec para o Amplify Hosting.
- `supabase/new_project_setup.sql`: as 4 migrations combinadas em um único script,
  para colar no SQL Editor do novo projeto.
- `.env.example`: modelo das variáveis de ambiente que você vai precisar.

## 1. Criar o projeto Supabase gratuito

1. Crie uma conta em [supabase.com](https://supabase.com) (se ainda não tiver).
2. "New Project" → escolha um nome, senha do banco e região (ex: São Paulo/`sa-east-1`).
3. Aguarde a criação (leva ~2 min).
4. Vá em **SQL Editor** → **New query**, cole todo o conteúdo de
   `supabase/new_project_setup.sql` e clique em **Run**. Isso recria as tabelas
   `rsvps` e `user_roles`, as políticas de RLS e os triggers de admin.
5. Vá em **Project Settings > API** e copie:
   - **Project URL** → `SUPABASE_URL` / `VITE_SUPABASE_URL`
   - **anon / publishable key** → `SUPABASE_PUBLISHABLE_KEY` / `VITE_SUPABASE_PUBLISHABLE_KEY`
   - o ID do projeto (parte antes de `.supabase.co` na URL) → `SUPABASE_PROJECT_ID` / `VITE_SUPABASE_PROJECT_ID`

### Login com Google (opcional)

Se quiser manter o botão "Entrar com Google": em **Authentication > Providers > Google**,
ative e configure com um OAuth Client ID/Secret do
[Google Cloud Console](https://console.cloud.google.com/apis/credentials)
(callback URL fica visível na própria tela do Supabase — copie e cole lá no Google Cloud).
Se preferir, dá pra remover o botão do Google depois e usar só email/senha — o `auth.tsx`
já cai automaticamente para email/senha se você não configurar o provider.

### Admin automático

A migration já concede papel de admin automaticamente para os e-mails
`lucaslazzari1812@gmail.com` e `brenapereiral02@gmail.com` ao se cadastrarem
(via trigger `grant_admin_to_allowlisted`). Se quiser trocar esses e-mails, edite
essa lista em `supabase/new_project_setup.sql` antes de rodar, ou rode um `UPDATE`
depois no SQL Editor.

## 2. Atualizar o `.env`

Copie `.env.example` para `.env` e preencha com os valores do passo 1. O `.env`
não vai para o Git (está no `.gitignore`), então isso é só para rodar localmente.

## 3. Testar localmente

```bash
npm install
npm run dev
```

Confira: a página inicial abre, o RSVP grava no Supabase novo (confira na aba
**Table Editor** do Supabase), e o login em `/auth` funciona.

Depois teste o build de produção antes de subir pro Amplify:

```bash
npm run build
```

## 4. Subir o código pro GitHub

```bash
git init   # se ainda não for um repositório git
git add .
git commit -m "Projeto próprio: Supabase + Amplify"
git remote add origin <url-do-seu-repo-no-github>
git push -u origin main
```

## 5. Conectar o AWS Amplify Hosting

1. Crie uma conta AWS gratuita em [aws.amazon.com](https://aws.amazon.com) (se ainda não tiver).
2. Acesse o [console do Amplify Hosting](https://console.aws.amazon.com/amplify/).
3. **Get started** > **Amplify Hosting** (Host your web app).
4. Autorize acesso ao GitHub e selecione o repositório e a branch `main`.
5. O Amplify deve auto-detectar o `amplify.yml` do repositório. Confirme.
6. Em **Advanced settings > Environment variables**, adicione as mesmas variáveis
   do seu `.env` (as `VITE_*` são obrigatórias — são embutidas no build; as sem
   prefixo também, para as poucas rotas de servidor que restaram).
7. **Save and deploy**.

O plano gratuito da AWS cobre isso perfeitamente para um site com esse volume de
tráfego (build, hospedagem estática e o pouco de SSR ficam dentro do free tier
perpétuo de Amplify Hosting + Lambda).

## 6. Depois do primeiro deploy

- Domínio próprio: em **Amplify > Hosting > Custom domains**, adicione seu domínio
  (grátis na AWS, você só paga se comprar o domínio em si).
- Todo `git push` na branch conectada dispara um novo deploy automático.

## Arquivos que ficaram sem uso (pode ignorar ou apagar)

- `src/integrations/lovable/index.ts` — era o wrapper do login OAuth do Lovable,
  não é mais importado em lugar nenhum.
- `src/integrations/supabase/client.server.ts` e `auth-middleware.ts` — geradas
  pelo Lovable para cenários de server function com Supabase, mas nenhuma rota do
  projeto usa isso hoje. Não atrapalham, só ficam como scaffolding não utilizado.
