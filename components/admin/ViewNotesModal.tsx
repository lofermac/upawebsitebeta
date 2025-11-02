'use client';

import { X, MessageSquare, FileText } from 'lucide-react';

interface ViewNotesModalProps {
  dealName: string;
  playerName: string;
  rejectionReason: string | null;
  adminNotes: string | null;
  onClose: () => void;
}

export default function ViewNotesModal({
  dealName,
  playerName,
  rejectionReason,
  adminNotes,
  onClose,
}: ViewNotesModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0a0e13] rounded-xl border border-white/[0.06] max-w-2xl w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Rejection Details</h2>
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

        <div className="space-y-6">
          {/* Rejection Reason (Player sees this) */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Reason Sent to Player
                </h3>
                <p className="text-xs text-gray-500">
                  This message is visible to the player
                </p>
              </div>
            </div>
            <div className="p-4 bg-[#0f1419] border border-white/[0.06] rounded-lg">
              {rejectionReason ? (
                <p className="text-sm text-gray-300 leading-relaxed">
                  {rejectionReason}
                </p>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No reason provided
                </p>
              )}
            </div>
          </div>

          {/* Admin Notes (Internal only) */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Internal Admin Notes
                </h3>
                <p className="text-xs text-gray-500">
                  Private notes, not visible to player
                </p>
              </div>
            </div>
            <div className="p-4 bg-[#0f1419] border border-white/[0.06] rounded-lg">
              {adminNotes ? (
                <p className="text-sm text-gray-300 leading-relaxed">
                  {adminNotes}
                </p>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No internal notes
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#0f1419] hover:bg-gray-800 text-white font-medium rounded-lg transition-colors border border-white/[0.06]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

