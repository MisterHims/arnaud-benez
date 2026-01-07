import React, { SVGProps } from "react";
import { cn } from "@/lib/utils";

// 1. Liste des noms d'icônes disponibles
export type IconName = 'ArrowRight' | 'BookOpen' | 'Download' | 'IdVerified';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
  className?: string;
}

export const Icon = ({ name, size = 24, className, ...props }: IconProps) => {

  // Gestion de la taille (width/height ou size par défaut)
  const width = props.width || size;
  const height = props.height || size;

  // Classes de base pour assurer que l'icône prend la couleur du texte parent
  // On ne force pas "fill-none" ou "stroke-current" ici pour laisser la liberté à chaque SVG
  const baseClasses = cn("text-current", className);

  // 2. Le Dictionnaire des Icônes
  const ICONS: Record<IconName, React.ReactNode> = {

    // --- ARROW RIGHT (Basé sur Fill) ---
    'ArrowRight': (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={width}
        height={height}
        fill="none"
        className={baseClasses}
        {...props}
      >
        <path
          d="M12.293 5.29273C12.6591 4.92662 13.2381 4.90402 13.6309 5.22437L13.707 5.29273L19.707 11.2927L19.7754 11.3689C20.0957 11.7617 20.0731 12.3407 19.707 12.7068L13.707 18.7068C13.3165 19.0973 12.6835 19.0973 12.293 18.7068C11.9025 18.3163 11.9025 17.6833 12.293 17.2927L16.5859 12.9998H5C4.44772 12.9998 4 12.552 4 11.9998C4 11.4475 4.44772 10.9998 5 10.9998H16.5859L12.293 6.7068L12.2246 6.63063C11.9043 6.23785 11.9269 5.65885 12.293 5.29273Z"
          fill="currentColor"
        />
      </svg>
    ),

    // --- BOOK OPEN (Basé sur Stroke) ---
    'BookOpen': (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={width}
        height={height}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={baseClasses}
        {...props}
      >
        <path d="M17.5055 2.01874C12.8289 2.83455 12 7.5 12 7.5V22C12 22 12.8867 17.1272 18.0004 16.5588C18.5493 16.4978 19 16.0576 19 15.5058V3.39309C19 2.5654 18.3216 1.87638 17.5055 2.01874Z" />
        <path opacity="0.4" d="M5.33333 5.00001C7.79379 4.99657 10.1685 5.88709 12 7.5V22C10.1685 20.3871 7.79379 19.4966 5.33333 19.5C3.77132 19.5 2.99032 19.5 2.64526 19.2792C2.4381 19.1466 2.35346 19.0619 2.22086 18.8547C2 18.5097 2 17.8941 2 16.6629V8.40322C2 6.97543 2 6.26154 2.54874 5.68286C3.09748 5.10418 3.65923 5.07432 4.78272 5.0146C4.965 5.00491 5.14858 5.00001 5.33333 5.00001Z" />
        <path opacity="0.4" d="M12 22.001C13.8315 20.3881 16.2062 19.4976 18.6667 19.501C20.2287 19.501 21.0097 19.501 21.3547 19.2802C21.5619 19.1476 21.6465 19.0629 21.7791 18.8558C22 18.5107 22 17.8951 22 16.6639V8.40424C22 6.97645 22 6.26256 21.4513 5.68286C20.9025 5.1052 20.1235 5.05972 19 5" />
      </svg>
    ),

    // --- ID VERIFIED (Basé sur Stroke) ---
    'IdVerified': (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={width}
        height={height}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={baseClasses}
        {...props}
      >
        <path opacity="0.4" d="M7.5 18C8.41684 17.0229 9.72299 16.5115 11.0315 16.5002M13 12C13 13.1046 12.1187 14 11.0315 14C9.94438 14 9.06307 13.1046 9.06307 12C9.06307 10.8954 9.94438 10 11.0315 10C12.1187 10 13 10.8954 13 12Z" />
        <path d="M8.5 4.00195C5.85561 4.01181 4.44101 4.10427 3.52513 4.97195C2.5 5.94312 2.5 7.5062 2.5 10.6324V15.3692C2.5 18.4954 2.5 20.0584 3.52513 21.0296C4.55025 22.0008 6.20017 22.0008 9.5 22.0008H11.5M13.5 4.00195C16.1444 4.01181 17.559 4.10427 18.4749 4.97195C19.5 5.94312 19.5 7.5062 19.5 10.6324V11.5008" />
        <path d="M8.77216 3.63163C8.8681 3.21682 8.91608 3.00942 9.00821 2.84004C9.22285 2.44546 9.61879 2.15548 10.0914 2.0467C10.2943 2 10.5296 2 11 2C11.4704 2 11.7057 2 11.9086 2.0467C12.3812 2.15548 12.7771 2.44545 12.9918 2.84004C13.0839 3.00942 13.1319 3.21682 13.2278 3.63163L13.3111 3.99176C13.4813 4.72744 13.5664 5.09528 13.438 5.37824C13.3549 5.5615 13.2132 5.71842 13.031 5.82911C12.7496 6 12.3324 6 11.4981 6H10.5019C9.66755 6 9.25038 6 8.96901 5.82911C8.78677 5.71842 8.6451 5.5615 8.56197 5.37824C8.43361 5.09528 8.51869 4.72744 8.68886 3.99176L8.77216 3.63163Z" />
        <path opacity="0.4" d="M16.177 18.4559C16.4776 18.6002 16.8504 18.973 17.0308 19.2737C17.0909 19.6945 17.3916 18.0711 18.8586 17.1091M21.5 18.001C21.5 20.2101 19.7091 22.001 17.5 22.001C15.2909 22.001 13.5 20.2101 13.5 18.001C13.5 15.7918 15.2909 14.001 17.5 14.001C19.7091 14.001 21.5 15.7918 21.5 18.001Z" />
      </svg>
    ),

    // --- DOWNLOAD (Nouveau) ---
    'Download': (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={width}
        height={height}
        fill="none"
        stroke="currentColor" // Important pour ce SVG
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={baseClasses}
        {...props}
      >
        <path d="M17.0001 8C19.2093 8 21.0001 9.79086 21.0001 12V14.5C21.0001 16.8346 21.0001 18.0019 20.5278 18.8856C20.1549 19.5833 19.5834 20.1547 18.8857 20.5277C18.0021 21 16.8348 21 14.5001 21H9.50052C7.16551 21 5.99801 21 5.11426 20.5275C4.41677 20.1546 3.84547 19.5834 3.47258 18.8859C3.00012 18.0021 3.00012 16.8346 3.00012 14.4996V11.999C3.00067 9.79114 4.78999 8.00125 6.99785 8H7.00012" />
        <path opacity="0.4" d="M16.0001 12C16.0001 12 13.0542 16 12.0001 16C10.946 16 8.00012 12 8.00012 12M12.0001 15.5L12.0001 3" />
      </svg>
    ),
  };

  return <>{ICONS[name]}</>;
};