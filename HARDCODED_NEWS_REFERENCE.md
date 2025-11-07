# Hardcoded News Reference

## Rotas Preservadas

### `/newshardcoded`
- **Tipo:** Página hardcoded de listagem de notícias
- **Arquivo:** `app/newshardcoded/page.tsx`
- **Propósito:** Referência visual e estrutural do layout aprovado
- **Conteúdo:** Lista de notícias hardcoded com layout premium

### `/newshardcoded/partypoker-tour-returns-to-birmingham-this-october`
- **Tipo:** Notícia individual hardcoded
- **Arquivo:** `app/newshardcoded/partypoker-tour-returns-to-birmingham-this-october/page.tsx`
- **Propósito:** Layout aprovado com todos os blocos premium implementados
- **Conteúdo:** Artigo completo da PartyPoker Tour Birmingham (Outubro 2025)

## Rotas Dinâmicas Atuais

### `/news`
- **Tipo:** Página dinâmica (Supabase)
- **Arquivo:** `app/news/page.tsx`
- **Status:** ✅ ATIVA - Listagem dinâmica de notícias do banco de dados
- **Origem:** Migrado de `/newstest`

### `/news/[slug]`
- **Tipo:** Notícia dinâmica (Supabase)
- **Arquivo:** `app/news/[slug]/page.tsx`
- **Status:** ✅ ATIVA - Artigos dinâmicos individuais do banco

### `/newstest`
- **Tipo:** Rota de teste (pode ser removida)
- **Arquivo:** `app/newstest/page.tsx`
- **Status:** ⚠️ OBSOLETA - Conteúdo foi migrado para `/news`

## Notas
- As rotas hardcoded (`/newshardcoded`) devem ser mantidas como referência de design
- Não devem ser deletadas ou modificadas
- Servem como comparação visual durante desenvolvimento

