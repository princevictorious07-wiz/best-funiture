import { useState, useEffect } from 'react';
import { X, Plus, Minus, Trash2, MessageCircle, Mail, CheckCircle2 } from 'lucide-react';
import {
  BUSINESS,
  FurnitureItem,
  buildMailtoUrl,
  buildWhatsAppUrl,
} from '../data/furniture';
import { SafeImage } from './SafeImage';

export interface QuoteCartItem {
  item: FurnitureItem;
  finish: string;
  quantity: number;
}

interface QuoteDrawerProps {
  isOpen: boolean;
  items: QuoteCartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: number, finish: string, delta: number) => void;
  onRemoveItem: (id: number, finish: string) => void;
  onClearAll: () => void;
}

export function QuoteDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearAll,
}: QuoteDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [sentNotice, setSentNotice] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalUnits = items.reduce((sum, entry) => sum + entry.quantity, 0);

  const formatLineItems = () =>
    items
      .map(
        (entry, idx) =>
          `${idx + 1}. ${entry.quantity}x ${entry.item.name} (${entry.finish}) — ${entry.item.dimensions}`
      )
      .join('\n');

  const handleWhatsAppQuote = () => {
    if (items.length === 0) return;
    const nameStr = customerName.trim() || 'a customer';
    const msg = [
      `Hello ${BUSINESS.name}, I'm ${nameStr}.`,
      customerPhone.trim() ? `Phone: ${customerPhone.trim()}.` : '',
      `I would like a price quote for:`,
      formatLineItems(),
      deliveryNotes.trim() ? `Notes: ${deliveryNotes.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    setSentNotice('Opening WhatsApp with your quote list...');
    window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  const handleEmailQuote = () => {
    if (items.length === 0) return;
    const nameStr = customerName.trim() || 'Customer';
    const body = [
      `Hello ${BUSINESS.name},`,
      '',
      `Name: ${nameStr}`,
      customerPhone.trim() ? `Phone / WhatsApp: ${customerPhone.trim()}` : '',
      '',
      `Requested Furniture Quote (${totalUnits} items):`,
      formatLineItems(),
      '',
      deliveryNotes.trim() ? `Delivery / Room Notes: ${deliveryNotes.trim()}` : '',
      `Showroom Reference: ${BUSINESS.address}`,
    ]
      .filter(Boolean)
      .join('\n');

    setSentNotice('Opening your email app with your quote list...');
    window.location.href = buildMailtoUrl(
      `Furniture Quote Request (${totalUnits} items)`,
      body
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1C1917]/60 backdrop-blur-[2px] flex justify-end"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Quote Request Bag"
        className="bg-white border-l border-[#E4E0D8] w-full max-w-md h-full flex flex-col shadow-2xl"
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#E4E0D8] flex items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-semibold text-[#1C1917]">
              Quote Request Bag
            </h3>
            <p className="text-xs text-[#57534E] tabular-nums">
              {totalUnits} {totalUnits === 1 ? 'piece' : 'pieces'} selected for pricing
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quote bag"
            className="w-9 h-9 rounded-lg border border-[#E4E0D8] bg-[#FAF9F7] text-[#1C1917] flex items-center justify-center hover:bg-[#F1EFEA] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Itemized List */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {items.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm font-medium text-[#1C1917]">
                Your quote bag is empty
              </p>
              <p className="text-xs text-[#57534E] mt-1">
                Select &ldquo;+ Quote&rdquo; on any furniture piece to combine items into one
                showroom price request.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#57534E]">
                  Selected Pieces
                </span>
                <button
                  type="button"
                  onClick={onClearAll}
                  className="text-xs font-medium text-[#57534E] hover:text-[#1C1917] underline underline-offset-2 cursor-pointer"
                >
                  Clear all
                </button>
              </div>

              <ul className="divide-y divide-[#E4E0D8] border-y border-[#E4E0D8]">
                {items.map((entry) => (
                  <li
                    key={`${entry.item.id}-${entry.finish}`}
                    className="py-4 flex gap-3.5"
                  >
                    <div className="w-20 h-16 rounded-lg overflow-hidden bg-[#F1EFEA] shrink-0 border border-[#E4E0D8]">
                      <SafeImage
                        src={entry.item.image}
                        alt={entry.item.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1C1917] truncate">
                        {entry.item.name}
                      </p>
                      <p className="text-xs text-[#57534E] mt-0.5">{entry.finish}</p>

                      <div className="mt-2.5 flex items-center justify-between gap-2">
                        <div className="inline-flex items-center border border-[#D6D0C4] rounded-md bg-white">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(entry.item.id, entry.finish, -1)
                            }
                            aria-label={`Decrease ${entry.item.name} quantity`}
                            className="w-7 h-7 flex items-center justify-center hover:bg-[#F1EFEA] cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-medium tabular-nums">
                            {entry.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(entry.item.id, entry.finish, 1)
                            }
                            aria-label={`Increase ${entry.item.name} quantity`}
                            className="w-7 h-7 flex items-center justify-center hover:bg-[#F1EFEA] cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(entry.item.id, entry.finish)}
                          aria-label={`Remove ${entry.item.name}`}
                          className="text-xs text-[#57534E] hover:text-[#991B1B] inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Customer Details for Quote */}
              <div className="pt-2 space-y-3">
                <div>
                  <label
                    htmlFor="drawer-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    id="drawer-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g., Musa Danjuma"
                    className="w-full px-3 py-2 min-h-[40px] rounded-lg border border-[#D6D0C4] text-sm text-[#1C1917]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="drawer-phone"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1"
                  >
                    Phone / WhatsApp
                  </label>
                  <input
                    id="drawer-phone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g., 080..."
                    className="w-full px-3 py-2 min-h-[40px] rounded-lg border border-[#D6D0C4] text-sm text-[#1C1917]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="drawer-notes"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1"
                  >
                    Delivery Location / Custom Notes
                  </label>
                  <textarea
                    id="drawer-notes"
                    rows={2}
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="e.g., Delivery near FUW campus, Wukari..."
                    className="w-full px-3 py-2 rounded-lg border border-[#D6D0C4] text-sm text-[#1C1917]"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-[#E4E0D8] bg-[#FAF9F7] space-y-2.5">
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleWhatsAppQuote}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-lg bg-[#14532D] text-white text-sm font-medium hover:bg-[#166534] transition-colors cursor-pointer whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Quote</span>
              </button>
              <button
                type="button"
                onClick={handleEmailQuote}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-lg bg-[#2C1D14] text-white text-sm font-medium hover:bg-[#4A2E1B] transition-colors cursor-pointer whitespace-nowrap"
              >
                <Mail className="w-4 h-4" />
                <span>Email Quote</span>
              </button>
            </div>

            {sentNotice && (
              <div
                role="status"
                className="flex items-center gap-2 text-xs font-medium text-[#14532D] bg-[#EDF7F1] border border-[#14532D]/20 rounded-lg px-3 py-2"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{sentNotice}</span>
              </div>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
