import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
};

// Wires ./i18n/request.ts (locale + messages) into the app
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
