import { useState } from 'react';
import { Armchair } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function SafeImage({ src, alt, className = '', fallbackTitle }: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F1EFEA] to-[#E4DDD2] text-[#4A2E1B] p-6 text-center ${className}`}
      >
        <Armchair className="w-8 h-8 mb-2 opacity-70" strokeWidth={1.5} />
        {fallbackTitle && (
          <span className="text-xs font-medium tracking-wide text-[#57534E]">
            {fallbackTitle}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
