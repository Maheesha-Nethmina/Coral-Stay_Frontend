import React, { useEffect, useRef, useState } from 'react';
import '@google/model-viewer/dist/model-viewer';

// ✅ Add CSS styles inside the same file
const styles = `
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
  }

  nav {
    background: linear-gradient(to right, #013A63, #026873);
    color: white;
    padding: 1rem;
    display: flex;
    gap: 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }

  nav a {
    color: white;
    text-decoration: none;
    padding: 5px 10px;
    border-radius: 4px;
    transition: background-color 0.3s;
    cursor: pointer;
  }

  nav a:hover {
    background-color: rgba(255,255,255,0.2);
  }

  #fish-tooltip {
    position: absolute;
    background: rgba(0,0,0,0.8);
    color: white;
    padding: 8px 15px;
    border-radius: 6px;
    pointer-events: none;
    display: none;
    font-size: 16px;
    z-index: 100;
    transform: translate(10px, 10px);
    animation: fadeIn 0.2s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translate(10px, 0); }
    to { opacity: 1; transform: translate(10px, 10px); }
  }

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 18px;
  }

  .marine-life-section {
    padding: 20px;
    display: block;
  }

  .fish-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  @media (min-width: 1024px) {
    .fish-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .fish-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    padding: 16px;
    text-align: center;
  }

  .fish-card h3 {
    margin: 10px 0 5px;
    color: #013A63;
  }

  .fish-card p {
    font-size: 14px;
    color: #555;
  }
`;

const ModelViewer = () => {
  const viewerRef = useRef(null);
  const tooltipRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // ✅ Function to show tooltip
  const showTooltip = (name, x, y) => {
    const tooltip = tooltipRef.current;
    tooltip.textContent = name;
    tooltip.style.display = 'block';
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;

    setTimeout(() => {
      tooltip.style.display = 'none';
    }, 3000);
  };

  // ✅ Hit test logic
  useEffect(() => {
    const viewer = viewerRef.current;

    const handleModelClick = async (event) => {
      const rect = viewer.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const normalizedX = (x / rect.width) * 2 - 1;
      const normalizedY = -(y / rect.height) * 2 + 1;

      try {
        const hit = await viewer.hitTest(normalizedX, normalizedY);
        if (hit) {
          const name = hit.nodeName || "Unknown Fish";
          showTooltip(name, event.clientX, event.clientY);
        }
      } catch (err) {
        console.error("Hit test error:", err);
      }
    };

    viewer.addEventListener('load', () => setIsLoaded(true));
    viewer.addEventListener('click', handleModelClick);

    return () => {
      viewer.removeEventListener('click', handleModelClick);
    };
  }, []);

  return (
    <>
      {/* ✅ Inject CSS into the page */}
      <style>{styles}</style>

      {/* ✅ Navigation bar */}
      <nav>
        <a href="/virtualTour">Virtual Tour</a>
        <a href="/MarineLife">Marine Life</a>
        <a href="/CoralReefs">Coral Reefs</a>
        <a href="/">Home</a>
      </nav>

      {/* ✅ 3D Model Viewer */}
      <div className="model-container" style={{ position: "relative" }}>
        {!isLoaded && <div className="loading">Loading 3D Model...</div>}
        <model-viewer
          ref={viewerRef}
          src="3D_models/model.glb"
          alt="3D Fish"
          camera-controls
          auto-rotate
          camera-orbit="0deg 75deg 50%"
          field-of-view="20deg"
          style={{
            width: '100%',
            height: '100vh',
            background: 'linear-gradient(to bottom, #3DDAD7, #038C8C, #026873, #013A63)'
          }}
        />
        <div id="fish-tooltip" ref={tooltipRef}></div>
      </div>

      {/* ✅ Optional section below model */}
      {/* <section className="marine-life-section">
        <h2>Explore Marine Life</h2>
        <div className="fish-grid">
          <div className="fish-card">
            <h3>Clownfish</h3>
            <p>Lives among sea anemones in warm ocean waters.</p>
          </div>
          <div className="fish-card">
            <h3>Blue Tang</h3>
            <p>Popular reef fish with vibrant blue coloring.</p>
          </div>
          <div className="fish-card">
            <h3>Butterfly Fish</h3>
            <p>Recognized by their striking colors and patterns.</p>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default ModelViewer;
