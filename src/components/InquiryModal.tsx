import { useState, useEffect, FormEvent } from 'react';
import { X, MessageCircle, Mail, CheckCircle2 } from 'lucide-react';
import { BUSINESS, buildMailtoUrl, buildWhatsAppUrl } from '../data/furniture';

interface InquiryModalProps {
  isOpen: boolean;
  initialItem: string;
  onClose: () => void;
}

export function InquiryModal({ isOpen, initialItem, onClose }: InquiryModalProps) {
  const [item, setItem] = useState(initialItem);
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setItem(initialItem || 'Custom Furniture / Price Quote');
      setStatusMessage('');
    }
  }, [isOpen, initialItem]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanItem = item.trim();
    const cleanName = name.trim();
    const cleanNotes = notes.trim();

    if (!cleanItem || !cleanName) return;

    const body = [
      `Hello ${BUSINESS.name},`,
      '',
      `My name is ${cleanName}. I would like to inquire about: ${cleanItem}.`,
      cleanNotes ? `Notes: ${cleanNotes}` : '',
      '',
      `Location reference: ${BUSINESS.address}`,
    ]
      .filter(Boolean)
      .join('\n');

    setStatusMessage('Opening your email app with this inquiry...');
    window.location.href = buildMailtoUrl(`Furniture Inquiry: ${cleanItem}`, body);
  };

  const handleWhatsAppClick = () => {
    const cleanItem = item.trim() || 'Furniture';
    const cleanName = name.trim() || 'a customer';
    const cleanNotes = notes.trim();

    const msg = [
      `Hello ${BUSINESS.name}, I'm ${cleanName}.`,
      `I'm interested in: ${cleanItem}.`,
      cleanNotes ? `Details: ${cleanNotes}` : '',
    ]
      .filter(Boolean)
      .join(' ');

    setStatusMessage('Opening WhatsApp chat...');
    window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1C1917]/60 backdrop-blur-[2px] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-modal-title"
        className="bg-white border border-[#E4E0D8] rounded-xl w-full max-w-md p-6 sm:p-7 shadow-2xl relative"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close inquiry modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-lg border border-[#E4E0D8] bg-[#FAF9F7] text-[#1C1917] flex items-center justify-center hover:bg-[#F1EFEA] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <p className="text-xs font-medium uppercase tracking-wider text-[#57534E] mb-1">
          Direct Showroom Request
        </p>
        <h3
          id="inquiry-modal-title"
          className="font-display text-xl font-semibold text-[#1C1917] pr-8"
        >
          Order or Request Price
        </h3>
        <p className="text-sm text-[#57534E] mt-1 mb-5">
          Tell us what item caught your eye and reach our Wukari workshop right away.
        </p>

        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="modal-item"
              className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1.5"
            >
              Selected Item
            </label>
            <input
              id="modal-item"
              type="text"
              required
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="w-full px-3.5 py-2.5 min-h-[42px] rounded-lg border border-[#D6D0C4] bg-white text-sm text-[#1C1917] focus:outline-2 focus:outline-[#4A2E1B]"
            />
          </div>

          <div>
            <label
              htmlFor="modal-name"
              className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1.5"
            >
              Your Name
            </label>
            <input
              id="modal-name"
              type="text"
              required
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-3.5 py-2.5 min-h-[42px] rounded-lg border border-[#D6D0C4] bg-white text-sm text-[#1C1917] placeholder:text-[#78716C] focus:outline-2 focus:outline-[#4A2E1B]"
            />
          </div>

          <div>
            <label
              htmlFor="modal-notes"
              className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1.5"
            >
              Notes (Color, Quantity, or Delivery in Wukari)
            </label>
            <textarea
              id="modal-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Need 1 set in warm mahogany / cream..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#D6D0C4] bg-white text-sm text-[#1C1917] placeholder:text-[#78716C] focus:outline-2 focus:outline-[#4A2E1B]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-lg bg-[#14532D] text-white text-sm font-medium hover:bg-[#166534] transition-colors cursor-pointer whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Inquiry</span>
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-lg bg-[#2C1D14] text-white text-sm font-medium hover:bg-[#4A2E1B] transition-colors cursor-pointer whitespace-nowrap"
            >
              <Mail className="w-4 h-4" />
              <span>Email Inquiry</span>
            </button>
          </div>

          {statusMessage && (
            <div
              role="status"
              className="flex items-center gap-2 text-xs font-medium text-[#14532D] bg-[#EDF7F1] border border-[#14532D]/20 rounded-lg px-3 py-2.5"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
