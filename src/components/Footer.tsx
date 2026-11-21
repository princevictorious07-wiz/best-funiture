import { BUSINESS, buildWhatsAppUrl } from '../data/furniture';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1512] text-[#E7E2DA] py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/10">
          <div className="md:col-span-6">
            <p className="font-display text-lg font-semibold tracking-wide text-white">
              {BUSINESS.name}
            </p>
            <p className="text-sm text-[#B8AFA4] mt-2 max-w-[48ch] leading-relaxed">
              {BUSINESS.address}
            </p>
          </div>

          <div className="md:col-span-3 space-y-2 text-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-[#B8AFA4]">
              Direct Contact
            </p>
            <div>
              <a
                href={BUSINESS.telHref}
                className="text-white hover:underline underline-offset-4 tabular-nums"
              >
                {BUSINESS.displayPhone}
              </a>
            </div>
            <div>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="text-white hover:underline underline-offset-4 break-all"
              >
                {BUSINESS.email}
              </a>
            </div>
            <div>
              <a
                href={buildWhatsAppUrl(
                  `Hello ${BUSINESS.name}, I would like to inquire about furniture.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#86EFAC] hover:underline underline-offset-4"
              >
                WhatsApp Showroom
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2 text-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-[#B8AFA4]">
              Explore
            </p>
            <div>
              <a href="#catalog" className="hover:text-white transition-colors">
                Furniture Collection
              </a>
            </div>
            <div>
              <a href="#why-us" className="hover:text-white transition-colors">
                Workshop Standards
              </a>
            </div>
            <div>
              <a href="#location" className="hover:text-white transition-colors">
                Showroom Directions
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#A89F94]">
          <p>&copy; {year} {BUSINESS.name}. All rights reserved.</p>
          <p>Wukari LGA, Taraba State &middot; {BUSINESS.hours}</p>
        </div>
      </div>
    </footer>
  );
}
