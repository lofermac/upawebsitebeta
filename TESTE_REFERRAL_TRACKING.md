# 🧪 GUIA DE TESTE - SISTEMA DE TRACKING DE REFERRALS

## 📋 PRÉ-REQUISITOS

### 1. Verificar Tabelas no Supabase

Execute no SQL Editor do Supabase:

```sql
-- Verificar se as tabelas existem
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('sub_affiliate_requests', 'sub_affiliates', 'referrals');
```

**Se NÃO existirem:** Execute `/supabase/migrations/010_create_sub_affiliates_and_referrals.sql`

### 2. Verificar Estrutura da Tabela `sub_affiliates`

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'sub_affiliates'
ORDER BY ordinal_position;
```

**Deve ter estas colunas:**
- `id` (uuid)
- `player_id` (uuid)
- `referral_code` (text)
- `status` (text)
- `approved_deals` (integer[])
- `total_referrals` (integer) ← **IMPORTANTE**
- `total_rake_generated` (numeric)
- `created_at` (timestamp)
- `updated_at` (timestamp)

---

## 🚀 FASE 1: SETUP - CRIAR SUB-AFFILIATE DE TESTE

### Passo 1.1: Criar Player Teste (se não existir)

1. Vá para: **Authentication → Users** no Supabase Dashboard
2. Clique em **Add User**
3. Preencha:
   - Email: `leonardo@teste.com`
   - Password: `Test@123456`
   - Confirm email: ✅

### Passo 1.2: Criar Request de Sub-Affiliate

**Via Interface (recomendado):**

1. Faça login como `leonardo@teste.com`
2. Acesse: `http://localhost:3000/player/dashboard`
3. Clique em "Apply Now" no card "Become a Sub-Affiliate"
4. Preencha:
   - Reason: "I have experience with poker affiliates"
   - Experience: "3 years in the industry"
5. Submit

**OU via SQL:**

```sql
-- Substitua USER_ID pelo UUID do leonardo@teste.com
INSERT INTO sub_affiliate_requests (player_id, reason, experience, status)
VALUES (
  'USER_ID_AQUI',
  'I have experience with poker affiliates',
  '3 years in the industry',
  'pending'
);
```

### Passo 1.3: Aprovar Sub-Affiliate (como Admin)

1. Faça login como admin
2. Acesse: `http://localhost:3000/admin/dashboard`
3. Clique na aba "Sub-Affiliates"
4. Na seção "Pending Requests", clique em **Approve** no Leonardo
5. **Anote o código gerado** (ex: `LEONAR3V2`)

**OU via SQL:**

```sql
-- 1. Gerar código manual (ex: LEONAR3V2)
INSERT INTO sub_affiliates (player_id, referral_code, status, total_referrals, total_rake_generated)
VALUES (
  'USER_ID_DO_LEONARDO',
  'LEONAR3V2',
  'active',
  0,
  0.00
);

-- 2. Atualizar request
UPDATE sub_affiliate_requests
SET status = 'approved', reviewed_at = NOW()
WHERE player_id = 'USER_ID_DO_LEONARDO';
```

### Passo 1.4: Verificar Link de Referral

1. Login como `leonardo@teste.com`
2. Acesse: `http://localhost:3000/player/dashboard/affiliate`
3. **Copie o link de referral** (ex: `http://localhost:3000/deals/ref=LEONAR3V2`)

---

## 🧪 FASE 2: TESTAR TRACKING DE REFERRAL

### Teste 2.1: Primeiro Clique (First Click Wins)

**Abrir janela ANÔNIMA (Incognito) no navegador**

#### Passo 1: Acessar Link com Referral

```
http://localhost:3000/deals/ref=LEONAR3V2
```

**Resultado Esperado:**
- URL muda para: `http://localhost:3000/deals` (sem query params)
- Console do servidor mostra: `🎯 Referral code saved: LEONAR3V2`

#### Passo 2: Verificar Cookie

Abra DevTools (F12) → **Application/Storage** → **Cookies** → `http://localhost:3000`

**Deve existir cookie:**
- Name: `referrer_code`
- Value: `LEONAR3V2`
- Expires: 7 dias a partir de agora
- Path: `/`
- HttpOnly: ❌ (false)
- SameSite: `Lax`

#### Passo 3: Testar "First Click Wins"

Ainda na janela anônima, acesse:

```
http://localhost:3000/deals/ref=OUTRO_CODIGO
```

**Resultado Esperado:**
- Console mostra: `🔒 Referral já existe (first click wins): LEONAR3V2`
- Cookie **NÃO muda** (permanece `LEONAR3V2`)

---

### Teste 2.2: Criar Conta de Player Referido

