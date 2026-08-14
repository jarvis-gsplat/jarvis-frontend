import { GetObjectCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";

const requiredEnvironment = ["R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET_NAME"] as const;

function getConfiguration() {
  const missing = requiredEnvironment.filter((name) => !process.env[name]);
  if (missing.length) throw new Error(`Missing R2 configuration: ${missing.join(", ")}`);
  return { bucket: process.env.R2_BUCKET_NAME!, prefix: process.env.R2_SPLAT_PREFIX ?? "" };
}

const client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "", secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "" },
});

export type Splat = { id: number; key: string; title: string; username: string; size: number };

export async function listSplats(): Promise<Splat[]> {
  const { bucket, prefix } = getConfiguration();
  const results: Splat[] = [];
  let continuationToken: string | undefined;
  do {
    const response = await client.send(new ListObjectsV2Command({ Bucket: bucket, Prefix: prefix, ContinuationToken: continuationToken }));
    for (const object of response.Contents ?? []) {
      if (!object.Key || !/\.ply$/i.test(object.Key)) continue;
      const relativeKey = object.Key.slice(prefix.length);
      // Splats are stored directly in the bucket root, not in user folders.
      if (relativeKey.includes("/")) continue;
      results.push({ id: 0, key: object.Key, title: relativeKey.replace(/\.ply$/i, "").replace(/[_-]+/g, " "), username: "community", size: object.Size ?? 0 });
    }
    continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined;
  } while (continuationToken);
  return results.sort((a, b) => a.title.localeCompare(b.title)).map((splat, index) => ({ ...splat, id: index + 1 }));
}

export async function getSplat(key: string) {
  const { bucket, prefix } = getConfiguration();
  if ((prefix && !key.startsWith(prefix)) || key.slice(prefix.length).includes("/") || !/\.ply$/i.test(key)) throw new Error("Invalid splat key");
  return client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
}
