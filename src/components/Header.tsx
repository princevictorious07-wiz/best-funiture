import { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { BUSINESS } from '../data/furniture';

interface HeaderProps {
  quoteCount: number;
  onOpenQuoteDrawer: () => void;
  onOpenInquiryModal: () => void;
}

export function Header({
  quoteCount,
  onOpenQuoteDrawer,
  onOpenInquiryModal,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePrimaryAction = () => {
    setMobileMenuOpen(false);
    if (quoteCount > 0) {
      onOpenQuoteDrawer();
    } else {
      onOpenInquiryModal();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F7]/95 backdrop-blur-md border-b border-[#E4E0D8]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Wordmark */}
        <a
          href="#"
          className="font-display text-base sm:text-lg font-semibold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A2E1B]"
        >
          {BUSINESS.name}
        </a>

        {/* Zone 2: Concise Single-Line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#57534E]"
        >
          <a
            href="#catalog"
            className="whitespace-nowrap shrink-0 hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors duration-150"
          >
            Furniture
          </a>
          <a
            href="#why-us"
            className="whitespace-nowrap shrink-0 hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors duration-150"
          >
            Why Us
          </a>
          <a
            href="#location"
            className="whitespace-nowrap shrink-0 hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors duration-150"
          >
            Showroom
          </a>
          <a
            href="#contact-form"
            className="whitespace-nowrap shrink-0 hover:text-[#1C1917] hover:underline underline-offset-4 transition-colors duration-150"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handlePrimaryAction}
            className="hidden sm:inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[40px] rounded-lg bg-[#2C1D14] text-[#FAF9F7] text-sm font-medium whitespace-nowrap shrink-0 hover:bg-[#4A2E1B] active:scale-[0.99] transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E1B]"
          >
            {quoteCount > 0 ? (
              <>
                <ShoppingBag className="w-4 h-4" strokeWidth={1.75} />
                <span className="tabular-nums">Quote Bag ({quoteCount})</span>
              </>
            ) : (
              <span>Order / Inquire</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#E4E0D8] bg-white text-[#1C1917] hover:bg-[#F1EFEA] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E4E0D8] bg-white px-4 py-4">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 text-sm font-medium text-[#1C1917] rounded-lg hover:bg-[#F1EFEA]"
            >
              Furniture Collection
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 text-sm font-medium text-[#1C1917] rounded-lg hover:bg-[#F1EFEA]"
            >
              Why Choose Us
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 text-sm font-medium text-[#1C1917] rounded-lg hover:bg-[#F1EFEA]"
            >
              Wukari Showroom
            </a>
            <a
              href="#contact-form"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-3 text-sm font-medium text-[#1C1917] rounded-lg hover:bg-[#F1EFEA]"
            >
              Send an Inquiry
            </a>
            <button
              type="button"
              onClick={handlePrimaryAction}
              className="mt-2 w-full inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-lg bg-[#2C1D14] text-[#FAF9F7] text-sm font-medium cursor-pointer"
            >
              {quoteCount > 0 ? `View Quote Bag (${quoteCount})` : 'Order / Inquire'}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
