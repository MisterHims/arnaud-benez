import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import {
  GithubIcon,
  LaptopPhoneSyncIcon,
  Linkedin01Icon,
  LocationUser04Icon,
  MailAtSign01Icon,
  NewTwitterIcon,
  SlackIcon,
} from '@hugeicons-pro/core-duotone-standard';
import {
  Agreement02Icon,
  ArrowRight02Icon,
  Briefcase06Icon,
  Mortarboard02Icon,
} from '@hugeicons-pro/core-solid-standard';
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  BookOpen02Icon,
  Download02Icon,
  IdVerifiedIcon,
  Mail01Icon,
  Undo02Icon,
} from '@hugeicons-pro/core-stroke-sharp';
import { cn } from '@/lib/utils';

/**
 * Hugeicons, "standard" styles (Pro): duotone for the contact card's line
 * icons, solid for arrows and the experience timeline badges, stroke sharp
 * for buttons and controls. Colors follow `currentColor`.
 */
const ICONS = {
  // Solid standard
  ArrowRight: ArrowRight02Icon,
  Job: Briefcase06Icon,
  Formation: Mortarboard02Icon,
  Collaboration: Agreement02Icon,
  // Duotone standard
  Mail: MailAtSign01Icon,
  LaptopPhone: LaptopPhoneSyncIcon,
  LocationUser: LocationUser04Icon,
  NewTwitter: NewTwitterIcon,
  Linkedin: Linkedin01Icon,
  GitHub: GithubIcon,
  Slack: SlackIcon,
  // Stroke sharp (buttons, controls)
  ChevronUp: ArrowUp01Icon,
  ArrowDown: ArrowDown01Icon,
  BookOpen: BookOpen02Icon,
  IdVerified: IdVerifiedIcon,
  Download: Download02Icon,
  MailLine: Mail01Icon,
  Undo: Undo02Icon,
} satisfies Record<string, IconSvgElement>;

export type IconName = keyof typeof ICONS;

interface IconProps {
  name: IconName;
  size?: number;
  /**
   * Overrides the icon's own stroke width. Leave unset by default: when
   * given, HugeiconsIcon strokes EVERY shape, which thickens and blurs the
   * filled parts of solid and duotone icons (stroke icons already carry 1.5)
   */
  strokeWidth?: number;
  className?: string;
}

export const Icon = ({ name, size = 24, strokeWidth, className }: IconProps) => (
  <HugeiconsIcon
    icon={ICONS[name]}
    size={size}
    strokeWidth={strokeWidth}
    color="currentColor"
    className={cn('text-current shrink-0', className)}
    aria-hidden="true"
  />
);
