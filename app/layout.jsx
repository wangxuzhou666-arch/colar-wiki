import "./globals.css";

export const metadata = {
  title: "Colar Wang - Colarpedia",
  description:
    "Colar Wang (Chinese: 王旭洲; born 2002) is a Chinese systems engineer, entrepreneur, and AI product researcher. Currently a Master's student in Systems Engineering at the University of Pennsylvania.",
  metadataBase: new URL("https://colar.wiki"),
  openGraph: {
    title: "Colar Wang - Colarpedia",
    description:
      "Systems engineer, AI product builder, founder of KitchenSurvivor and AgentConfig.",
    type: "profile",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Force the classic light Wikipedia palette regardless of OS theme.
            This prevents browsers from applying their automatic dark-mode
            color inversion to form controls and scrollbars. */}
        <meta name="color-scheme" content="light only" />
      </head>
      <body>{children}</body>
    </html>
  );
}
