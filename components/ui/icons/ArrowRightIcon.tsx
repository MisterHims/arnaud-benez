import React, { SVGProps } from "react";

interface IconSvgProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const ArrowRightIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width || size}
      height={height || size}
      fill="none"
      color="currentColor"
      {...props}
    >
      <path
        d="M12.293 5.29273C12.6591 4.92662 13.2381 4.90402 13.6309 5.22437L13.707 5.29273L19.707 11.2927L19.7754 11.3689C20.0957 11.7617 20.0731 12.3407 19.707 12.7068L13.707 18.7068C13.3165 19.0973 12.6835 19.0973 12.293 18.7068C11.9025 18.3163 11.9025 17.6833 12.293 17.2927L16.5859 12.9998H5C4.44772 12.9998 4 12.552 4 11.9998C4 11.4475 4.44772 10.9998 5 10.9998H16.5859L12.293 6.7068L12.2246 6.63063C11.9043 6.23785 11.9269 5.65885 12.293 5.29273Z"
        fill="currentColor"
      />
    </svg>
  );
};