**Ainda na janela anônima:**

#### Passo 1: Registrar Novo Player

1. Na página `/deals`, clique em **Register** (header)
2. Preencha:
   - Full Name: `Hans Muller`
   - Email: `hans@teste.com`
   - Password: `Test@123456`
3. **Submit Registration**

#### Passo 2: Verificar Cookie Persiste

Após login, verifique cookies novamente:

**Deve manter:**
- `referrer_code` = `LEONAR3V2`

---

### Teste 2.3: Solicitar Deal (Criar Referral Automático)

**Ainda logado como `hans@teste.com`:**

#### Passo 1: Claim Offer

1. Na página `/deals`, escolha qualquer poker room (ex: **888poker**)
2. Clique em **Claim Offer**
3. No modal "Join Deal", preencha:
   - Username: `hans888`
   - Email: `hans@888poker.com`
   - ✅ Consent checkbox
   - ✅ Terms checkbox
4. Clique em **Submit Application**

#### Passo 2: Verificar Console do Servidor

Deve aparecer no terminal Next.js:

```
🎯 Referral code encontrado no cookie: LEONAR3V2
✅ Sub-affiliate encontrado: <UUID>
🎉 Referral criado com sucesso!
📊 Contador de referrals atualizado
```

#### Passo 3: Verificar no Banco de Dados

```sql
-- 1. Verificar player_deal criado
SELECT id, user_id, deal_id, platform_username, status
FROM player_deals
WHERE platform_username = 'hans888';

-- 2. Verificar referral criado
SELECT r.id, r.sub_affiliate_id, r.referred_player_id, r.referral_code_used, r.status,
       p.full_name as referred_player_name
FROM referrals r
JOIN profiles p ON p.id = r.referred_player_id
WHERE r.referral_code_used = 'LEONAR3V2';

-- 3. Verificar contador atualizado
SELECT referral_code, total_referrals
FROM sub_affiliates
WHERE referral_code = 'LEONAR3V2';
-- Deve mostrar total_referrals = 1
```

---

### Teste 2.4: Visualizar no Painel do Sub-Affiliate

1. Faça login como `leonardo@teste.com`
2. Acesse: `http://localhost:3000/player/dashboard/affiliate`

**Deve mostrar:**
- **Total Referrals:** 1
- **Active Referrals:** 0 (porque deal ainda está "pending")
- **Pending Referrals:** 1
- Tabela com:
  - Player: Hans Muller
  - Email: hans@teste.com
  - Deal: 888poker (ou nome do deal escolhido)
  - Status: `pending`
  - Joined: Data de hoje

---

### Teste 2.5: Aprovar Deal e Verificar Status

1. Login como **admin**
2. Acesse: `http://localhost:3000/admin/dashboard`
3. Clique na aba **Deal Requests**
4. Encontre o deal do Hans
5. Clique em **Approve**
6. Preencha dados de aprovação
7. **Submit**

#### Verificar Atualização Automática:

```sql
-- Verificar status do referral mudou para "active"
SELECT r.status, pd.status as deal_status
FROM referrals r
JOIN player_deals pd ON pd.id = r.player_deal_id
WHERE r.referral_code_used = 'LEONAR3V2';
```

**Voltar ao painel do Leonardo:**
`http://localhost:3000/player/dashboard/affiliate`

**Agora deve mostrar:**
- **Active Referrals:** 1 ✅
- **Pending Referrals:** 0
- Status do Hans: `active` (verde)

---

## 🧪 FASE 3: TESTAR CENÁRIOS EDGE CASES

### Teste 3.1: Player Sem Referral

**Nova janela anônima:**

1. Acesse diretamente: `http://localhost:3000/deals`
2. Registre novo player: `maria@teste.com`
3. Solicite um deal

**Resultado Esperado:**
- Console mostra: `ℹ️ Nenhum cookie de referral encontrado`
- `player_deal` criado normalmente
- **NENHUM** `referral` criado
- Contador do Leonardo **não muda**

### Teste 3.2: Player Já Foi Referido

**Como Hans (já referido pelo Leonardo):**

1. Solicitar **outro deal** (ex: WPT Global)

**Resultado Esperado:**
- Console mostra: `ℹ️ Player já tem referral existente - mantendo original`
- Novo `player_deal` criado
- **NENHUM** novo `referral` criado (evita duplicata)
- Contador do Leonardo **não muda**

### Teste 3.3: Código Inválido

**Nova janela anônima:**

1. Acesse: `http://localhost:3000/deals/ref=CODIGO_INVALIDO`
2. Registre player: `pedro@teste.com`
3. Solicite deal

