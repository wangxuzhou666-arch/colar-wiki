"use client";

// Root → comic landing page (/action/); the wiki stays one click away via
// its SERIOUS mode and header link. Client component redirect, so we don't
// need next.config redirects() (which is unsupported under output:'export').
import { useEffect } from "react";

export default function RootRedirect() {
  useEffect(() => {
    window.location.replace("/action/");
  }, []);
  return (
    <div style={{ fontFamily: "Georgia, serif", padding: 24 }}>
      <p>
        Redirecting to <a href="/action/">Colar in Action</a>… or read the{" "}
        <a href="/wiki/Colar_Wang/">wiki</a>.
      </p>
    </div>
  );
}
