import RootRedirect from "@/components/RootRedirect";
import { shareMetadata } from "@/lib/action/share";

// Server component so the root can export the comic page's link-preview
// metadata; the redirect itself lives in the client component.
export const metadata = shareMetadata("/");

export default function RootPage() {
  return <RootRedirect />;
}
