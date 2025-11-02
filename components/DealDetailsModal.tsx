'use client'

import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

interface DealDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  deal: {
    id: string; // UUID from database
    platform: string;
    logo: string;
    deal: string;
    description: string;
    status: string;
    rakeback: string;
    username: string;
    paymentSchedule: string;
    currency: string;
    nextPayment: string;
    paymentMethod: string;
  } | null;
}

export default function DealDetailsModal({ isOpen, onClose, deal }: DealDetailsModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !deal) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <div 
          className="relative w-full max-w-2xl bg-gradient-to-b from-[#0d0d0d] to-[#121212] rounded-2xl border border-white/[0.12] shadow-2xl animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="h-14 flex items-center bg-black/40 rounded-xl px-3 py-2 border border-white/[0.06]">
                <Image 
                  src={deal.logo} 
                  alt={`${deal.platform} logo`}
                  width={160}
                  height={56}
                  className="h-10 w-auto object-contain brightness-110"
                />
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-br from-green-400/10 to-green-400/5 text-green-400 border border-green-400/20 shadow-lg shadow-green-400/10">
                {deal.status}
              </span>
            </div>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/[0.06] group"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            {/* Connected Account Section */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Connected Account
              </h3>
              <div className="bg-black/40 rounded-xl p-3 border border-white/[0.06]">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Username</p>
                    <p className="text-sm text-white font-medium">{deal.username}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="text-sm text-white font-medium">{deal.username}@email.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Deal Details Section */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Deal Details
              </h3>
              <div className="bg-black/40 rounded-xl p-3 border border-white/[0.06]">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1.5">Offer</p>
                    <p className="text-sm text-white font-medium leading-tight">{deal.deal}</p>
                  </div>
                  <button 
                    className="ml-3 px-2.5 py-1 text-xs font-medium text-gray-400 hover:text-gray-200 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.10] rounded-lg transition-all duration-300 whitespace-nowrap"
                  >
                    Review Details
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/[0.06]">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Rakeback</p>
                    <p className="text-base font-bold text-[#10b981]">{deal.rakeback}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Status</p>
                    <p className="text-base font-bold text-white">Active</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Dates/Currency Section */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Payment Dates/Currency
              </h3>
              <div className="bg-black/40 rounded-xl p-3 border border-white/[0.06]">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Payment Schedule</p>
                    <p className="text-sm text-white font-medium">{deal.paymentSchedule}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Currency</p>
                    <p className="text-sm text-white font-medium">{deal.currency}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Next Payment</p>
                    <p className="text-sm text-white font-medium">{deal.nextPayment}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Payment Method</p>
                    <p className="text-sm text-white font-medium">{deal.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-5 border-t border-white/[0.06]">
            <button
              onClick={onClose}
              className="px-5 py-2 text-sm rounded-lg bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.08] hover:border-white/[0.12] text-white font-medium transition-all duration-300"
            >
              Close
            </button>
            <button
              className="px-5 py-2 text-sm rounded-lg bg-[#10b981] hover:bg-[#0a9b30] text-white font-semibold transition-all duration-300 hover:scale-[1.02]"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        
        @keyframes scale-in {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}

