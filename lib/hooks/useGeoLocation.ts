/**
 * HOOK: useGeoLocation
 * 
 * Hook React para geolocalização e verificação de disponibilidade de deals por país.
 * 
 * Funcionalidades:
 * - Detecta automaticamente o país do usuário ao carregar
 * - Verifica se um deal está disponível no país do usuário
 * - Gerencia estados de loading e erro
 * - Cache automático via localStorage (implementado em geolocation.ts)
 * 
 * @author Universal Poker
 */

'use client';

import { useState, useEffect } from 'react';
import { getUserCountry } from '../utils/geolocation';
import { Deal } from '../supabase/deals';

interface UseGeoLocationReturn {
  userCountry: string | null;
  isLoading: boolean;
  error: string | null;
  isDealAvailable: (deal: Deal) => boolean;
  refreshCountry: () => Promise<void>;
}

/**
 * Hook principal de geolocalização
 * 
 * @example
 * const { userCountry, isLoading, isDealAvailable } = useGeoLocation();
 * 
 * if (isLoading) return <Loading />;
 * 
 * const isAvailable = isDealAvailable(deal);
 * if (!isAvailable) {
 *   return <UnavailableMessage />;
 * }
 */
export function useGeoLocation(): UseGeoLocationReturn {
  const [userCountry, setUserCountry] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Busca o país do usuário
   */
  const fetchUserCountry = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const country = await getUserCountry();
      setUserCountry(country);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao detectar país';
      setError(errorMessage);
      console.error('❌ Erro no useGeoLocation:', err);
      
      // Mesmo em caso de erro, getUserCountry retorna fallback "US"
      // Então vamos garantir que sempre temos um país
      setUserCountry('US');
      
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Efeito para buscar país ao montar o componente
   */
  useEffect(() => {
    fetchUserCountry();
  }, []);

  /**
   * Verifica se um deal está disponível para o país do usuário
   * 
   * Lógica:
   * - Se availableCountries = [] (vazio), deal disponível globalmente
   * - Se availableCountries tem países, verifica se userCountry está na lista
   * - Se userCountry ainda não foi carregado, retorna true (otimista)
   * 
   * @param deal - Objeto Deal para verificar disponibilidade
   * @returns true se disponível, false se não disponível
   * 
   * @example
   * const isAvailable = isDealAvailable(ggpokerDeal);
   * if (!isAvailable) {
   *   return <p>Deal not available in your country</p>;
   * }
   */
  const isDealAvailable = (deal: Deal): boolean => {
    // Se ainda está carregando, retornar true (otimista) para não bloquear UI
    if (!userCountry) {
      return true;
    }

    // Se available_countries está vazio [], disponível globalmente
    if (!deal.available_countries || deal.available_countries.length === 0) {
      return true;
    }

    // Verificar se o país do usuário está na lista de países disponíveis
    const isAvailable = deal.available_countries.includes(userCountry);
    
    if (!isAvailable) {
      console.log(
        `🚫 Deal "${deal.name}" não disponível em ${userCountry}.`,
        `Disponível em: ${deal.available_countries.join(', ')}`
      );
    }

    return isAvailable;
  };

  /**
   * Força atualização do país (útil para testes ou debug)
   */
  const refreshCountry = async () => {
    await fetchUserCountry();
  };

  return {
    userCountry,
    isLoading,
    error,
    isDealAvailable,
    refreshCountry,
  };
}

/**
 * Hook simplificado para verificar apenas um deal específico
 * 
 * @param deal - Deal para verificar
 * @returns Informações de disponibilidade do deal
 * 
 * @example
 * const { isAvailable, isLoading } = useDealAvailability(ggpokerDeal);
 * 
 * if (isLoading) return <Spinner />;
 * if (!isAvailable) return <UnavailableMessage />;
 */
export function useDealAvailability(deal: Deal | null) {
  const { userCountry, isLoading, error, isDealAvailable } = useGeoLocation();

  const isAvailable = deal ? isDealAvailable(deal) : true;

  return {
    isAvailable,
    isLoading,
    error,
    userCountry,
  };
}

