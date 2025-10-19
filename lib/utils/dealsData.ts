/**
 * DADOS TEMPORÁRIOS DE DEALS (HARDCODED)
 * 
 * ⚠️ ATENÇÃO: Este arquivo contém dados mockados/hardcoded.
 * ⚠️ NO FUTURO: Estes dados serão migrados para o Supabase.
 * 
 * Cada deal contém um campo "availableCountries" que lista os países
 * onde a oferta está disponível (códigos ISO de 2 letras).
 * 
 * - Se availableCountries = [] (array vazio), o deal está disponível globalmente
 * - Se availableCountries = ["US", "CA", "BR"], o deal só está disponível nesses países
 * 
 * @author Universal Poker
 */

export interface Deal {
  id: number;
  slug: string;
  name: string;
  logo: string;
  title: string;
  subtitle: string;
  description: string;
  platform_id: number;
  
  // 🌍 GEOLOCALIZAÇÃO: Países onde o deal está disponível
  // [] = disponível globalmente
  // ["US", "CA"] = disponível apenas nesses países
  availableCountries: string[];
  
  // Estilo visual
  gradientColors: {
    from: string;
    via: string;
    to: string;
  };
  glowColor: string;
  borderColor: string;
  shadowColor: string;
}

/**
 * ARRAY DE DEALS MOCKADOS
 * 
 * 🚀 MIGRAÇÃO FUTURA PARA SUPABASE:
 * 
 * 1. Criar tabela no Supabase:
 *    CREATE TABLE deals (
 *      id BIGSERIAL PRIMARY KEY,
 *      slug TEXT UNIQUE NOT NULL,
 *      name TEXT NOT NULL,
 *      logo TEXT,
 *      title TEXT,
 *      subtitle TEXT,
 *      description TEXT,
 *      platform_id INTEGER,
 *      available_countries TEXT[], -- Array PostgreSQL
 *      gradient_colors JSONB,
 *      glow_color TEXT,
 *      border_color TEXT,
 *      shadow_color TEXT,
 *      created_at TIMESTAMPTZ DEFAULT NOW()
 *    );
 * 
 * 2. Migrar dados:
 *    - Copiar cada objeto deste array para a tabela
 *    - Ajustar nomes de campos (camelCase → snake_case)
 * 
 * 3. Criar função no Supabase:
 *    - getDeals() - busca todos os deals
 *    - getDealBySlug(slug) - busca deal específico
 *    - checkDealAvailability(dealId, countryCode) - verifica disponibilidade
 * 
 * 4. Substituir este arquivo por chamadas ao Supabase:
 *    - import { supabase } from '@/lib/supabase'
 *    - const { data: deals } = await supabase.from('deals').select('*')
 */
