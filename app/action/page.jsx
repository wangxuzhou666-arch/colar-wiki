import ComicExperience from "@/components/action/ComicExperience";
import { wikiHtml } from "@/lib/action/wiki-content";

const TITLE = "Colar in Action — Curiosity. Unleashed.";
const DESCRIPTION =
  "Step into Colar’s world of study, products, cooking and everyday adventures.";

// 根布局的 openGraph 是 profile 类型的 Colarpedia 文案；不在这里覆盖的话，
// 分享 /action/ 时预览会显示 wiki 的标题。
export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
};

export default function ActionPage() {
  return <ComicExperience wikiHtml={wikiHtml} />;
}
