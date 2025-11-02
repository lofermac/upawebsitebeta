'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface RejectDealModalProps {
  dealName: string;
  playerName: string;
  onClose: () => void;
  onConfirm: (rejectionReason: string, adminNotes: string) => void;
}

export default function RejectDealModal({
  dealName,
  playerName,
  onClose,
  onConfirm,
}: RejectDealModalProps) {
  const [rejectionReason, setRejectionReason] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for the player');
      return;
    }

    setLoading(true);
    await onConfirm(rejectionReason, adminNotes);
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0a0e13] rounded-xl border border-white/[0.06] max-w-2xl w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Reject Deal Request</h2>
            <p className="text-gray-400 mt-1">
              {dealName} - {playerName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Rejection Reason (Player will see this) */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Reason for Player <span className="text-red-500">*</span>
            </label>
            <p className="text-sm text-gray-500 mb-3">
              This message will be visible to the player. Be clear and helpful.
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f1419] border border-white/[0.06] rounded-lg text-white placeholder-gray-500 focus:border-[#10b981] focus:outline-none resize-none"
              rows={4}
              placeholder="Example: Your platform username doesn't match our records. Please provide the correct username and resubmit."
              required
            />
          </div>

          {/* Admin Notes (Internal only) */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Internal Notes (Optional)
            </label>
            <p className="text-sm text-gray-500 mb-3">
              Private notes visible only to other admins.
            </p>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f1419] border border-white/[0.06] rounded-lg text-white placeholder-gray-500 focus:border-[#10b981] focus:outline-none resize-none"
              rows={3}
              placeholder="Example: Contacted via email, waiting for verification..."
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-[#0f1419] hover:bg-gray-800 text-white font-medium rounded-lg transition-colors border border-white/[0.06]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !rejectionReason.trim()}
              className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Rejecting...' : 'Confirm Rejection'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

