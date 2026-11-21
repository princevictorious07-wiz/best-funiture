import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { BUSINESS, HERO_MEDIA, buildWhatsAppUrl } from '../data/furniture';
import { SafeImage } from './SafeImage';

interface HeroProps {
  onOpenInquiry: (itemName?: string) => void;
}

export function Hero({ onOpenInquiry }: HeroProps) {
  const whatsappHref = buildWhatsAppUrl(
    `Hello ${BUSINESS.name}, I would like to inquire about furniture available in Wukari.`
  );

  return (
    <section className="pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-[#E4E0D8]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* 2-Column Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Headline & Direct Contact */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs font-medium tracking-wider uppercase text-[#57534E] mb-4">
                Katsina-Ala Road &middot; Opposite FUW Exit Gate &middot; Wukari
              </p>

              <h1
                className="font-display font-semibold tracking-tight text-[#1C1917] leading-[1.12] mb-5 text-balance"
                style={{ fontSize: 'clamp(2.25rem, 3.8vw, 3.35rem)' }}
              >
                Durable, Stylish Furniture Crafted for Homes &amp; Offices
              </h1>

              <p className="text-base sm:text-[17px] text-[#57534E] leading-relaxed max-w-[54ch] mb-8">
                At <strong className="font-semibold text-[#1C1917]">{BUSINESS.name}</strong>, we
                build and supply comfortable sofas, solid hardwood beds, dining sets, TV consoles,
                and office desks built to last in Wukari and across Taraba State.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-8">
                <a
                  href="#catalog"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] rounded-lg bg-[#2C1D14] text-[#FAF9F7] text-sm font-medium whitespace-nowrap shrink-0 hover:bg-[#4A2E1B] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E1B]"
                >
                  <span>Browse Furniture</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                </a>

                <a
                  href={BUSINESS.telHref}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-lg border border-[#D6D0C4] bg-white text-[#1C1917] text-sm font-medium whitespace-nowrap shrink-0 hover:bg-[#F1EFEA] transition-colors duration-150 tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#4A2E1B]" strokeWidth={1.75} />
                  <span>Call {BUSINESS.displayPhone}</span>
                </a>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-lg border border-[#1B6B3A]/25 bg-[#EDF7F1] text-[#14532D] text-sm font-medium whitespace-nowrap shrink-0 hover:bg-[#DCF1E4] transition-colors duration-150"
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Quiet Showroom Quick Summary */}
            <div className="pt-6 border-t border-[#E4E0D8] flex flex-wrap items-center justify-between gap-4 text-sm">
              <div className="text-[#57534E]">
                <span className="font-medium text-[#1C1917]">Showroom &amp; Workshop:</span>{' '}
                {BUSINESS.hours}
              </div>
              <button
                type="button"
                onClick={() => onOpenInquiry('Price Quote Request')}
                className="text-sm font-semibold text-[#4A2E1B] underline underline-offset-4 hover:text-[#1C1917] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Request a Price Quote
              </button>
            </div>
          </div>

          {/* Right Column: Full-Bleed Architectural Showroom Visual */}
          <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-[#E4E0D8] min-h-[300px] sm:min-h-[380px] lg:min-h-[440px]">
            <SafeImage
              src={HERO_MEDIA.image}
              alt={HERO_MEDIA.alt}
              fallbackTitle={BUSINESS.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
              <p className="text-xs font-medium uppercase tracking-wider text-white/80 mb-1">
                Visit Our Wukari Showroom
              </p>
              <p className="text-sm sm:text-base font-medium leading-snug max-w-[46ch]">
                {BUSINESS.address}
              </p>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Proof & Capabilities Strip */}
        <div className="mt-10 pt-8 border-t border-[#E4E0D8] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm font-semibold text-[#1C1917]">Custom Room Sizing</p>
            <p className="text-sm text-[#57534E] mt-1">
              Sofas, wardrobes, and beds tailored to your exact room layout.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1C1917]">Seasoned Hardwood</p>
            <p className="text-sm text-[#57534E] mt-1">
              Solid timber joinery built for long-lasting daily family comfort.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1C1917]">Easy Campus Access</p>
            <p className="text-sm text-[#57534E] mt-1">
              Situated right opposite Federal University Wukari exit gate.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1C1917]">Direct Inquiries</p>
            <p className="text-sm text-[#57534E] mt-1 tabular-nums">
              Reach us directly on {BUSINESS.displayPhone} or via WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
