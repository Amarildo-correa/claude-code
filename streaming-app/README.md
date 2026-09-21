# Nova — app de streaming (mobile)

Protótipo funcional, mobile-first, de um app de streaming de filmes e séries.
Construído seguindo a skill `frontend-design` da Anthropic: um plano de
design (paleta, tipografia, layout, princípios) definido e revisado contra
clichês de interface gerada por IA antes de qualquer linha de código.

## Direção de design

- **Cor**: fundo quase preto com fundo quente (`#100d0a`), nunca neon puro
  nem preto+terracota padrão; acento âmbar de marquise de cinema (`#d98b3f`)
  e um verde musgo secundário usado só em selos.
- **Tipografia**: `Fraunces` (serifada, com personalidade) para títulos e
  cabeçalhos, `Work Sans` para texto e interface — evita as famílias
  padrão (Inter/Roboto/Arial).
- **Layout**: app mobile com hero de destaque, carrosséis horizontais com
  snap-scroll, barra de abas inferior com indicador de ponto (sem caixa
  alta, sem separadores de metadados com pontos médios, sem setas "→").

## Telas

- **Início** — hero em destaque, "Continue assistindo" (com progresso),
  "Em alta" e "Novidades".
- **Buscar** — busca por título ou gênero em tempo real.
- **Minha lista** — títulos salvos (favoritados com o ícone de coração),
  persistidos em `localStorage`.
- **Perfil** — dados da conta e atalhos.
- **Detalhes do título** — sinopse, elenco, episódios (para séries) e
  títulos semelhantes.

## Rodando localmente

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção
npm run preview  # serve o build de produção
```
