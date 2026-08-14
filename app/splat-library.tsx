"use client";

import { useMemo, useState } from "react";
import type { Splat } from "../lib/r2";

type Props = { splats: Splat[]; configurationError?: boolean };
const viewerUrl = (key: string) => `/viewer/${key.split("/").map(encodeURIComponent).join("/")}`;

function SplatCard({ splat, large = false }: { splat: Splat; large?: boolean }) {
  return <div className="card" style={{ cursor: "pointer", position: "relative", margin: large ? "20px auto" : "10px", width: large ? "300px" : "250px" }}><div className="card-header"><h3>{splat.title}</h3><p><strong>Splat ID:</strong> {splat.id}</p><p><strong>Username:</strong> {splat.username}</p></div><div className="card-body"><img src="/default-background.svg" alt="Splat preview" style={{ width: "100%", maxWidth: large ? "250px" : "200px", borderRadius: "8px" }} /><a className="viewer-link" href={viewerUrl(splat.key)} target="_blank" rel="noopener noreferrer" aria-label={`Open ${splat.title} viewer`}>↗</a></div></div>;
}

export default function SplatLibrary({ splats, configurationError = false }: Props) {
  const [inputValue, setInputValue] = useState(""); const [results, setResults] = useState<Splat[]>([]); const [currentIndex, setCurrentIndex] = useState(0); const currentResult = results[currentIndex];
  const matches = useMemo(() => { const query = inputValue.trim().toLowerCase(); return !query ? [] : splats.filter((splat) => String(splat.id) === query || splat.title.toLowerCase().includes(query)); }, [inputValue, splats]);
  const search = () => { setResults(matches); setCurrentIndex(0); };
  return <><header className="header"><a href="/" className="logo-link"><div className="logo">jarvis</div></a><div className="header-content"><a href="https://dorahacks.io/buidl/21579" className="logo-link" target="_blank" rel="noopener noreferrer">about</a></div></header><div className="app"><div className="app-content"><main className="main"><div className="banner"><img src="/jarvis.gif" alt="Jarvis Banner" /><p className="tagline">Capture and visualize life&apos;s moments in realtime 3D, powered by <a target="_blank" href="https://dorahacks.io/buidl/21579">GPU-trained gaussian splatting models!</a></p></div><div className="app-link"><div className="input-container"><input type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} onKeyDown={(event) => event.key === "Enter" && search()} placeholder="Enter SplatID" className="input-field" /><button onClick={search} className="search-icon-button" aria-label="Search">⌕</button></div></div>{inputValue && !currentResult && <p className="logo">No splat found</p>}{currentResult && <SplatCard splat={currentResult} large />}{results.length > 0 && <div style={{ marginBottom: "10px" }}><p className="logo">Showing result {currentIndex + 1} of {results.length}</p><div><button className="nav-button" onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))} disabled={currentIndex === 0}>Previous</button><button className="nav-button" onClick={() => setCurrentIndex((index) => Math.min(results.length - 1, index + 1))} disabled={currentIndex === results.length - 1}>Next</button></div></div>}<div className="community"><h2 className="subtitle">See what our community is building!</h2>{configurationError ? <p className="tagline">Add your R2 settings to load scenes.</p> : <div className="card-container">{splats.map((splat) => <SplatCard key={splat.key} splat={splat} />)}</div>}</div></main></div></div></>;
}
