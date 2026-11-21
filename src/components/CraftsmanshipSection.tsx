import { CRAFTSMANSHIP_PILLARS } from '../data/furniture';

export function CraftsmanshipSection() {
  return (
    <section id="why-us" className="py-14 sm:py-16 bg-[#F1EFEA] border-y border-[#E4E0D8]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-medium uppercase tracking-wider text-[#57534E] mb-2">
            Workshop Standards
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#1C1917] text-balance">
            Why Customers Choose Prince Victoria&apos;s Best Furnitures
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] mt-2">
            Practical craftsmanship, transparent pricing estimates, and an easy-to-reach showroom
            in Wukari LGA.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CRAFTSMANSHIP_PILLARS.map((pillar) => (
            <div
              key={pillar.index}
              className="bg-white border border-[#E4E0D8] rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-medium text-[#4A2E1B] block mb-3 tabular-nums">
                  {pillar.index}
                </span>
                <h3 className="text-base font-semibold text-[#1C1917] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#57534E] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
