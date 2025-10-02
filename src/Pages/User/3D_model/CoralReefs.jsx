import React from 'react';
import '@google/model-viewer';

// ✅ Coral list
const coralList = [
  {
    name: 'Foliaceous Montipora',
    description: 'Foliaceous Montipora is a type of hard coral commonly found in the vibrant coral reefs of Hikkaduwa. Characterized by its leaf-like, plate-shaped structures, this coral forms thin, overlapping layers that resemble delicate underwater foliage. These foliaceous colonies create complex habitats and provide shelter for numerous small reef fish and invertebrates.In the clear, warm waters around Hikkaduwa, Foliaceous Montipora thrives on shallow reef slopes where sunlight penetrates easily, supporting its symbiotic relationship with photosynthetic algae called zooxanthellae. This coral plays an important role in building the reef structure, contributing to the reef’s resilience and biodiversity.',
    src: '3D_models/Corals/Foliaceous Montipora.glb'
  },
  {
    name: 'Brain Coral',
    description: 'Brain Coral is a prominent and easily recognizable hard coral found in the coral reefs of Hikkaduwa. Named for its grooved surface that resembles the folds of a human brain, this coral forms large, rounded, dome-shaped colonies that contribute significantly to the reef’s three-dimensional structure.In Hikkaduwa’s marine environment, Brain Coral provides essential habitat and shelter for a variety of reef fish, crustaceans, and other marine organisms. Its sturdy, compact formation helps protect the reef from strong waves and currents, enhancing the overall stability of the coral ecosystem.',
    src: '3D_models/Corals/braincoral.glb'
  },
  {
    name: 'Faviidae',
    description: 'Faviidae is a family of hard corals commonly found in the coral reefs around Hikkaduwa. Often referred to as “massive brain corals” or “star corals,” members of the Faviidae family are characterized by their thick, robust colonies with distinctive polygonal or star-shaped corallites (the skeletal cups that house the coral polyps).In the rich reef systems of Hikkaduwa, Faviidae corals contribute significantly to reef building and provide essential habitat complexity. Their dense, sturdy skeletons create shelter and breeding grounds for many reef fish and invertebrates, helping to maintain the reef’s biodiversity.',
    src: '3D_models/Corals/coral_head.glb'
  },
  {
    name: 'Staghorn Coral',
    description: 'Staghorn Coral (genus Acropora) is a fast-growing branching coral commonly found in the coral reefs of Hikkaduwa. Named for its antler-like shape, this coral forms dense thickets of slender, branching structures that provide important three-dimensional habitats for many reef fish and marine organisms.In the warm, clear waters of Hikkaduwa, Staghorn Coral thrives in shallow reef areas with good sunlight and water flow. Its rapid growth helps it quickly colonize damaged reef areas, playing a key role in reef recovery and resilience.',
    src: '3D_models/Corals/staghorn_coral.glb'
  },
  {
    name: 'Star Coral',
    description: 'Star Coral (commonly from the genus Montastraea or related genera) is a type of hard coral found in the coral reefs of Hikkaduwa. It is named for the star-shaped patterns formed by its coral polyps’ skeletal cups called corallites, which resemble tiny, glowing stars when viewed closely.In Hikkaduwa’s reef ecosystems, Star Coral forms massive, dome-shaped colonies that contribute significantly to reef-building and structural complexity. These colonies provide shelter and breeding grounds for a variety of reef fish, crustaceans, and other marine life.',
 
    src: '3D_models/Corals/star.glb'
  },
  {
    name: 'Elkhorn Coral',
    description: 'Elkhorn Coral (Acropora palmata) is a distinctive branching coral known for its large, flattened, antler-like branches that resemble elk horns. While Elkhorn Coral is more commonly associated with Caribbean reefs, similar branching corals of the Acropora genus with comparable shapes can be found in tropical Indo-Pacific regions like Sri Lanka, including the reefs around Hikkaduwa.In Hikkaduwa, these branching corals play an essential role in building complex reef structures that provide shelter and nursery habitats for many reef fish and marine organisms. Their extensive branches help reduce wave energy, protecting coastal areas from erosion.',
   
    src: '3D_models/Corals/elkhorn.glb'
  },
 {
  name: 'Table Coral',
  description: 'Table Coral is a striking hard coral commonly found in the coral reefs of Hikkaduwa. It forms flat, table-like structures that provide essential shelter for small reef fish and invertebrates. In Hikkaduwa Marine National Park, Table Corals play a crucial role in maintaining the reef’s structural complexity and supporting marine biodiversity.',
  src: '3D_models/Corals/Table.glb'
},
{
  name: 'Branching Coral',
  description: 'Branching Coral is a common type of hard coral found in the vibrant coral reefs of Hikkaduwa. Known for its tree-like branches, this coral provides vital habitats for reef fish and acts as a natural wave barrier. In Hikkaduwa, these corals are key indicators of reef health and are part of ongoing conservation and restoration projects.',
  src: '3D_models/Corals/branching.glb'
},
{
  name: 'Massive Coral',
  description: 'Massive Coral refers to a group of hard corals characterized by their large, dome-shaped colonies, often seen in the shallow reefs of Hikkaduwa. These slow-growing corals can live for centuries and are vital to reef stability. In Hikkaduwa, Massive Corals form the backbone of the reef ecosystem, offering shelter to a wide range of marine species.',
  src: '3D_models/Corals/massive.glb'
},
{
  name: 'Mushroom Coral',
  description: 'Mushroom Coral (family Fungiidae) is a unique free-living coral commonly found in the sandy and lagoon areas of Hikkaduwa’s coral reef. Unlike most corals, it lives unattached and can move slightly along the seabed. In Hikkaduwa, Mushroom Corals contribute to the reef’s biodiversity and help in sediment stabilization.',
  src: '3D_models/Corals/mushroom.glb'
},
{
  name: 'Digitate Coral',
  description: 'Digitate Coral (genus Porites) is a hard coral species commonly found in the coral reefs of Hikkaduwa, forming upright, finger-like projections. These corals are highly resilient to wave action and serve as vital habitats for small marine organisms. In Hikkaduwa, they are often seen in shallow reef zones and play a role in reef regeneration.',
  src: '3D_models/Corals/Digitate.glb'
},
{
  name: 'Encrusting Coral',
  description: 'Encrusting Coral is a hard coral type that grows flat over rocks and dead coral surfaces, forming a thin, crust-like layer. In Hikkaduwa’s reef ecosystem, these corals help bind and strengthen the reef structure, preventing erosion. They are often found in high-energy zones, adding stability and resilience to the Hikkaduwa coral reef.',
  src: '3D_models/Corals/enctrast.glb'
},
];

