'use client';

import { useState } from 'react';

export function useAuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [initialTab, setInitialTab] = useState<'login' | 'register'>('login');
  const [isJoinDealOpen, setIsJoinDealOpen] = useState(false);
  const [dealName, setDealName] = useState('');
  const [dealId, setDealId] = useState<number | null>(null);

  const openLogin = (dealNameParam?: string, dealIdParam?: number) => {
    setInitialTab('login');
    setIsOpen(true);
    if (dealNameParam) {
      setDealName(dealNameParam);
    }
    if (dealIdParam) {
      setDealId(dealIdParam);
    }
  };

  const openRegister = (dealNameParam?: string, dealIdParam?: number) => {
    setInitialTab('register');
    setIsOpen(true);
    if (dealNameParam) {
      setDealName(dealNameParam);
    }
    if (dealIdParam) {
      setDealId(dealIdParam);
    }
  };

  const close = () => {
    setIsOpen(false);
  };

  const openJoinDeal = (dealNameParam: string, dealIdParam: number) => {
    setDealName(dealNameParam);
    setDealId(dealIdParam);
    setIsJoinDealOpen(true);
  };

  const closeJoinDeal = () => {
    setIsJoinDealOpen(false);
  };

  const onAuthSuccess = () => {
    close();
    // Abre o modal Join Deal após autenticação
    if (dealName && dealId) {
      setTimeout(() => {
        openJoinDeal(dealName, dealId);
      }, 300); // Pequeno delay para transição suave
    }
  };

  return {
    isOpen,
    initialTab,
    isJoinDealOpen,
    dealName,
    dealId,
    openLogin,
    openRegister,
    close,
    openJoinDeal,
    closeJoinDeal,
    onAuthSuccess,
  };
}

