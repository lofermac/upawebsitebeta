# 🚀 API ROUTES - FASE 2.2 - TESTING GUIDE

## ✅ ARQUIVOS CRIADOS

```
app/api/player/
├── deal-request/
│   └── route.ts (3,088 bytes) ✅ POST endpoint
├── deals/
│   └── route.ts (2,408 bytes) ✅ GET endpoint
└── earnings/
    └── route.ts (2,856 bytes) ✅ GET endpoint

Total: 3 endpoints | 8,352 bytes
```

---

## 📋 ENDPOINTS IMPLEMENTADOS

### 1️⃣ POST /api/player/deal-request
**Função:** Player solicita acesso a um deal

**Headers:**
```json
{
  "Content-Type": "application/json",
  "Cookie": "sb-auth-token=..." // Sessão do Supabase
}
```

**Request Body:**
```json
{
  "dealId": 3,
  "platformUsername": "mypokerusername",
  "platformEmail": "myemail@888poker.com"
}
```

**Response Success (201):**
```json
{
  "success": true,
  "dealRequestId": "uuid-aqui",
  "message": "Deal request submitted successfully. Our team will review it shortly."
}
```

**Response Error (400):**
```json
{
  "success": false,
  "error": "Missing required fields"
}
```

**Response Error (409):**
```json
{
  "success": false,
  "error": "You already have a pending request for this deal"
}
```

---

### 2️⃣ GET /api/player/deals
**Função:** Listar todos os deals do player logado

**Headers:**
```json
{
  "Cookie": "sb-auth-token=..." // Sessão do Supabase
}
```

**Query Params:** Nenhum (usa user.id da sessão)

**Response Success (200):**
```json
{
  "success": true,
  "deals": [
    {
      "id": "uuid",
      "dealId": 6,
      "dealName": "Betfair Poker",
      "dealLogo": "https://...",
      "dealSlug": "betfair-poker-deal",
      "platformUsername": "player_betfair_2025",
      "platformEmail": "myemail@betfair.com",
      "status": "active",
      "rakebackPercentage": 35.00,
      "paymentSchedule": "monthly",
      "paymentDay": 1,
      "currency": "EUR",
      "paymentMethod": "bank_transfer",
      "requestedAt": "2025-11-01T10:00:00Z",
      "approvedAt": "2025-11-01T12:00:00Z"
    }
  ]
}
```

**Response Error (401):**
```json
{
  "success": false,
  "error": "Unauthorized"
}
```

---

### 3️⃣ GET /api/player/earnings
**Função:** Listar earnings do player (com filtros opcionais)

**Headers:**
```json
{
  "Cookie": "sb-auth-token=..." // Sessão do Supabase
}
```

**Query Params (opcionais):**
- `month` (1-12): Filtrar por mês
- `year` (2025+): Filtrar por ano

**Exemplos:**
- `/api/player/earnings` - Todos os earnings
- `/api/player/earnings?month=10&year=2025` - Outubro 2025
- `/api/player/earnings?year=2025` - Ano inteiro de 2025

**Response Success (200):**
```json
{
  "success": true,
  "earnings": [
    {
      "id": "uuid",
      "dealName": "Betfair Poker",
      "platformUsername": "player_betfair_2025",
      "periodMonth": 10,
      "periodYear": 2025,
      "grossRake": 156.00,
      "netRake": 101.40,
      "rakebackAmount": 35.49,
      "dataUpdatedAt": "2025-10-21T10:00:00Z",
      "paymentStatus": "pending",
      "paymentDate": null,
      "paymentAmount": null,
      "paymentReference": null
    },
    {
      "id": "uuid2",
      "dealName": "Betfair Poker",
      "platformUsername": "player_betfair_2025",
      "periodMonth": 9,
      "periodYear": 2025,
      "grossRake": 125.00,
      "netRake": 81.25,
      "rakebackAmount": 28.44,
      "dataUpdatedAt": "2025-09-30T10:00:00Z",
      "paymentStatus": "paid",
      "paymentDate": "2025-10-05T14:30:00Z",
      "paymentAmount": 28.44,
      "paymentReference": "BNK-2025-10-001"
    }
  ]
}
```