export const DEALS: Deal[] = [
  {
    id: 1,
    slug: 'ggpoker-deal',
    name: 'GGPoker',
    logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/07144333/ggpoker_logo-1_white-1.webp',
    title: 'Get Up To 60% Cashback',
    subtitle: 'With GGPoker Fish Buffet',
    description: 'Maximize your rakeback with the world\'s largest poker site',
    platform_id: 1365,
    
    // 🌍 GGPoker disponível globalmente EXCETO: EUA, França, Espanha, Itália
    // Para simplificar, vamos deixar disponível para a maioria dos países
    availableCountries: [], // Disponível globalmente (com algumas restrições regionais)
    
    gradientColors: {
      from: '#B83232',
      via: '#A02828',
      to: '#2B0A0A',
    },
    glowColor: 'red-500',
    borderColor: 'red-900',
    shadowColor: 'red-500',
  },
  
  {
    id: 2,
    slug: 'partypoker-deal',
    name: 'PartyPoker',
    logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/07/07144334/ENT_PartyPoker_Landscape_FullWhite_RGB.png',
    title: 'Get Up To 65% Cashback',
    subtitle: 'Through Our Promotions',
    description: 'Join one of the most trusted poker networks',
    platform_id: 1368,
    
    // PartyPoker: Disponível principalmente na Europa e alguns países
    availableCountries: ['GB', 'DE', 'AT', 'SE', 'NO', 'DK', 'FI', 'IE', 'CA', 'NZ', 'AU'],
    
    gradientColors: {
      from: '#E67339',
      via: '#D4642D',
      to: '#4D2310',
    },
    glowColor: 'orange-500',
    borderColor: 'orange-900',
    shadowColor: 'orange-500',
  },
  
  {
    id: 3,
    slug: '888poker-deal',
    name: '888poker',
    logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/17183728/888-LOGO-webp-1024x309.webp',
    title: 'Get An Extra 50% Cashback',
    subtitle: 'Through Our Promotions',
    description: 'One of the oldest and most reliable poker sites',
    platform_id: 1367,
    
    // 888poker: Disponível em muitos países exceto EUA
    availableCountries: [], // Globalmente disponível (com restrições menores)
    
    gradientColors: {
      from: '#4A7AC9',
      via: '#3B68B8',
      to: '#142958',
    },
    glowColor: 'blue-500',
    borderColor: 'blue-900',
    shadowColor: 'blue-500',
  },
  
  {
    id: 4,
    slug: 'wpt-global-deal',
    name: 'WPT Global',
    logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/01/07105909/WPT-LOGO-WebP-1920x350-1-1024x168.webp',
    title: 'Get Up To An Extra 40% Cashback',
    subtitle: 'Every Month',
    description: 'Play on the official World Poker Tour platform',
    platform_id: 1364,
    
    // WPT Global: Não disponível nos EUA, UK, Austrália
    availableCountries: ['BR', 'CA', 'DE', 'AT', 'SE', 'NO', 'FI', 'PT', 'ES', 'IT', 'FR', 'NL', 'BE', 'MX', 'AR', 'CL', 'CO'],
    
    gradientColors: {
      from: '#7C4DBF',
      via: '#6940A8',
      to: '#20134C',
    },
    glowColor: 'purple-500',
    borderColor: 'purple-900',
    shadowColor: 'purple-500',
  },
  
  {
    id: 5,
    slug: 'unibet-deal',
    name: 'Unibet',
    logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/08/15110203/Unitbet-Logo.png',
    title: 'Enhanced Welcome Bonus Worth £540',
    subtitle: 'Plus 4 x €500 Freerolls',
    description: 'Premium poker experience from a trusted brand',
    platform_id: 9074,
    
    // Unibet: Principalmente UK e Europa
    availableCountries: ['GB', 'SE', 'DK', 'NO', 'FI', 'EE', 'LV', 'LT', 'IE', 'DE', 'AT', 'NL', 'BE', 'FR', 'IT', 'ES', 'PT'],
    
    gradientColors: {
      from: '#47A76A',
      via: '#3C8F5A',
      to: '#0F2A18',
    },
    glowColor: 'emerald-500',
    borderColor: 'emerald-900',
    shadowColor: 'emerald-500',
  },
  
  {
    id: 6,
    slug: 'betfair-poker-deal',
    name: 'Betfair Poker',
    logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/17185334/Betfair-Website-Logo-1-1-1-1024x185.webp',
    title: 'Instant VIP Upgrade To 35% Cashback',
    subtitle: '+ €50k In Races',
    description: 'Premium VIP treatment from day one',
    platform_id: 1363,
    
    // Betfair: Principalmente Europa
    availableCountries: ['GB', 'IE', 'DE', 'AT', 'SE', 'DK', 'IT', 'ES', 'PT', 'GR', 'RO', 'BG'],
    
    gradientColors: {
      from: '#D4A837',
      via: '#B89230',
      to: '#352B0E',
    },
    glowColor: 'yellow-500',
    borderColor: 'yellow-900',
    shadowColor: 'yellow-500',
  },
  
  {
    id: 7,
    slug: 'champion-poker-deal',
    name: 'Champion Poker',
    logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/17184626/CHAMPIONPOKER-logo-1024x160.webp',
    title: 'Get An Instant Upgrade To 30% Cashback',
    subtitle: '+ All On-Site Promotions',
    description: 'Rising star in the poker network scene',
    platform_id: 6016,
    
    // Champion Poker: Disponível globalmente
    availableCountries: [],
    
    gradientColors: {
      from: '#B84545',
      via: '#A03A3A',
      to: '#2B0F0F',
    },
    glowColor: 'red-500',
    borderColor: 'red-900',
    shadowColor: 'red-500',
  },
  
  {
    id: 8,
    slug: 'wsop-ca-deal',
    name: 'WSOP.CA',
    logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/12/11192441/wsop-ontario-logo-1024x376.webp',
    title: 'Play On A GGPoker Alternative',
    subtitle: 'From Ontario Only',
    description: 'Official WSOP platform for Canadian players',
    platform_id: 2933,
    
    // WSOP.CA: APENAS Ontário, Canadá
    availableCountries: ['CA'], // Especificamente Ontario, mas usamos CA como país
    
    gradientColors: {
      from: '#D4A037',
      via: '#B88F30',
      to: '#35270E',
    },
    glowColor: 'amber-500',
    borderColor: 'amber-900',
    shadowColor: 'amber-500',
  },
  
  {
    id: 9,
    slug: 'optibet-poker-deal',
    name: 'Optibet Poker',
    logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/17100841/Optibet-Poker-logo-2D-horizontal-red-bg-1024x298.png',
    title: 'Get Up To 60% Cashback',
    subtitle: 'Every Month',
    description: 'Premium rakeback for Baltic players',
    platform_id: 1362,
    
    // Optibet: APENAS Estônia e Letônia
    availableCountries: ['EE', 'LV'],
    
    gradientColors: {
      from: '#C84D6B',
      via: '#B04460',
      to: '#31141C',
    },
    glowColor: 'rose-500',
    borderColor: 'rose-900',
    shadowColor: 'rose-500',
  },
  
  {
    id: 10,
    slug: 'coinpoker-deal',
    name: 'CoinPoker',
    logo: '/images/coinlogo.png',
    title: 'Join Our Monthly Rake Chase',
    subtitle: 'Up To $1500 Every Month',
    description: 'Crypto-powered poker with rakeback rewards',
    platform_id: 0, // Sem platform_id ainda
    
    // CoinPoker: Disponível globalmente (aceita crypto)
    availableCountries: [],
    
    gradientColors: {
      from: '#9A3838',
      via: '#872E2E',
      to: '#2B0F0F',
    },
    glowColor: 'red-500',
    borderColor: 'red-900',
    shadowColor: 'red-500',
  },
];

