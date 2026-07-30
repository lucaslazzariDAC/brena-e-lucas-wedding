
# Site de Casamento Lucas & Brena — Plano

Reprodução digital fiel do convite Ogum & Iemanjá, totalmente responsivo, com abertura animada estilo "convite físico".

## Stack & escopo
- TanStack Start + React + TypeScript + Tailwind v4 + Framer Motion
- Sem backend nesta fase (RSVP envia via WhatsApp/`mailto:` e mostra mensagem de confirmação; lista de presentes e PIX exibidos com placeholders editáveis no código em `src/config/wedding.ts`)
- Google Maps Platform conectado (mapa interativo + botão "Traçar Rota")
- Tudo configurável centralizado em `src/config/wedding.ts` (PIX, endereço, prazo RSVP, hotéis, WhatsApp dos noivos)

## Design system (src/styles.css)
- Cores: `--navy: #0D1B2A`, `--ocean: #4FA3C3`, `--silver: #B7B7B7`, `--paper: #F2EEE6`, gradientes prata e azul profundo
- Fonts via `<link>` no `__root.tsx`: Cinzel Decorative (display nomes), Cormorant Garamond (títulos), Montserrat (corpo)
- Texturas: papel granulado (SVG noise) e ornamentos prateados nos cantos (SVG inline reutilizáveis)

## Rotas
```
src/routes/
  __root.tsx           shell, fontes, metadata global
  index.tsx            experiência principal (capa + convite + seções)
  admin.tsx            placeholder simples explicando que área dos noivos exige backend (CTA p/ ativar Cloud depois)
```
Tudo numa única página com navegação por âncoras suaves após a abertura do convite (UX de convite, não de site institucional).

## Experiência de abertura (componente `EnvelopeIntro`)
1. Capa fechada centralizada — réplica da imagem (moldura art déco prata, lança+folhas à esquerda, ondas/estrelas à direita, laço azul-marinho cruzado, lacre "L&B")
2. Botão "Abrir Convite" abaixo
3. Ao clicar (Framer Motion):
   - Laço se desfaz (duas faixas deslizam para os lados + fade)
   - Lacre cai com leve rotação
   - Capa abre como um tríptico (painel esquerdo gira -90°, direito +90°, centro permanece)
   - Painel central expande revelando o convite (Lucas & Brena / data / local)
   - Após 1.2s, scroll suave libera resto do site (overflow-hidden → auto)
4. `sessionStorage` lembra que já abriu — evita re-animar em navegação interna

## Seções (ordem)
1. **Hero/Convite aberto** — painel central com nomes, data, local, "Axé, amor e união"
2. **Contagem regressiva** — 29/03/2027 16:30, 4 cards prata (dias/horas/min/seg) com tick animado
3. **Mensagem dos Orixás** — 3 cards (Ogum, Iemanjá, Águas) sobre fundo navy com ícones SVG (lança, concha, onda)
4. **Nossa História** — timeline com 4 marcos + slots de foto (placeholders elegantes em moldura prata)
5. **Galeria** — grid masonry com 8 placeholders ornamentados (lightbox simples)
6. **Como Chegar** — Google Maps interativo (Maps JS API via browser key do conector) + endereço + botão "Traçar Rota" (`google.com/maps/dir/?api=1&destination=...`)
7. **Hospedagem** — 3 cards de pousadas recomendadas (dados em `wedding.ts`)
8. **Lista de Presentes (PIX)** — card com mensagem, chave PIX, botão "Copiar Chave PIX" (toast de confirmação via `sonner`), QR Code gerado client-side com `qrcode` (npm)
9. **RSVP** — formulário (Nome, Qtd convidados, Telefone, Mensagem) validado com Zod + react-hook-form. Submit abre WhatsApp pré-preenchido para os noivos. Se `Date.now() > 2027-02-15`, troca o form por aviso "Prazo encerrado". Aviso de prazo visível acima do form.
10. **Rodapé** — frase final + créditos discretos

## Efeitos visuais (sutis, performáticos)
- **Ondas SVG animadas** no fundo do hero e rodapé (animação CSS `translateX`)
- **Partículas prateadas** flutuando (canvas leve, 30 partículas, desabilitado em `prefers-reduced-motion`)
- **Parallax suave** nos ornamentos laterais via `useScroll` do Framer Motion
- **Fade-in/scale-in** ao entrar no viewport (`whileInView`)
- **Hover** nos cards: lift + brilho prata na borda

## Mobile-first
- Capa adapta para vertical (laço horizontal só no desktop ≥768px; mobile usa laço vertical)
- Painéis internos viram stack vertical no mobile
- Tipografia fluida com `clamp()`
- Grid responsivo seguindo padrão `grid-cols-[minmax(0,1fr)_auto]` onde necessário

## Google Maps
- Conectar `google_maps` connector
- Carregar Maps JS API async com browser key (`VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY`)
- Marker padrão (sem mapId) centrado em Guarda do Embaú, SC
- Geocoding feito uma vez do endereço configurado; fallback para coordenadas hardcoded

## Dependências a instalar
- `framer-motion`
- `qrcode` + `@types/qrcode`
- `react-hook-form` + `zod` + `@hookform/resolvers`

## Detalhes técnicos
- Imagens decorativas (ornamentos, ondas, lança, concha, estrela, coroa) como **SVG inline** em `src/components/ornaments/` — desenhados em prata para fidelidade visual e crispness em qualquer tela
- Texturas papel/granulado via `background-image` SVG data-URI
- SEO: head() com title "Lucas & Brena · 29.03.2027", description, OG, JSON-LD `Event`
- Acessibilidade: respeito a `prefers-reduced-motion`, alt text em todos os SVGs decorativos como `aria-hidden`, foco visível, contraste AA

## O que fica fora desta fase
- Painel admin real, salvar RSVP em banco, exportar Excel, login dos noivos → requerem Lovable Cloud. Adiciono CTA discreto e posso ativar quando você quiser.
- Fotos reais do casal → trocar os placeholders depois é só substituir os arquivos.

## Itens a você definir depois (com defaults provisórios no código)
- Chave PIX (default: `lucasebrena@pix.com`)
- Endereço exato em Guarda do Embaú (default: "Praia da Guarda do Embaú, Palhoça - SC")
- WhatsApp para receber RSVP (default placeholder)
- Hotéis recomendados

Posso começar a implementar?
