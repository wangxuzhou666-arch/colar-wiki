"use client";

// Root → canonical article. Client component redirect, so we don't need
// next.config redirects() (which is unsupported under output:'export').
import { useEffect } from "react";

export default function RootRedirect() {
  useEffect(() => {
    window.location.replace("/wiki/Colar_Wang/");
  }, []);
  return (
    <div style={{ fontFamily: "Georgia, serif", padding: 24 }}>
      <p>
        Redirecting to <a href="/wiki/Colar_Wang/">/wiki/Colar_Wang</a>…
      </p>
    </div>
  );
}
