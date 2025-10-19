/**
 * SISTEMA DE GEOLOCALIZAÇÃO POR IP
 * 
 * Este módulo busca o país do usuário através do IP usando a API ipapi.co (gratuita).
 * Implementa cache no localStorage com validade de 30 dias para economizar requests.
 * 
 * @author Universal Poker
 */

// Interface para a resposta da API ipapi.co
interface IPApiResponse {
  country_code: string;
  country_name: string;
  city?: string;
  region?: string;
  ip?: string;
}

// Interface para o cache no localStorage
interface GeolocationCache {
  countryCode: string;
  timestamp: number;
}

// Constantes
const CACHE_KEY = 'user_country_cache';
const CACHE_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 dias em milissegundos
const API_URL = 'https://ipapi.co/json/';
const FALLBACK_COUNTRY = 'US'; // País padrão em caso de erro

/**
 * Busca o código do país do usuário baseado no IP
 * 
 * Fluxo:
 * 1. Verifica se existe cache válido no localStorage
 * 2. Se não houver cache ou estiver expirado, faz request para ipapi.co
 * 3. Salva o resultado no cache com timestamp
 * 4. Retorna o country_code (ex: "BR", "US", "PT")
 * 5. Em caso de erro, retorna fallback "US"
 * 
 * @returns {Promise<string>} Código do país em formato ISO (2 letras maiúsculas)
 * 
 * @example
 * const country = await getUserCountry();
 * console.log(country); // "BR"
 */
export async function getUserCountry(): Promise<string> {
  try {
    // 1. Verificar cache no localStorage
    const cachedData = getCachedCountry();
    if (cachedData) {
      console.log('🌍 País obtido do cache:', cachedData);
      return cachedData;
    }

    // 2. Cache não existe ou está expirado - fazer request para API
    console.log('🌐 Buscando país via API ipapi.co...');
    
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API ipapi.co retornou erro: ${response.status}`);
    }

    const data: IPApiResponse = await response.json();
    
    // Validar se recebemos um country_code válido
    if (!data.country_code || data.country_code.length !== 2) {
      throw new Error('country_code inválido na resposta da API');
    }

    const countryCode = data.country_code.toUpperCase();
    
    // 3. Salvar no cache
    setCachedCountry(countryCode);
    
    console.log('✅ País detectado:', countryCode, `(${data.country_name})`);
    
    return countryCode;

  } catch (error) {
    // 4. Em caso de erro, retornar fallback
    console.error('❌ Erro ao detectar país:', error);
    console.log(`⚠️ Usando país fallback: ${FALLBACK_COUNTRY}`);
    
    return FALLBACK_COUNTRY;
  }
}

/**
 * Busca o país do cache do localStorage
 * 
 * @returns {string | null} Código do país em cache ou null se não existir/expirado
 */
function getCachedCountry(): string | null {
  try {
    // Verificar se localStorage está disponível (pode não estar em SSR)
    if (typeof window === 'undefined') {
      return null;
    }

    const cached = localStorage.getItem(CACHE_KEY);
    
    if (!cached) {
      return null;
    }

    const cacheData: GeolocationCache = JSON.parse(cached);
    const now = Date.now();
    const cacheAge = now - cacheData.timestamp;

    // Verificar se o cache ainda é válido (< 30 dias)
    if (cacheAge > CACHE_DURATION_MS) {
      console.log('⏰ Cache de país expirado, removendo...');
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return cacheData.countryCode;

  } catch (error) {
    console.error('Erro ao ler cache de país:', error);
    return null;
  }
}

/**
 * Salva o código do país no cache do localStorage
 * 
 * @param {string} countryCode - Código do país (ex: "BR")
 */
function setCachedCountry(countryCode: string): void {
  try {
    // Verificar se localStorage está disponível
    if (typeof window === 'undefined') {
      return;
    }

    const cacheData: GeolocationCache = {
      countryCode,
      timestamp: Date.now(),
    };

    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    console.log('💾 País salvo no cache (válido por 30 dias)');

  } catch (error) {
    console.error('Erro ao salvar cache de país:', error);
  }
}

/**
 * Limpa o cache de país (útil para testes ou forçar nova detecção)
 * 
 * @example
 * clearCountryCache();
 */
export function clearCountryCache(): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CACHE_KEY);
      console.log('🗑️ Cache de país limpo');
    }
  } catch (error) {
    console.error('Erro ao limpar cache de país:', error);
  }
}