// ✅ CSS Styling
const styles = `
  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background-color: #f0f4f7;
  }

  /* 🌊 Attractive Navigation Bar */
  nav {
    background: linear-gradient(90deg, #013A63, #026873, #03A696);
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    position: sticky;
    top: 0;
    z-index: 1000;
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
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  nav a::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -5px;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background-color: white;
    transition: width 0.3s ease;
  }

  nav a:hover::after {
    width: 60%;
  }

  /* 🌸 Coral Section */
  .marine-life-section {
    padding: 40px 20px;
    max-width: 1400px;
    margin: 0 auto;
    text-align: center;
  }

  .marine-life-section h2 {
    color: #013A63;
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  .marine-life-section p.loading {
    color: #026873;
    font-size: 1.2rem;
    margin-bottom: 40px;
  }

  /* 🐠 Coral Cards Grid */
  .fish-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    margin-top: 30px;
  }

  @media (max-width: 1024px) {
    .fish-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 700px) {
    .fish-grid {
      grid-template-columns: 1fr;
    }
  }

  .fish-card {
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    padding: 25px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    min-height: 500px;
  }

  .fish-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
  }

  .fish-card h3 {
    color: #013A63;
    margin-top: 20px;
    margin-bottom: 15px;
    font-size: 1.4rem;
  }

  .fish-card p {
    text-align: justify;
    font-size: 1rem;
    line-height: 1.6;
    color: #444;
  }

  model-viewer {
    width: 100%;
    height: 300px;
    border-radius: 16px;
    background: linear-gradient(to bottom, #3DDAD7, #038C8C);
  }
`;

const CoralReefs = () => {
  return (
    <>
      <style>{styles}</style>

      {/* 🌊 Navigation Bar */}
      <nav>
        <a href="/virtualTour">Virtual Tour</a>
        <a href="/MarineLife">Marine Life</a>
        <a href="/CoralReefs">Coral Reefs</a>
        <a href="/">Home</a>
      </nav>

      {/* 🐠 Coral Cards Section */}
      <div className="marine-life-section">
        <h2>Explore the Fascinating Coral Reefs</h2>
        <p className="loading">Dive into the world of Coral Reefs!</p>

        <div className="fish-grid">
          {coralList.map((coral, index) => (
            <div className="fish-card" key={index}>
              <model-viewer
                src={coral.src}
                alt={coral.name}
                camera-controls
                auto-rotate
              ></model-viewer>
              <h3>{coral.name}</h3>
              <p>{coral.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CoralReefs;