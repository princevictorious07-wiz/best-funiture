import { useState, useEffect } from 'react';
import { X, MessageCircle, Mail, Plus, Minus, ShoppingBag } from 'lucide-react';
import {
  BUSINESS,
  FurnitureItem,
  buildMailtoUrl,
  buildWhatsAppUrl,
} from '../data/furniture';
import { SafeImage } from './SafeImage';

interface ProductDetailModalProps {
  item: FurnitureItem | null;
  onClose: () => void;
  onAddToQuote: (item: FurnitureItem, finish: string, quantity: number) => void;
}

export function ProductDetailModal({
  item,
  onClose,
  onAddToQuote,
}: ProductDetailModalProps) {
  const [selectedFinish, setSelectedFinish] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    if (item) {
      setSelectedFinish(item.finishes[0] || 'Standard Finish');
      setQuantity(1);
      setAddedFeedback(false);
    }
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [item, onClose]);

  if (!item) return null;

  const whatsappMessage = `Hello ${BUSINESS.name}, I would like to inquire about ${quantity}x ${item.name} (${selectedFinish}). Location: ${BUSINESS.shortLocation}.`;
  const emailSubject = `Product Inquiry: ${item.name} (${selectedFinish})`;
  const emailBody = [
    `Hello ${BUSINESS.name},`,
    '',
    `I am interested in the following piece:`,
    `Item: ${item.name}`,
    `Preferred Finish: ${selectedFinish}`,
    `Quantity: ${quantity}`,
    `Dimensions: ${item.dimensions}`,
    '',
    `Please let me know current pricing and availability in Wukari.`,
  ].join('\n');

  const handleAdd = () => {
    onAddToQuote(item, selectedFinish, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
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
        aria-labelledby="detail-modal-title"
        className="bg-white border border-[#E4E0D8] rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 max-h-[92vh] overflow-y-auto"
      >
        {/* Left Gallery Image */}
        <div className="md:col-span-6 bg-[#F1EFEA] min-h-[260px] md:min-h-[420px]">
          <SafeImage
            src={item.image}
            alt={item.imageAlt}
            fallbackTitle={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Contiguous Purchase / Inquiry Module */}
        <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#57534E]">
                <span>{item.category}</span>
                <span aria-hidden="true">&middot;</span>
                <span className="normal-case tracking-normal">{item.availability}</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close product details"
                className="w-9 h-9 rounded-lg border border-[#E4E0D8] bg-[#FAF9F7] text-[#1C1917] flex items-center justify-center hover:bg-[#F1EFEA] cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h3
              id="detail-modal-title"
              className="font-display text-2xl font-semibold text-[#1C1917] leading-snug mb-2"
            >
              {item.name}
            </h3>

            <p className="text-base font-semibold text-[#4A2E1B] mb-4">
              {item.priceLabel}
            </p>

            <p className="text-sm text-[#57534E] leading-relaxed mb-5">
              {item.description}
            </p>

            {/* Specifications */}
            <dl className="border-y border-[#E4E0D8] py-4 space-y-2.5 text-sm mb-5">
              <div className="flex justify-between gap-4">
                <dt className="text-[#57534E]">Dimensions</dt>
                <dd className="font-mono text-xs sm:text-sm text-[#1C1917] text-right tabular-nums">
                  {item.dimensions}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#57534E]">Materials</dt>
                <dd className="text-[#1C1917] text-right">{item.materials}</dd>
              </div>
            </dl>

            {/* Finish Selector */}
            <div className="mb-5">
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-2">
                Finish / Upholstery Option
              </span>
              <div className="flex flex-wrap gap-2">
                {item.finishes.map((finish) => {
                  const active = selectedFinish === finish;
                  return (
                    <button
                      key={finish}
                      type="button"
                      onClick={() => setSelectedFinish(finish)}
                      className={`px-3 py-2 min-h-[38px] rounded-lg text-xs font-medium border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-[#2C1D14] text-white border-[#2C1D14]'
                          : 'bg-white text-[#1C1917] border-[#D6D0C4] hover:bg-[#F1EFEA]'
                      }`}
                    >
                      {finish}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#57534E]">
                Quantity
              </span>
              <div className="inline-flex items-center border border-[#D6D0C4] rounded-lg bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-10 flex items-center justify-center text-[#1C1917] hover:bg-[#F1EFEA] cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-medium tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-10 h-10 flex items-center justify-center text-[#1C1917] hover:bg-[#F1EFEA] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={handleAdd}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-lg bg-[#2C1D14] text-white text-sm font-medium hover:bg-[#4A2E1B] transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{addedFeedback ? 'Added to Quote Bag' : 'Add to Quote Bag'}</span>
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={buildWhatsAppUrl(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] rounded-lg bg-[#14532D] text-white text-sm font-medium hover:bg-[#166534] transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              <a
                href={buildMailtoUrl(emailSubject, emailBody)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] rounded-lg border border-[#D6D0C4] bg-white text-[#1C1917] text-sm font-medium hover:bg-[#F1EFEA] transition-colors whitespace-nowrap"
              >
                <Mail className="w-4 h-4" />
                <span>Email Inquiry</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
