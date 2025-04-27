import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

let metadataBase: URL | undefined;
try {
  if (baseUrl && baseUrl !== process.env.NEXT_PUBLIC_SITE_URL) {
    metadataBase = new URL(baseUrl);
  } else {
    console.warn(
      "Warning: `baseUrl` is not set. Relative paths for metadata might not work correctly."
    );
  }
} catch (error) {
  console.error("Error creating URL for metadataBase:", error);
}

export const siteMetadata: Metadata = {
  //Set the base URL for resolving relative paths (like Open Graph images)
  metadataBase: metadataBase,

  title: "Gifinity | Find Fun GIFs & Stickers",
  description:
    "Search and explore millions of animated GIFs and stickers from the Giphy API. Find the perfect reaction, meme, or animation quickly and easily with our Next.js Giphy browser.", // Describe what the app does
  keywords: [
    "Giphy",
    "GIFs",
    "Stickers",
    "Animated Images",
    "Search GIFs",
    "Browse GIFs",
    "Find GIFs",
    "Reaction GIFs",
    "Memes",
    "Next.js",
    "TypeScript",
    "Giphy API",
    "Fun",
    "Animation",
  ],

  authors: [{ name: "Jakub Babelek", url: "https://github.com/Isuu1" }],
  creator: "Jakub Babelek",

  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }], //For iOS home screens
    other: [
      //For Android Chrome manifest, etc.
      {
        rel: "icon",
        url: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },

  // --- Open Graph (for Social Media Previews - Facebook, LinkedIn, etc.) ---
  openGraph: {
    title: "Gifinity | Find & Share Amazing GIFs",
    description:
      "Dive into the world of GIFs and Stickers! Search the vast Giphy library with this easy-to-use explorer built with Next.js.",
    url: baseUrl,
    siteName: "Gifinity",
    images: [
      {
        url: "/images/open-graph-preview.png",
        width: 1200,
        height: 630,
        alt: "Preview image showing the Gifinity interface with various GIFs",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // --- Twitter Card (for Twitter Previews) ---
  twitter: {
    card: "summary_large_image",
    title: "Gifinity | Your Gateway to Fun GIFs & Stickers",
    description:
      "Search, browse, and discover millions of GIFs and Stickers from Giphy using this fast Next.js app.",
    images: [
      baseUrl
        ? `${baseUrl}/images/open-graph-preview.png`
        : "/images/og-giphy-preview.png",
    ],
  },

  // --- Other Metadata ---
  robots: {
    //Instructions for web crawlers
    index: true, //Allow indexing by search engines
    follow: true, //Allow following links within the site
    googleBot: {
      //Specific instructions for Google's crawler
      index: true,
      follow: true,
      "max-video-preview": -1, //Allow maximum video preview length
      "max-image-preview": "large", //Allow large image previews
      "max-snippet": -1, //Allow maximum snippet length
    },
  },
  alternates: {
    // Provides the canonical URL for the page
    canonical: baseUrl,
  },
};