---

## 🧪 COMO TESTAR

### OPÇÃO 1: Thunder Client (VS Code Extension)

1. **Instalar Thunder Client:**
   - Extensions → Pesquisar "Thunder Client"
   - Instalar

2. **Criar Coleção "Player API":**
   - New Collection → Nome: "Player API"

3. **Teste 1: POST deal-request**
   ```
   Method: POST
   URL: http://localhost:3000/api/player/deal-request
   Body (JSON):
   {
     "dealId": 1,
     "platformUsername": "testplayer123",
     "platformEmail": "test@ggpoker.com"
   }
   ```

4. **Teste 2: GET deals**
   ```
   Method: GET
   URL: http://localhost:3000/api/player/deals
   ```

5. **Teste 3: GET earnings**
   ```
   Method: GET
   URL: http://localhost:3000/api/player/earnings?month=10&year=2025
   ```

⚠️ **IMPORTANTE:** Você precisa estar LOGADO no browser primeiro para que os cookies de sessão sejam enviados!

---

### OPÇÃO 2: Postman

1. **Importar Collection:**
   - New Collection → Player API

2. **Configurar Environment:**
   ```
   baseUrl: http://localhost:3000
   ```

3. **Configurar Authentication:**
   - Type: Cookie
   - Domain: localhost
   - Cookie: sb-auth-token=[seu-token]

4. **Testar endpoints** (mesmas URLs acima)

---

### OPÇÃO 3: Frontend (Recomendado)

**Criar arquivo de teste:** `lib/api/playerApi.ts`

```typescript
/**
 * Player API Client
 * Wrapper functions para chamar as API Routes
 */

export interface DealRequestData {
  dealId: number;
  platformUsername: string;
  platformEmail: string;
}

export interface DealRequestResponse {
  success: boolean;
  dealRequestId?: string;
  message?: string;
  error?: string;
}

export interface PlayerDeal {
  id: string;
  dealId: number;
  dealName: string;
  dealLogo: string;
  dealSlug: string;
  platformUsername: string;
  platformEmail: string;
  status: 'pending' | 'approved' | 'active' | 'rejected' | 'suspended';
  rakebackPercentage: number | null;
  paymentSchedule: string | null;
  paymentDay: number | null;
  currency: string | null;
  paymentMethod: string | null;
  requestedAt: string;
  approvedAt: string | null;
}

export interface PlayerEarning {
  id: string;
  dealName: string;
  platformUsername: string;
  periodMonth: number;
  periodYear: number;
  grossRake: number;
  netRake: number;
  rakebackAmount: number;
  dataUpdatedAt: string;
  paymentStatus: 'pending' | 'processing' | 'paid' | 'failed';
  paymentDate: string | null;
  paymentAmount: number | null;
  paymentReference: string | null;
}

/**
 * Solicitar acesso a um deal
 */
export async function requestDeal(data: DealRequestData): Promise<DealRequestResponse> {
  try {
    const response = await fetch('/api/player/deal-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Request deal error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to request deal',
    };
  }
}

/**
 * Buscar deals do player
 */
export async function getPlayerDeals(): Promise<{ success: boolean; deals: PlayerDeal[]; error?: string }> {
  try {
    const response = await fetch('/api/player/deals', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Get deals error:', error);
    return {
      success: false,
      deals: [],
      error: error instanceof Error ? error.message : 'Failed to fetch deals',
    };
  }
}

/**
 * Buscar earnings do player
 */
export async function getPlayerEarnings(
  month?: number,
  year?: number
): Promise<{ success: boolean; earnings: PlayerEarning[]; error?: string }> {
  try {
    let url = '/api/player/earnings';
    const params = new URLSearchParams();
    
    if (month) params.append('month', month.toString());
    if (year) params.append('year', year.toString());
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Get earnings error:', error);
    return {
      success: false,
      earnings: [],
      error: error instanceof Error ? error.message : 'Failed to fetch earnings',
    };
  }
}
```

