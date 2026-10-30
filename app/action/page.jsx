import ComicExperience from "@/components/action/ComicExperience";
import { wikiHtml } from "@/lib/action/wiki-content";
import { shareMetadata } from "@/lib/action/share";

// 根布局的 openGraph 是 profile 类型的 Colarpedia 文案；不在这里覆盖的话，
// 分享 /action/ 时预览会显示 wiki 的标题。
export const metadata = shareMetadata("/action/");

export default function ActionPage() {
  return <ComicExperience wikiHtml={wikiHtml} />;
}
