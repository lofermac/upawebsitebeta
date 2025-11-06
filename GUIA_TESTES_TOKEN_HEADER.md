# 🧪 GUIA DE TESTES - Token no Header (Opção A)

## 📋 O QUE FOI IMPLEMENTADO

### **Mudança 1: `/lib/api/playerApi.ts`**
- ✅ Pega a sessão do Supabase (client-side) usando `supabase.auth.getSession()`
- ✅ Extrai o `access_token` da sessão
- ✅ Envia token no header `Authorization: Bearer <token>`
- ✅ Valida autenticação ANTES de fazer request

### **Mudança 2: `/app/api/player/deal-request/route.ts`**
- ✅ Lê token do header `Authorization`
- ✅ Usa `supabase.auth.getUser(token)` para validar token explícito
- ✅ Fallback para cookies (se não tiver token no header)
- ✅ Logs de debug melhorados

---

## 🧪 TESTE 1: VERIFICAR LOGIN

### **Passo 1: Garantir que está logado**
1. Abra o navegador
2. Acesse `http://localhost:3000`
3. **Faça login** como player (se não estiver logado)
4. Abra DevTools (F12) → Console
5. Execute:
   ```javascript
   (async () => {
     const { createClient } = await import('@supabase/supabase-js');
     const supabase = createClient(
       'SUA_SUPABASE_URL', 
       'SUA_ANON_KEY'
     );
     const { data, error } = await supabase.auth.getSession();
     console.log('Sessão:', data.session ? 'ATIVA ✅' : 'INATIVA ❌');
     console.log('User ID:', data.session?.user?.id);
     console.log('Token:', data.session?.access_token?.substring(0, 20) + '...');
   })();
   ```

**Resultado esperado:**
```
Sessão: ATIVA ✅
User ID: <uuid>
Token: eyJhbGciOiJIUzI1NiIs...
```

Se mostrar "INATIVA ❌", **faça login novamente**.

---

## 🧪 TESTE 2: VERIFICAR REQUISIÇÃO (SEM REFERRAL)

### **Passo 1: Submeter Deal Request**
1. Acesse `http://localhost:3000/deals`
2. Clique em "Claim Offer" em qualquer deal (ex: 888poker)
3. Preencha o formulário:
   - Username: `teste123`
   - Email: `teste@888poker.com`
   - ✅ Marcar checkboxes
4. Clique em "Submit Application"

### **Passo 2: Verificar Terminal**

**Deve aparecer:**
```
🔍 DEBUG - Cookies disponíveis: {
  hasCookieStore: true,
  allCookies: [ 'referrer_code', '__next_hmr_refresh_hash__' ]
}
🔍 DEBUG - Token encontrado no header
🔍 DEBUG - Auth result: {
  hasUser: true,
  userId: '<user-uuid>',
  hasError: false,
  errorMessage: undefined
}
```

**✅ SUCESSO se mostrar:**
- `Token encontrado no header` ✅
- `hasUser: true` ✅
- `userId: '<uuid>'` ✅
- `hasError: false` ✅

**❌ ERRO se mostrar:**
- `Tentando autenticação via cookies` (token não foi enviado)
- `hasUser: false`
- `Auth session missing!`

---

## 🧪 TESTE 3: VERIFICAR TRACKING DE REFERRALS

### **Passo 1: Abrir janela ANÔNIMA (Incognito)**

### **Passo 2: Acessar Link de Referral**
```
http://localhost:3000/deals/ref=LEONAR3V2
```
(Use o código real do seu sub-affiliate)

**Deve:**
- Redirecionar para `/deals`
- Cookie `referrer_code` salvo (verificar DevTools → Application → Cookies)

### **Passo 3: Criar Conta Nova**
1. Clique em "Register" no header
2. Preencha:
   - Nome: `Teste Referral`
   - Email: `referral@teste.com`
   - Senha: `Test@123456`
3. Submit

### **Passo 4: Solicitar Deal**
1. Na página `/deals`, clique em "Claim Offer"
2. Preencha formulário
3. Submit

### **Passo 5: Verificar Terminal**

**Deve aparecer:**
```
🔍 DEBUG - Cookies disponíveis: {
  hasCookieStore: true,
  allCookies: [ 'referrer_code', '__next_hmr_refresh_hash__', ... ]
}
🔍 DEBUG - Token encontrado no header
🔍 DEBUG - Auth result: {
  hasUser: true,
  userId: '<uuid-novo-usuario>',
  hasError: false
}
🎯 Referral code encontrado no cookie: LEONAR3V2
✅ Sub-affiliate encontrado: <uuid-sub-affiliate>
🎉 Referral criado com sucesso!
📊 Contador de referrals atualizado
```

**✅ SUCESSO COMPLETO se mostrar:**
1. Token no header ✅
2. User autenticado ✅
3. Referral code lido ✅
4. Sub-affiliate encontrado ✅
5. Referral criado ✅
6. Contador atualizado ✅

---

## 🧪 TESTE 4: VERIFICAR NO BANCO DE DADOS

