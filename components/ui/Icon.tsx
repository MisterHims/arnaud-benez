import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import {
  BookOpen02Icon,
  Download02Icon,
  GithubIcon,
  IdVerifiedIcon,
  LaptopPhoneSyncIcon,
  Linkedin01Icon,
  LocationUser04Icon,
  MailAtSign01Icon,
  NewTwitterIcon,
  SlackIcon,
} from '@hugeicons-pro/core-duotone-standard';
import {
  Agreement02Icon,
  ArrowDown01Icon,
  ArrowRight02Icon,
  Briefcase06Icon,
  Mortarboard02Icon,
} from '@hugeicons-pro/core-solid-standard';
import { ArrowUp01Icon } from '@hugeicons-pro/core-stroke-sharp';
import { cn } from '@/lib/utils';

/**
 * Hugeicons, "standard" styles (Pro): duotone for line icons, solid for
 * arrows and the experience timeline badges; stroke sharp for the
 * back-to-top chevron. Colors follow `currentColor`.
 */
const ICONS = {
  // Solid standard
  ArrowRight: ArrowRight02Icon,
  ArrowDown: ArrowDown01Icon,
  Job: Briefcase06Icon,
  Formation: Mortarboard02Icon,
  Collaboration: Agreement02Icon,
  // Duotone standard
  BookOpen: BookOpen02Icon,
  IdVerified: IdVerifiedIcon,
  Download: Download02Icon,
  Mail: MailAtSign01Icon,
  LaptopPhone: LaptopPhoneSyncIcon,
  LocationUser: LocationUser04Icon,
  NewTwitter: NewTwitterIcon,
  Linkedin: Linkedin01Icon,
  GitHub: GithubIcon,
  Slack: SlackIcon,
  // Stroke sharp
  ChevronUp: ArrowUp01Icon,
} satisfies Record<string, IconSvgElement>;

export type IconName = keyof typeof ICONS;

interface IconProps {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const Icon = ({ name, size = 24, strokeWidth = 1.5, className }: IconProps) => (
  <HugeiconsIcon
    icon={ICONS[name]}
    size={size}
    strokeWidth={strokeWidth}
    color="currentColor"
    className={cn('text-current shrink-0', className)}
    aria-hidden="true"
  />
);
