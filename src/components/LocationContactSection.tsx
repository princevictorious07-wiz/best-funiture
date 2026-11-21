import { useState, FormEvent } from 'react';
import { Phone, Mail, MapPin, MessageCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { BUSINESS, buildMailtoUrl, buildWhatsAppUrl } from '../data/furniture';

const INQUIRY_CATEGORIES = [
  'Living Room Sofa Set',
  'Bedroom Bed & Wardrobes',
  'Dining Table & Chairs',
  'Office / Study Furniture',
  'Custom Furniture Request',
];

export function LocationContactSection() {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [furnitureInterest, setFurnitureInterest] = useState(INQUIRY_CATEGORIES[0]);
  const [customerMessage, setCustomerMessage] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    const name = customerName.trim();
    const phone = customerPhone.trim();
    const message = customerMessage.trim();

    if (!name || !phone) {
      setStatus({
        type: 'error',
        text: 'Please enter your name and phone or WhatsApp number before sending.',
      });
      return;
    }

    const body = [
      `Name: ${name}`,
      `Phone/WhatsApp: ${phone}`,
      `Interest: ${furnitureInterest}`,
      `Message: ${message || 'Please share available options and prices.'}`,
    ].join('\n');

    setStatus({
      type: 'success',
      text: 'Opening your email app with your furniture inquiry.',
    });
    window.location.href = buildMailtoUrl(`Website Inquiry - ${furnitureInterest}`, body);
  };

  const handleWhatsAppSubmit = () => {
    const name = customerName.trim() || 'Customer';
    const phone = customerPhone.trim();
    const message = customerMessage.trim();

    const msg = [
      `Hello ${BUSINESS.name}, my name is ${name}.`,
      phone ? `Phone: ${phone}.` : '',
      `I'm looking for: ${furnitureInterest}.`,
      message ? `Note: ${message}` : '',
    ]
      .filter(Boolean)
      .join(' ');

    setStatus({
      type: 'success',
      text: 'Opening WhatsApp chat with our showroom team.',
    });
    window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="location" className="py-14 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-medium uppercase tracking-wider text-[#57534E] mb-2">
            Wukari Showroom
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#1C1917] text-balance">
            Visit or Contact Us
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] mt-2">
            Stop by our showroom in Wukari LGA to inspect timber finishes in person, or send an
            inquiry directly below.
          </p>
        </div>

        <div className="bg-white border border-[#E4E0D8] rounded-xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Business & Location Details */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <h3 className="font-display text-xl font-semibold text-[#1C1917] mb-6">
                Business &amp; Showroom Details
              </h3>

              <dl className="divide-y divide-[#E4E0D8] border-y border-[#E4E0D8]">
                <div className="py-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-1">
                    Business Name
                  </dt>
                  <dd className="text-base font-semibold text-[#1C1917]">
                    {BUSINESS.name}
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#4A2E1B]" />
                    <span>Showroom Address</span>
                  </dt>
                  <dd className="text-sm sm:text-base text-[#1C1917] leading-relaxed">
                    {BUSINESS.address}
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#4A2E1B]" />
                    <span>Phone &amp; WhatsApp</span>
                  </dt>
                  <dd>
                    <a
                      href={BUSINESS.telHref}
                      className="text-base font-semibold text-[#1C1917] hover:text-[#4A2E1B] hover:underline underline-offset-4 tabular-nums"
                    >
                      {BUSINESS.displayPhone}
                    </a>
                  </dd>
                </div>

                <div className="py-4">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#4A2E1B]" />
                    <span>Email Address</span>
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${BUSINESS.email}`}
                      className="text-base font-semibold text-[#1C1917] hover:text-[#4A2E1B] hover:underline underline-offset-4 break-all"
                    >
                      {BUSINESS.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="pt-6 flex flex-wrap gap-3">
              <a
                href={BUSINESS.telHref}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-lg border border-[#D6D0C4] bg-white text-sm font-medium text-[#1C1917] hover:bg-[#F1EFEA] transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#4A2E1B]" />
                <span>Call {BUSINESS.displayPhone}</span>
              </a>
              <a
                href={buildWhatsAppUrl(
                  `Hello ${BUSINESS.name}, I would like directions or price details for your Wukari showroom.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] rounded-lg bg-[#14532D] text-white text-sm font-medium hover:bg-[#166534] transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <form
            id="contact-form"
            onSubmit={handleEmailSubmit}
            className="lg:col-span-6 bg-[#FAF9F7] border border-[#E4E0D8] rounded-xl p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-display text-xl font-semibold text-[#1C1917] mb-1">
                Send an Inquiry
              </h3>
              <p className="text-sm text-[#57534E] mb-5">
                Fill out your details to send a direct request via Email or WhatsApp.
              </p>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="customerName"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="customerName"
                    name="customerName"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g., Musa Danjuma"
                    className="w-full px-3.5 py-2.5 min-h-[42px] rounded-lg border border-[#D6D0C4] bg-white text-sm text-[#1C1917] placeholder:text-[#78716C] focus:outline-2 focus:outline-[#4A2E1B]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="customerPhone"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1.5"
                  >
                    Phone / WhatsApp
                  </label>
                  <input
                    id="customerPhone"
                    name="customerPhone"
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g., 080..."
                    className="w-full px-3.5 py-2.5 min-h-[42px] rounded-lg border border-[#D6D0C4] bg-white text-sm text-[#1C1917] placeholder:text-[#78716C] focus:outline-2 focus:outline-[#4A2E1B]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="furnitureInterest"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1.5"
                  >
                    Furniture Needed
                  </label>
                  <select
                    id="furnitureInterest"
                    name="furnitureInterest"
                    value={furnitureInterest}
                    onChange={(e) => setFurnitureInterest(e.target.value)}
                    className="w-full px-3.5 py-2.5 min-h-[42px] rounded-lg border border-[#D6D0C4] bg-white text-sm text-[#1C1917] focus:outline-2 focus:outline-[#4A2E1B]"
                  >
                    {INQUIRY_CATEGORIES.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="customerMessage"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1.5"
                  >
                    Message / Size / Color Notes
                  </label>
                  <textarea
                    id="customerMessage"
                    name="customerMessage"
                    rows={3}
                    value={customerMessage}
                    onChange={(e) => setCustomerMessage(e.target.value)}
                    placeholder="Tell us what you need or when you plan to visit..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D6D0C4] bg-white text-sm text-[#1C1917] placeholder:text-[#78716C] focus:outline-2 focus:outline-[#4A2E1B]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-lg bg-[#2C1D14] text-white text-sm font-medium hover:bg-[#4A2E1B] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send via Email</span>
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[44px] rounded-lg bg-[#14532D] text-white text-sm font-medium hover:bg-[#166534] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>

              {status && (
                <div
                  role="status"
                  className={`mt-3 flex items-center gap-2 text-xs font-medium rounded-lg px-3 py-2.5 border ${
                    status.type === 'success'
                      ? 'text-[#14532D] bg-[#EDF7F1] border-[#14532D]/20'
                      : 'text-[#991B1B] bg-[#FEF2F2] border-[#991B1B]/20'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{status.text}</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
