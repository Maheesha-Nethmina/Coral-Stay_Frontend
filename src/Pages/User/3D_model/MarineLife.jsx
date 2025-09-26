import React from 'react';
import '@google/model-viewer';


const fishList = [
  {
    name: 'Butterfly Fish',
    description: 'The Butterfly Fish is a colorful and eye-catching species commonly seen in the coral reefs of Hikkaduwa. With its bright yellow body, striking patterns, and distinct black markings near the eyes, it is a favorite among snorkelers and divers. These fish are usually found swimming in pairs around the shallow reef areas, feeding on coral polyps and small invertebrates. In Hikkaduwa’s clear waters, the Butterfly Fish adds vibrant beauty to the thriving marine ecosystem, making it a delightful sight for anyone exploring the reef.',
    src: '/fishes/fish.glb'
  },
  {
    name: 'Angel Fish',
    description: 'The Angel Fish is a graceful and vibrant species often spotted in the coral reefs of Hikkaduwa. Known for its striking colors and elegant, disk-shaped body, it glides smoothly through the reef, creating a stunning underwater display. Angel Fish are commonly seen near coral formations, feeding on small invertebrates, algae, and sponges. In Hikkaduwa’s warm tropical waters, they are a highlight for divers and snorkelers, adding charm and beauty to the rich marine life of the area.',
    src: '/fishes/angelfish.glb'
  },
  {
    name: 'Blacktip Reef Shark',
    description: 'The Blacktip Reef Shark is a sleek and agile predator frequently seen in the shallow waters of Hikkaduwa’s coral reefs. Recognizable by the distinct black tips on its dorsal and tail fins, this shark is generally harmless to humans and often glides gracefully near the reef edge in search of small fish and crustaceans. In Hikkaduwa, snorkelers and divers may spot them cruising in clear waters, contributing to the area’s healthy marine ecosystem and offering an exciting yet safe encounter with one of the ocean’s most fascinating species.',
    src: '/fishes/blacktip_reef_shark.glb'
  },
  // ... (you can keep the rest of the fishList as is)
];

const MarineLife = () => {
  return (
    <>
      {/* ✅ Embedded CSS */}
      <style>{`
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
        .marine-life-section {
          padding: 20px;
          display: block;
        }
        .marine-life-section h2 {
          text-align: center;
          color: #013A63;
          font-size: 2rem;
          margin-top: 10px;
        }
        .fish-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .fish-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          padding: 16px;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .fish-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 14px rgba(0,0,0,0.15);
        }
        .fish-card h3 {
          margin: 10px 0 5px;
          color: #013A63;
        }
        .fish-card p {
          font-size: 14px;
          color: #555;
          line-height: 1.6;
        }
        .loading {
          text-align: center;
          color: #026873;
          font-size: 1.2rem;
          margin-top: 10px;
        }
      `}</style>

      {/* ✅ Navigation Bar */}
      <nav>
        <a href="/">Home</a>
        <a href="/marine-life">Marine Life</a>
        <a href="/3d-coral">3D Coral Model</a>
        <a href="/contact">Contact</a>
      </nav>

      {/* ✅ Marine Life Section */}
      <div className="marine-life-section">
        <h2>Explore Marine Life</h2>
        <p className="loading">Dive into the world of fascinating marine creatures!</p>

        <div className="fish-grid">
          {fishList.map((fish, index) => (
            <div className="fish-card" key={index}>
              <model-viewer
                src={fish.src}
                alt={fish.name}
                camera-controls
                auto-rotate
                style={{
                  width: '100%',
                  height: '250px',
                  borderRadius: '8px',
                  background: 'linear-gradient(to bottom, #3DDAD7, #038C8C)'
                }}
              ></model-viewer>
              <h3>{fish.name}</h3>
              <p>{fish.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MarineLife;
