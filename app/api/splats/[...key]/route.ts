import { Readable } from "node:stream";
import { getSplat } from "../../../../lib/r2";

export const runtime = "nodejs";
type RouteContext = { params: Promise<{ key: string[] }> };

export async function GET(_request: Request, { params }: RouteContext) {
  const { key } = await params;
  const objectKey = key.join("/");
  if (!objectKey.toLowerCase().endsWith(".ply")) return new Response("Not found", { status: 404 });
  try {
    const object = await getSplat(objectKey);
    if (!object.Body) return new Response("Not found", { status: 404 });
    const body = Readable.toWeb(object.Body as Readable) as ReadableStream;
    const headers = new Headers({ "Content-Type": object.ContentType ?? "application/octet-stream", "Cache-Control": "private, max-age=0, s-maxage=3600" });
    if (object.ContentLength !== undefined) headers.set("Content-Length", String(object.ContentLength));
    return new Response(body, { headers });
  } catch (error) {
    console.error("Unable to retrieve R2 splat", error);
    return new Response("Splat not found", { status: 404 });
  }
}
