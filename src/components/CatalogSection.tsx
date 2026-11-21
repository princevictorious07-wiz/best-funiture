import { Search, SlidersHorizontal, Plus, Eye } from 'lucide-react';
import {
  CATEGORIES,
  FURNITURE_ITEMS,
  FurnitureCategory,
  FurnitureItem,
} from '../data/furniture';
import { SafeImage } from './SafeImage';

interface CatalogSectionProps {
  activeCategory: FurnitureCategory;
  onCategoryChange: (category: FurnitureCategory) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onInspectItem: (item: FurnitureItem) => void;
  onInquireItem: (itemName: string) => void;
  onQuickAddToQuote: (item: FurnitureItem) => void;
}

export function CatalogSection({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  onInspectItem,
  onInquireItem,
  onQuickAddToQuote,
}: CatalogSectionProps) {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredItems = FURNITURE_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' || item.category === activeCategory;
    const matchesQuery =
      normalizedQuery === '' ||
      item.name.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery) ||
      item.materials.toLowerCase().includes(normalizedQuery) ||
      item.description.toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="catalog" className="py-14 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-wider text-[#57534E] mb-2">
              Showroom Collection
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#1C1917] text-balance">
              Our Furniture Collection
            </h2>
            <p className="text-sm sm:text-base text-[#57534E] mt-2">
              Filter by room category, inspect timber finishes and dimensions, or request pricing
              directly on WhatsApp or Email.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full lg:w-72 shrink-0">
            <label htmlFor="catalog-search" className="sr-only">
              Search furniture collection
            </label>
            <div className="relative">
              <Search
                className="w-4 h-4 text-[#57534E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                strokeWidth={1.75}
              />
              <input
                id="catalog-search"
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search sofa, bed, mahogany..."
                className="w-full pl-10 pr-4 py-2.5 min-h-[42px] rounded-lg border border-[#D6D0C4] bg-white text-sm text-[#1C1917] placeholder:text-[#78716C] focus:outline-2 focus:outline-offset-0 focus:outline-[#4A2E1B]"
              />
            </div>
          </div>
        </div>

        {/* Interactive Category Segmented Bar */}
        <div
          role="tablist"
          aria-label="Furniture categories"
          className="flex flex-wrap items-center gap-2 mb-8 pb-6 border-b border-[#E4E0D8]"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#57534E] mr-2">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
          </span>
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => onCategoryChange(category)}
                className={`px-4 py-2 min-h-[40px] rounded-lg text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E1B] ${
                  isActive
                    ? 'bg-[#2C1D14] text-[#FAF9F7]'
                    : 'bg-white text-[#44403C] border border-[#E4E0D8] hover:bg-[#F1EFEA] hover:text-[#1C1917]'
                }`}
              >
                {category === 'All' ? 'All Furniture' : category}
              </button>
            );
          })}
        </div>

        {/* Empty Filter State */}
        {filteredItems.length === 0 ? (
          <div className="bg-white border border-[#E4E0D8] rounded-xl p-10 text-center">
            <p className="text-base font-semibold text-[#1C1917]">
              No matching pieces found
            </p>
            <p className="text-sm text-[#57534E] mt-1 mb-5">
              We build custom furniture to specification in Wukari. Try clearing filters or request
              a custom build.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onCategoryChange('All');
                  onSearchChange('');
                }}
                className="px-4 py-2.5 min-h-[40px] rounded-lg border border-[#D6D0C4] bg-white text-sm font-medium text-[#1C1917] hover:bg-[#F1EFEA] cursor-pointer"
              >
                Reset Filters
              </button>
              <button
                type="button"
                onClick={() =>
                  onInquireItem(
                    searchQuery.trim()
                      ? `Custom Request: ${searchQuery.trim()}`
                      : 'Custom Furniture Request'
                  )
                }
                className="px-4 py-2.5 min-h-[40px] rounded-lg bg-[#2C1D14] text-white text-sm font-medium hover:bg-[#4A2E1B] cursor-pointer"
              >
                Request Custom Build
              </button>
            </div>
          </div>
        ) : (
          /* 3-Column Uniform Product Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="group bg-white border border-[#E4E0D8] rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(28,25,23,0.08)]"
              >
                {/* Leading 4:3 Studio Photograph */}
                <button
                  type="button"
                  onClick={() => onInspectItem(item)}
                  aria-label={`Inspect details for ${item.name}`}
                  className="block w-full aspect-[4/3] bg-[#F1EFEA] overflow-hidden cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#4A2E1B]"
                >
                  <SafeImage
                    src={item.image}
                    alt={item.imageAlt}
                    fallbackTitle={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </button>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col">
                  {/* Unboxed Typographic Metadata */}
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#57534E] mb-2">
                    <span>{item.category}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span className="normal-case tracking-normal text-[#78716C]">
                      {item.availability}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-[#1C1917] leading-snug mb-2">
                    <button
                      type="button"
                      onClick={() => onInspectItem(item)}
                      className="text-left hover:text-[#4A2E1B] transition-colors cursor-pointer"
                    >
                      {item.name}
                    </button>
                  </h3>

                  <p className="text-sm text-[#57534E] leading-relaxed mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  <p className="text-xs font-mono text-[#78716C] tabular-nums mb-5">
                    {item.dimensions}
                  </p>

                  {/* Consistent Bottom Action Row */}
                  <div className="mt-auto pt-4 border-t border-[#E4E0D8] flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-[#1C1917] tabular-nums">
                      {item.priceLabel}
                    </span>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => onInspectItem(item)}
                        aria-label={`View specifications for ${item.name}`}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 min-h-[38px] rounded-lg border border-[#D6D0C4] bg-white text-xs font-medium text-[#1C1917] hover:bg-[#F1EFEA] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <Eye className="w-3.5 h-3.5" strokeWidth={1.75} />
                        <span>Details</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onQuickAddToQuote(item)}
                        aria-label={`Add ${item.name} to quote list`}
                        className="inline-flex items-center justify-center gap-1 px-3 py-2 min-h-[38px] rounded-lg border border-[#D6D0C4] bg-[#FAF9F7] text-xs font-medium text-[#1C1917] hover:bg-[#F1EFEA] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                        title="Add to Quote Bag"
                      >
                        <Plus className="w-3.5 h-3.5" strokeWidth={1.75} />
                        <span>Quote</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onInquireItem(item.name)}
                        className="inline-flex items-center justify-center px-3.5 py-2 min-h-[38px] rounded-lg bg-[#2C1D14] text-white text-xs font-medium hover:bg-[#4A2E1B] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        Order / Inquire
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
