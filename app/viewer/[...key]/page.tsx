import Link from "next/link";
import { notFound } from "next/navigation";
import { getSplatUrl } from "../../../lib/r2";

type ViewerPageProps = { params: Promise<{ key: string[] }> };

export default async function ViewerPage({ params }: ViewerPageProps) {
  const { key } = await params;
  if (!key.length || !key.join("/").toLowerCase().endsWith(".ply")) notFound();
  const objectKey = key.join("/");
  const source = await getSplatUrl(objectKey);
  return <main className="viewer-page"><Link href="/" className="back">← Back to library</Link><iframe title={`JARVIS viewer: ${objectKey}`} src={`/splat.html?url=${encodeURIComponent(source)}`} className="viewer" allow="fullscreen" /></main>;
}
