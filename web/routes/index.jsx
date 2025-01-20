import { useState, useEffect, useRef } from "react";
import { api } from "../api";
import React from "react";
import Button from "../assets/button.jsx";
import JarvisBanner from "../assets/jarvis.gif";

export default function () {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState([]); // Store all results for search
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current result index
  const [allResults, setAllResults] = useState([]); // Store all splats for "Explore More"
  const searchBarRef = useRef(null); // Reference for the search bar
  const buttonsRef = useRef(null); // Reference for the Previous/Next buttons
  const communityRef = useRef(null); // Reference for the community section
  const cardRef = useRef(null); // Reference for the main card

  const handleGetSplat = async () => {
    try {
      let response;

      // Check if input is numeric to decide the API method
      if (/^\d+$/.test(inputValue)) {
        response = await api.getSplatByID({
          splat_id: parseInt(inputValue, 10),
        });
      } else {
        response = await api.getSplatByUsername({
          username: inputValue.toLowerCase(),
        });
      }

      if (!response || response.length === 0) {
        throw new Error("No splat found");
      }

      setResults(response); // Store all results
      setCurrentIndex(0); // Reset to the first result

      if (searchBarRef.current) {
        searchBarRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    } catch (error) {
      console.error("Error fetching splat:", error);
      setResults([]); // Clear results on error
      setCurrentIndex(0); // Reset index
    }
  };

  const handleNext = () => {
    if (currentIndex < results.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleExploreMore = async () => {
    try {
      const response = await api.getAllSplats();
      setAllResults(response);
    } catch (error) {
      console.error("Error fetching all splats:", error);
    }
  };

  const currentResult = results[currentIndex];

  useEffect(() => {
    handleExploreMore(); // Fetch all splats on component mount
  }, []);

  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src={JarvisBanner}
          alt="Jarvis Banner"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
        <p className="tagline">
          Capture and visualize life's moments in realtime 3D, powered by{" "}
          <a target="_blank" href="https://dorahacks.io/buidl/21579" className="tagline">GPU-trained gaussian splatting models!
          </a>
        </p>

      </div>

      <div ref={searchBarRef} className="app-link">
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter SplatID/Username"
            className="input-field"
          />
          <button
            onClick={handleGetSplat}
            className="search-icon-button"
            aria-label="Search"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      {currentResult && (
        <div
          className="card"
          style={{
            cursor: "pointer",
            position: "relative",
            margin: "20px auto",
            width: "300px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            className="card-header"
            style={{
              padding: "10px 10px 5px 10px",
              textAlign: "center",
            }}
          >
            <h2 style={{ margin: "0 0 5px 0" }}>{currentResult.title}</h2>
            <p style={{ margin: "0" }}>
              <strong>Splat ID:</strong> {currentResult.id}
            </p>
            <p style={{ margin: "0" }}>
              <strong>Username:</strong> {currentResult.username}
            </p>
          </div>
          <div
            className="card-body"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "5px 10px",
              position: "relative",
            }}
          >
            <img
              src={currentResult.img}
              alt="Splat Image"
              style={{
                width: "100%",
                maxWidth: "250px",
                borderRadius: "8px",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "15px",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                borderRadius: "50%",
                padding: "8px",
                cursor: "pointer",
              }}
            >
              <a
                href={`/splat.html?url=${currentResult.url}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "inherit", fontSize: "20px" }}
              >
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div ref={buttonsRef} style={{ marginBottom: "10px" }}>
          <p className="logo">
            Showing result {currentIndex + 1} of {results.length}
          </p>
          <div>
            <Button
              text="Previous"
              effectType="effect1"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            />
            <Button
              text="Next"
              effectType="effect1"
              onClick={handleNext}
              disabled={currentIndex === results.length - 1}
            />
          </div>
        </div>
      )}

      {/* Explore More Section */}
      <div
        ref={communityRef}
        style={{
          marginTop: "20px", // Adjusted margin to reduce the space
          textAlign: "center",
        }}
      >
        <h2 className="subtitle">See what our community is building!</h2>
        <div
          className="card-container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {allResults.map((splat) => (
            <div
              key={splat.id}
              className="card"
              style={{
                margin: "10px",
                width: "250px",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <div className="card-header">
                <h3>{splat.title}</h3>
                <p>
                  <strong>Splat ID:</strong> {splat.id}
                </p>
                <p>
                  <strong>Username:</strong> {splat.username}
                </p>
              </div>
              <div
                className="card-body"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <img
                  src={splat.img}
                  alt="Splat Image"
                  style={{
                    width: "100%",
                    maxWidth: "200px",
                    borderRadius: "8px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    borderRadius: "50%",
                    padding: "8px",
                    cursor: "pointer",
                  }}
                >
                  <a
                    href={`/splat.html?url=${splat.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "inherit", fontSize: "20px" }}
                  >
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