**Usar no componente:**

```typescript
import { requestDeal, getPlayerDeals, getPlayerEarnings } from '@/lib/api/playerApi';

// Solicitar deal
const handleSubmit = async () => {
  const result = await requestDeal({
    dealId: 3,
    platformUsername: 'myusername',
    platformEmail: 'myemail@888poker.com'
  });
  
  if (result.success) {
    alert('Deal requested successfully!');
  } else {
    alert(result.error);
  }
};

// Buscar deals
const loadDeals = async () => {
  const { success, deals } = await getPlayerDeals();
  if (success) {
    setDeals(deals);
  }
};

// Buscar earnings (Outubro 2025)
const loadEarnings = async () => {
  const { success, earnings } = await getPlayerEarnings(10, 2025);
  if (success) {
    setEarnings(earnings);
  }
};
```

---

## 🔒 SEGURANÇA IMPLEMENTADA

✅ **Autenticação verificada** em TODOS os endpoints
✅ **User ID extraído da sessão** (não vem do frontend)
✅ **RLS policies** aplicadas no banco (double security)
✅ **Validação de inputs** (email, required fields)
✅ **Verificação de duplicatas** (UNIQUE constraint)
✅ **Error handling** completo com logs

---

## 🐛 TROUBLESHOOTING

### Erro: "Unauthorized"
**Causa:** Usuário não está logado ou sessão expirou

**Solução:**
1. Fazer login no frontend (`/login`)
2. Verificar se cookie `sb-auth-token` está presente
3. Tentar novamente

---

### Erro: "You already have a pending request"
**Causa:** Player já solicitou esse deal anteriormente

**Solução:**
1. Verificar status no dashboard
2. Aguardar aprovação do admin
3. Ou escolher outro deal

---

### Erro: "Failed to fetch deals/earnings"
**Causa:** Problema na query do Supabase

**Solução:**
1. Verificar se migrations foram executadas
2. Verificar RLS policies
3. Checar logs do servidor

---

### Erro: "Deal not found"
**Causa:** dealId fornecido não existe na tabela `deals`

**Solução:**
1. Verificar IDs válidos: `SELECT id, name FROM deals;`
2. Usar um dealId existente (1-10)

---

## ✅ CHECKLIST DE VERIFICAÇÃO

- [x] 3 arquivos route.ts criados
- [x] Zero erros de TypeScript/linter
- [x] Autenticação implementada em todos
- [x] Validação de inputs
- [x] Error handling completo
- [x] Responses padronizados
- [ ] **Testar via Thunder Client**
- [ ] **Testar via Frontend**
- [ ] **Criar lib/api/playerApi.ts** (helper client)
- [ ] **Integrar com JoinDealModal**
- [ ] **Integrar com Player Dashboard**

---

## 🚀 PRÓXIMOS PASSOS

### FASE 2.3: Integração Frontend

1. **Criar `lib/api/playerApi.ts`** (wrapper functions)
2. **Atualizar `JoinDealModal.tsx`:**
   - Substituir `console.log` por `requestDeal()` call
   - Mostrar success/error messages

3. **Atualizar `app/player/dashboard/page.tsx`:**
   - Substituir `connectedDeals` hardcoded por `getPlayerDeals()`
   - Substituir `earningsData` hardcoded por `getPlayerEarnings()`
   - Adicionar loading states

4. **Criar componentes de loading/error:**
   - Skeleton loaders
   - Error boundaries
   - Retry buttons

**Quer que eu crie o `lib/api/playerApi.ts` e integre com o frontend agora?** 🚀