/**
 * Busca um deal pelo slug
 * 
 * @param slug - Slug do deal (ex: "ggpoker-deal")
 * @returns Deal encontrado ou undefined
 * 
 * 🚀 MIGRAÇÃO SUPABASE:
 * const { data: deal } = await supabase
 *   .from('deals')
 *   .select('*')
 *   .eq('slug', slug)
 *   .single();
 */
export function getDealBySlug(slug: string): Deal | undefined {
  return DEALS.find(deal => deal.slug === slug);
}

/**
 * Busca um deal pelo ID
 * 
 * @param id - ID do deal
 * @returns Deal encontrado ou undefined
 * 
 * 🚀 MIGRAÇÃO SUPABASE:
 * const { data: deal } = await supabase
 *   .from('deals')
 *   .select('*')
 *   .eq('id', id)
 *   .single();
 */
export function getDealById(id: number): Deal | undefined {
  return DEALS.find(deal => deal.id === id);
}

/**
 * Busca todos os deals
 * 
 * @returns Array de todos os deals
 * 
 * 🚀 MIGRAÇÃO SUPABASE:
 * const { data: deals } = await supabase
 *   .from('deals')
 *   .select('*')
 *   .order('id', { ascending: true });
 */
export function getAllDeals(): Deal[] {
  return DEALS;
}