### **SQL Query 1: Verificar Player Deal Criado**
```sql
SELECT id, user_id, deal_id, platform_username, status, created_at
FROM player_deals
WHERE platform_username = 'teste123'
ORDER BY created_at DESC
LIMIT 1;
```

**Deve retornar:** 1 registro com status `pending`

---

### **SQL Query 2: Verificar Referral Criado**
```sql
SELECT 
  r.id,
  r.referral_code_used,
  r.status,
  p.full_name as referred_player_name,
  p.email as referred_player_email,
  pd.platform_username
FROM referrals r
JOIN profiles p ON p.id = r.referred_player_id
LEFT JOIN player_deals pd ON pd.id = r.player_deal_id
WHERE r.referral_code_used = 'LEONAR3V2'
ORDER BY r.created_at DESC
LIMIT 1;
```

**Deve retornar:** 
- `referral_code_used`: LEONAR3V2
- `referred_player_name`: Teste Referral
- `referred_player_email`: referral@teste.com
- `status`: pending

---

### **SQL Query 3: Verificar Contador Atualizado**
```sql
SELECT referral_code, total_referrals, status
FROM sub_affiliates
WHERE referral_code = 'LEONAR3V2';
```

**Deve retornar:**
- `total_referrals`: 1 (ou mais, se já tinha outros)

---

## 🚨 TROUBLESHOOTING

### **Problema 1: "Not authenticated. Please login first."**

**Sintoma:** Erro aparece no frontend antes de enviar request

**Causa:** `supabase.auth.getSession()` retorna null (não está logado)

**Solução:**
1. Fazer logout completo
2. Fazer login novamente
3. Verificar se cookies `sb-*` foram criados (DevTools → Application → Cookies)

---

### **Problema 2: "Token encontrado no header" MAS "hasUser: false"**

**Sintoma:** Token é enviado mas Supabase não valida

**Causa:** Token expirado ou inválido

**Solução:**
1. Fazer logout/login novamente para gerar novo token
2. Verificar se `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` estão corretos no `.env.local`

---

### **Problema 3: "Tentando autenticação via cookies" (token não foi enviado)**

**Sintoma:** API Route não recebe token no header

**Causa:** `session.access_token` é undefined ou request falhou

**Solução:**
1. No DevTools Console, executar:
   ```javascript
   const { createClient } = await import('@supabase/supabase-js');
   const supabase = createClient('URL', 'KEY');
   const { data } = await supabase.auth.getSession();
   console.log('Access Token:', data.session?.access_token);
   ```
2. Se for `undefined`, fazer logout/login

---

### **Problema 4: Referral não é criado (mas deal é)**

**Sintoma:** Player deal criado, mas sem registro em `referrals`

**Causas possíveis:**
- Cookie `referrer_code` não existe (player não usou link de referral)
- Sub-affiliate não está ativo (`status != 'active'`)
- Player já tem referral existente (duplicata)

**Debug:**
```sql
-- Verificar se sub-affiliate está ativo
SELECT * FROM sub_affiliates WHERE referral_code = 'LEONAR3V2';

-- Verificar se player já tem referral
SELECT * FROM referrals WHERE referred_player_id = '<user-id>';
```

---

## ✅ CHECKLIST DE VALIDAÇÃO COMPLETA

### **Frontend (Client):**
- [ ] Player está logado
- [ ] `supabase.auth.getSession()` retorna sessão válida
- [ ] `session.access_token` existe

### **Request:**
- [ ] Header `Authorization: Bearer <token>` enviado
- [ ] Cookie `referrer_code` enviado (se usou link)
- [ ] Body com `dealId`, `platformUsername`, `platformEmail`

### **API Route (Server):**
- [ ] Log mostra "Token encontrado no header"
- [ ] `hasUser: true`
- [ ] `userId` presente
- [ ] `hasError: false`

### **Tracking:**
- [ ] Cookie `referrer_code` lido (se existir)
- [ ] Sub-affiliate encontrado
- [ ] Referral criado
- [ ] Contador incrementado

### **Banco de Dados:**
- [ ] Registro em `player_deals` criado
- [ ] Registro em `referrals` criado (se tiver referral code)
- [ ] `total_referrals` incrementado

---

## 📊 RESULTADO ESPERADO FINAL

### **Console do Servidor (Terminal):**
```
🔍 DEBUG - Cookies disponíveis: { hasCookieStore: true, allCookies: [...] }
🔍 DEBUG - Token encontrado no header
🔍 DEBUG - Auth result: { hasUser: true, userId: '<uuid>', hasError: false }
🎯 Referral code encontrado no cookie: LEONAR3V2
✅ Sub-affiliate encontrado: <uuid>
🎉 Referral criado com sucesso!
📊 Contador de referrals atualizado
POST /api/player/deal-request 200 in 250ms
```

### **Frontend (Toast):**
```
✅ Application submitted successfully! Our team will review it shortly.
```

---

**Sistema agora usa token explícito no header! Execute os testes acima e me reporte os resultados!** 🧪✅

