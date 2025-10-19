'use client';

import { useState } from 'react';

export function useAuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [initialTab, setInitialTab] = useState<'login' | 'register'>('login');
  const [isJoinDealOpen, setIsJoinDealOpen] = useState(false);
  const [dealName, setDealName] = useState('');

  const openLogin = (dealNameParam?: string) => {
    setInitialTab('login');
    setIsOpen(true);
    if (dealNameParam) {
      setDealName(dealNameParam);
    }
  };

  const openRegister = (dealNameParam?: string) => {
    setInitialTab('register');
    setIsOpen(true);
    if (dealNameParam) {
      setDealName(dealNameParam);
    }
  };

  const close = () => {
    setIsOpen(false);
  };

  const openJoinDeal = (dealNameParam: string) => {
    setDealName(dealNameParam);
    setIsJoinDealOpen(true);
  };

  const closeJoinDeal = () => {
    setIsJoinDealOpen(false);
  };

  const onAuthSuccess = () => {
    close();
    // Abre o modal Join Deal após autenticação
    if (dealName) {
      setTimeout(() => {
        openJoinDeal(dealName);
      }, 300); // Pequeno delay para transição suave
    }
  };

  return {
    isOpen,
    initialTab,
    isJoinDealOpen,
    dealName,
    openLogin,
    openRegister,
    close,
    openJoinDeal,
    closeJoinDeal,
    onAuthSuccess,
  };
}

