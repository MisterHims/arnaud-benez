import { cn } from '@/lib/utils';

/** The AB logo symbol (white, square). Decorative: give it a label at the call site if needed */
export const BrandMark = ({ className }: { className?: string }) => (
  <svg viewBox='0 0 160 160' fill='none' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' className={cn('shrink-0', className)}>
    <path d='M124.444 80L160 44.445L115.556 0.00126118L80 35.555L44.445 0L0 44.445L8.88875 53.3337L44.4437 17.7788L73.7146 47.0484V73.7096H41.8416L0 115.552L44.4437 159.997L80 124.444L115.555 160L159.999 115.556L124.444 80ZM86.3168 47.0144L115.555 17.7762L142.221 44.4412L112.952 73.7096H86.2854L86.3168 47.0144ZM44.445 142.221L17.7788 115.552L47.0484 86.2803H73.7146V112.996L44.445 142.221ZM115.555 142.221L86.2854 112.969V86.2803H112.952L142.221 115.552L115.555 142.221Z' fill='currentColor' />
  </svg>
);
