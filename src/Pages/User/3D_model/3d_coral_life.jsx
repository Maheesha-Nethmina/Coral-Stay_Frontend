import React, { useEffect, useRef, useState } from 'react';

// ✅ Add CSS styles inside the same file
const styles = `
  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background-color: #f0f0f0;
  }

  /* ✅ Enhanced Navbar Styling */
  nav {
    background: linear-gradient(90deg, #013A63, #026873, #03A696);
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    position: sticky;
    top: 0;
    z-index: 999;
    backdrop-filter: blur(10px);
  }

  nav a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
    position: relative;
  }

  nav a:hover {
    background-color: rgba(255,255,255,0.15);
    transform: translateY(-2px);
  }

  nav a::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -6px;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background-color: white;
    transition: width 0.3s ease;
  }

  nav a:hover::after {
    width: 60%;
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
`;

const ModelViewer = () => {
  const viewerRef = useRef(null);
  const tooltipRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // ✅ Function to show tooltip
 // ✅ Function to show tooltip
const showTooltip = (name, x, y) => {
  const tooltip = tooltipRef.current;
  tooltip.textContent = name;
  tooltip.style.display = 'block';
  tooltip.style.left = `${x}px`;   // ✅ fixed
  tooltip.style.top = `${y}px`;    // ✅ fixed

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
    </>
  );
};

export default ModelViewer;