**Resultado Esperado:**
- Cookie salvo: `CODIGO_INVALIDO`
- Ao criar deal, console mostra: `⚠️ Sub-affiliate não encontrado ou inativo: CODIGO_INVALIDO`
- Deal criado normalmente
- NENHUM referral criado

---

## ✅ CHECKLIST FINAL

### Verificações no Supabase

```sql
-- 1. Quantos sub-affiliates existem?
SELECT referral_code, total_referrals, status
FROM sub_affiliates;

-- 2. Quantos referrals foram criados?
SELECT 
  sa.referral_code,
  COUNT(r.id) as referrals_count,
  ARRAY_AGG(p.full_name) as referred_players
FROM sub_affiliates sa
LEFT JOIN referrals r ON r.sub_affiliate_id = sa.id
LEFT JOIN profiles p ON p.id = r.referred_player_id
GROUP BY sa.referral_code;

-- 3. Lista completa de referrals
SELECT 
  r.referral_code_used,
  p_referred.full_name as referred_player,
  d.name as deal_name,
  r.status,
  r.created_at
FROM referrals r
JOIN profiles p_referred ON p_referred.id = r.referred_player_id
LEFT JOIN player_deals pd ON pd.id = r.player_deal_id
LEFT JOIN deals d ON d.id = pd.deal_id
ORDER BY r.created_at DESC;
```

---

## 🐛 TROUBLESHOOTING

### Cookie não está sendo salvo

**Verificar:**
- Console do servidor mostra log de salvamento?
- DevTools → Application → Cookies está vazio?
- Navegador está bloqueando cookies de third-party?

**Solução:**
- Usar janela anônima/incognito
- Verificar que `httpOnly: false` no middleware

### Referral não é criado

**Verificar:**
- Console do servidor mostra logs?
- Sub-affiliate está com `status = 'active'`?
- Player já tem referral existente?

**Debug SQL:**
```sql
SELECT * FROM sub_affiliates WHERE referral_code = 'SEU_CODIGO';
SELECT * FROM referrals WHERE referred_player_id = 'USER_ID_DO_PLAYER';
```

### Contador não incrementa

**Verificar:**
- Campo `total_referrals` existe na tabela?
- Console mostra "📊 Contador de referrals atualizado"?

**Fix SQL:**
```sql
-- Atualizar manualmente
UPDATE sub_affiliates
SET total_referrals = (
  SELECT COUNT(*) FROM referrals WHERE sub_affiliate_id = sub_affiliates.id
)
WHERE referral_code = 'SEU_CODIGO';
```

---

## 🎯 RESULTADO ESPERADO FINAL

✅ **Leonardo (Sub-Affiliate):**
- Código: `LEONAR3V2`
- Total Referrals: `1`
- Painel mostra Hans na lista

✅ **Hans (Player Referido):**
- Deal criado: 888poker (pending ou approved)
- Registro em `referrals` com `sub_affiliate_id` do Leonardo
- Status sincronizado com status do deal

✅ **Maria (Player Sem Referral):**
- Deal criado normalmente
- NENHUM registro em `referrals`

✅ **Sistema:**
- First click wins funciona ✅
- Cookie persiste por 7 dias ✅
- Tracking automático na API ✅
- Contador atualizado em tempo real ✅

---

## 📊 QUERIES ÚTEIS PARA MONITORAMENTO

```sql
-- Dashboard de Sub-Affiliates (Admin View)
SELECT 
  sa.referral_code,
  p.full_name as sub_affiliate_name,
  sa.status,
  sa.total_referrals,
  sa.total_rake_generated,
  sa.created_at
FROM sub_affiliates sa
JOIN profiles p ON p.id = sa.player_id
ORDER BY sa.total_referrals DESC;

-- Performance de Referrals por Sub-Affiliate
SELECT 
  sa.referral_code,
  COUNT(DISTINCT r.id) as total_referrals,
  COUNT(DISTINCT CASE WHEN r.status = 'active' THEN r.id END) as active_referrals,
  COUNT(DISTINCT CASE WHEN r.status = 'pending' THEN r.id END) as pending_referrals
FROM sub_affiliates sa
LEFT JOIN referrals r ON r.sub_affiliate_id = sa.id
GROUP BY sa.referral_code;

-- Players Referidos Recentemente (últimas 24h)
SELECT 
  r.referral_code_used,
  p.full_name as player_name,
  p.email,
  r.created_at
FROM referrals r
JOIN profiles p ON p.id = r.referred_player_id
WHERE r.created_at > NOW() - INTERVAL '24 hours'
ORDER BY r.created_at DESC;
```

---

Pronto! Com este guia você consegue testar completamente o sistema de tracking de referrals! 🚀

