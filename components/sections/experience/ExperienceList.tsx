'use client';

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExperienceItem } from "./ExperienceItem";
import { TIMELINE_DATA, sortTimeline } from "@/src/data/experience";
import { CustomButton } from "@/components/CustomButton";
import { Icon } from "@/components/ui/Icon";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const FILTER_IDS = ['all', 'job', 'collaboration', 'formation'] as const;
type FilterId = (typeof FILTER_IDS)[number];

export const ExperienceList = () => {

  const t = useTranslations('Experience');
  const tWho = useTranslations('WhoIAm');
  const reduceMotion = usePrefersReducedMotion();
  const [selected, setSelected] = useState<FilterId>('all');
  // Full list or the first 8 items
  const [isExpanded, setIsExpanded] = useState(false);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (id: FilterId) => {
    setSelected(id);
    setIsExpanded(false); // each filter starts collapsed
  };

  // Tabs pattern (WAI-ARIA): arrows / Home / End move and select
  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = FILTER_IDS.length - 1;
    const next =
      e.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : e.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    select(FILTER_IDS[next]);
    tabRefs.current[next]?.focus();
  };

  // Ongoing positions first, then the most recent
  const categoryItems = sortTimeline(TIMELINE_DATA).filter((item) => selected === 'all' || item.type === selected);
  const showButton = categoryItems.length > 8;
  const displayedItems = isExpanded ? categoryItems : categoryItems.slice(0, 8);
  // The timeline fades out at the end, unless a "Show more" button follows
  const shouldFade = !showButton || isExpanded;

  return (
    <div className="flex flex-col h-full">

      <h2 className='text-xl md:text-8xl font-black text-[#ebedf0] tracking-tight mb-14'>
        {t('title')}
      </h2>

      {/* Filters: compact pill, the active tab's background slides along.
          Light fill + hairline drawn as an inset ring (box-shadow), smoother
          than a border with fractional display scaling. Closer to
          the timeline it filters than to the title (whose descenders eat
          into the gap above) */}
      <div
        role="tablist"
        aria-label={t('filtersLabel')}
        className="self-start inline-flex flex-wrap items-center gap-0.5 p-1 mb-10 rounded-full bg-white/4 ring-1 ring-inset ring-white/10"
      >
        {FILTER_IDS.map((id, index) => {
          const isSelected = id === selected;
          return (
            <button
              key={id}
              ref={(el) => { tabRefs.current[index] = el; }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${id}`}
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => select(id)}
              onKeyDown={(e) => onTabKeyDown(e, index)}
              className={cn(
                'relative isolate h-8 px-3.5 rounded-full text-sm transition-colors duration-300 cursor-pointer select-none',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50',
                isSelected ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
              )}
            >
              {isSelected && (
                <motion.span
                  layoutId={`${baseId}-active-tab`}
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 rounded-full bg-white/10"
                  transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative">{t(`filters.${id}`)}</span>
            </button>
          );
        })}
      </div>

      {/* No initial={false} here: it would also cancel the entries'
          scroll-in reveal below */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${selected}`}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-full motion-reduce:opacity-100! motion-reduce:transform-none!"
        >
          {/* space-y-20: each experience holds more now, keep them clearly apart */}
          <div className="relative ml-3 space-y-20 pb-18">

            {/* --- TIMELINE LINE --- */}
            <div
              className="absolute top-0 bottom-0 left-0 w-[3px] bg-zinc-900 pointer-events-none"
              style={
                shouldFade
                  ? {
                    maskImage: 'linear-gradient(to bottom, black calc(100% - 100px), transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black calc(100% - 100px), transparent 100%)'
                  }
                  : undefined // "Show more" below: solid line
              }
            />

            {displayedItems.map((item) => (
              // Each entry fades up gently as it scrolls into view (once).
              // Reduced motion: forced visible and still in CSS (!important
              // beats the inline styles), right from the first paint
              <motion.div
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="motion-reduce:opacity-100! motion-reduce:transform-none!"
              >
                {/* Trainings stay lighter next to jobs and collaborations */}
                <ExperienceItem
                  {...item}
                  compact={selected === 'all' && item.type === 'formation'}
                  showType={selected === 'all'}
                />
              </motion.div>
            ))}

            {categoryItems.length === 0 && (
              <p className="pl-12 text-zinc-400 text-sm italic py-4">{t('empty')}</p>
            )}

            {showButton && !isExpanded && (
              <div className="relative pl-12 pt-2">
                <div className="absolute -left-[6px] top-5 w-3.25 h-3.25 rounded-full bg-zinc-800 ring-4 ring-black text-[8px] flex items-center justify-center text-black"></div>
                <CustomButton
                  size="sm"
                  variant="secondary"
                  onPress={() => setIsExpanded(true)}
                  className="absolute"
                >
                  {t('showMore')}
                  <Icon name="ArrowDown" size={16} />
                </CustomButton>
              </div>
            )}

          </div>
        </motion.div>
      </AnimatePresence>

      {/* After reading the whole background: the natural moment to act,
          either way (resume, or straight to the contact section) */}
      <div className="ml-3 pl-12 mt-8 flex flex-col gap-4">
        <p className="text-[#d0d4da] font-[250]">{t('cta')}</p>
        <div className="flex flex-wrap gap-3">
          <CustomButton variant="primary" size="lg">
            <Icon name="IdVerified" size={18} />
            {tWho('downloadCv')}
          </CustomButton>
          <CustomButton
            variant="secondary"
            size="lg"
            onPress={() => document.getElementById('contact')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })}
          >
            <Icon name="MailLine" size={18} />
            {t('contactCta')}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
