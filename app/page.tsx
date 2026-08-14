import { listSplats } from "../lib/r2";
import SplatLibrary from "./splat-library";

export const revalidate = 60;

export default async function Home() {
  try { return <SplatLibrary splats={await listSplats()} />; }
  catch (error) { console.error("Unable to load R2 splats", error); return <SplatLibrary splats={[]} configurationError />; }
}
