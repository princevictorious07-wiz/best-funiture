import { useState } from 'react';
import { FurnitureCategory, FurnitureItem } from './data/furniture';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { LocationContactSection } from './components/LocationContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { InquiryModal } from './components/InquiryModal';
import { QuoteCartItem, QuoteDrawer } from './components/QuoteDrawer';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<FurnitureCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<FurnitureItem | null>(null);

  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryItemName, setInquiryItemName] = useState('Custom Furniture / Price Quote');

  const [quoteItems, setQuoteItems] = useState<QuoteCartItem[]>([]);
  const [quoteDrawerOpen, setQuoteDrawerOpen] = useState(false);

  const totalQuoteCount = quoteItems.reduce((sum, entry) => sum + entry.quantity, 0);

  const handleOpenInquiry = (itemName = 'Custom Furniture / Price Quote') => {
    setInquiryItemName(itemName);
    setInquiryModalOpen(true);
  };

  const handleAddToQuote = (
    item: FurnitureItem,
    finish = item.finishes[0] || 'Standard Finish',
    quantity = 1
  ) => {
    setQuoteItems((prev) => {
      const existingIndex = prev.findIndex(
        (entry) => entry.item.id === item.id && entry.finish === finish
      );
      if (existingIndex >= 0) {
        return prev.map((entry, idx) =>
          idx === existingIndex
            ? { ...entry, quantity: entry.quantity + quantity }
            : entry
        );
      }
      return [...prev, { item, finish, quantity }];
    });
  };

  const handleQuickAddToQuote = (item: FurnitureItem) => {
    handleAddToQuote(item, item.finishes[0] || 'Standard Finish', 1);
    setQuoteDrawerOpen(true);
  };

  const handleUpdateQuoteQuantity = (id: number, finish: string, delta: number) => {
    setQuoteItems((prev) =>
      prev
        .map((entry) =>
          entry.item.id === id && entry.finish === finish
            ? { ...entry, quantity: entry.quantity + delta }
            : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  };

  const handleRemoveQuoteItem = (id: number, finish: string) => {
    setQuoteItems((prev) =>
      prev.filter((entry) => !(entry.item.id === id && entry.finish === finish))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F7] text-[#1C1917]">
      <Header
        quoteCount={totalQuoteCount}
        onOpenQuoteDrawer={() => setQuoteDrawerOpen(true)}
        onOpenInquiryModal={() => handleOpenInquiry()}
      />

      <main className="flex-1">
        <Hero onOpenInquiry={handleOpenInquiry} />

        <CatalogSection
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onInspectItem={(item) => setSelectedProduct(item)}
          onInquireItem={(name) => handleOpenInquiry(name)}
          onQuickAddToQuote={handleQuickAddToQuote}
        />

        <CraftsmanshipSection />

        <LocationContactSection />
      </main>

      <Footer />

      <ProductDetailModal
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToQuote={(item, finish, qty) => {
          handleAddToQuote(item, finish, qty);
        }}
      />

      <InquiryModal
        isOpen={inquiryModalOpen}
        initialItem={inquiryItemName}
        onClose={() => setInquiryModalOpen(false)}
      />

      <QuoteDrawer
        isOpen={quoteDrawerOpen}
        items={quoteItems}
        onClose={() => setQuoteDrawerOpen(false)}
        onUpdateQuantity={handleUpdateQuoteQuantity}
        onRemoveItem={handleRemoveQuoteItem}
        onClearAll={() => setQuoteItems([])}
      />
    </div>
  );
}
