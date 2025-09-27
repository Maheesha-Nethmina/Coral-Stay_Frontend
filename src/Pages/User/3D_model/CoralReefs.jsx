import React from 'react';
import '@google/model-viewer';

const coralList = [
  {
    name: 'Foliaceous Montipora',
    description: 'Foliaceous Montipora is a type of hard coral commonly found in the vibrant coral reefs of Hikkaduwa. Characterized by its leaf-like, plate-shaped structures, this coral forms thin, overlapping layers that resemble delicate underwater foliage. These foliaceous colonies create complex habitats and provide shelter for numerous small reef fish and invertebrates.In the clear, warm waters around Hikkaduwa, Foliaceous Montipora thrives on shallow reef slopes where sunlight penetrates easily, supporting its symbiotic relationship with photosynthetic algae called zooxanthellae. This coral plays an important role in building the reef structure, contributing to the reef’s resilience and biodiversity.',
    src: 'Corals/Foliaceous Montipora.glb'
  },
  {
    name: 'Brain Coral',
    description: 'Brain Coral is a prominent and easily recognizable hard coral found in the coral reefs of Hikkaduwa. Named for its grooved surface that resembles the folds of a human brain, this coral forms large, rounded, dome-shaped colonies that contribute significantly to the reef’s three-dimensional structure.In Hikkaduwa’s marine environment, Brain Coral provides essential habitat and shelter for a variety of reef fish, crustaceans, and other marine organisms. Its sturdy, compact formation helps protect the reef from strong waves and currents, enhancing the overall stability of the coral ecosystem.',
    src: 'Corals/Brain_Coral.glb'
  },
  {
    name: 'Faviidae',
    description: 'Faviidae is a family of hard corals commonly found in the coral reefs around Hikkaduwa. Often referred to as “massive brain corals” or “star corals,” members of the Faviidae family are characterized by their thick, robust colonies with distinctive polygonal or star-shaped corallites (the skeletal cups that house the coral polyps).In the rich reef systems of Hikkaduwa, Faviidae corals contribute significantly to reef building and provide essential habitat complexity. Their dense, sturdy skeletons create shelter and breeding grounds for many reef fish and invertebrates, helping to maintain the reef’s biodiversity.',
    src: 'Corals/Faviidae.glb'
  },
  {
    name: 'staghorn_coral',
    description: 'Staghorn Coral (genus Acropora) is a fast-growing branching coral commonly found in the coral reefs of Hikkaduwa. Named for its antler-like shape, this coral forms dense thickets of slender, branching structures that provide important three-dimensional habitats for many reef fish and marine organisms.In the warm, clear waters of Hikkaduwa, Staghorn Coral thrives in shallow reef areas with good sunlight and water flow. Its rapid growth helps it quickly colonize damaged reef areas, playing a key role in reef recovery and resilience.',
    src: 'Corals/staghorn_coral.glb'
  },
  {
    name: 'Star coral',
    description: 'Star Coral (commonly from the genus Montastraea or related genera) is a type of hard coral found in the coral reefs of Hikkaduwa. It is named for the star-shaped patterns formed by its coral polyps’ skeletal cups called corallites, which resemble tiny, glowing stars when viewed closely.In Hikkaduwa’s reef ecosystems, Star Coral forms massive, dome-shaped colonies that contribute significantly to reef-building and structural complexity. These colonies provide shelter and breeding grounds for a variety of reef fish, crustaceans, and other marine life.',
    src: 'Corals/star_coral.glb'
  },
  {
    name: 'Elkhorn coral',
    description: 'Elkhorn Coral (Acropora palmata) is a distinctive branching coral known for its large, flattened, antler-like branches that resemble elk horns. While Elkhorn Coral is more commonly associated with Caribbean reefs, similar branching corals of the Acropora genus with comparable shapes can be found in tropical Indo-Pacific regions like Sri Lanka, including the reefs around Hikkaduwa.In Hikkaduwa, these branching corals play an essential role in building complex reef structures that provide shelter and nursery habitats for many reef fish and marine organisms. Their extensive branches help reduce wave energy, protecting coastal areas from erosion.',
    src: 'Corals/elkhorn_coral.glb'
  },
  {
    name: 'Table Coral',
    description: 'Table Coral (mostly from the genus Acropora) is a striking hard coral commonly found in the coral reefs of Hikkaduwa. It is named for its distinctive flat, table-like growth form with broad, horizontal branches that spread out like a tabletop or umbrella.In the clear, shallow waters around Hikkaduwa, Table Coral creates extensive, layered platforms that provide important habitats and shelter for a variety of reef fish, invertebrates, and other marine life. Its large surface area maximizes sunlight exposure, which benefits its symbiotic algae, zooxanthellae, helping the coral thrive through photosynthesis.',
    src: 'Corals/Table.glb'
  },
  {
    name: 'Branching Coral',
    description: 'Branching Coral is a common type of hard coral found in the vibrant coral reefs of Hikkaduwa. As the name suggests, it grows in tree-like structures with numerous slender branches extending upward and outward, resembling underwater shrubs or small trees. This coral provides crucial three-dimensional habitat complexity, creating shelter and breeding grounds for a wide variety of reef fish, crustaceans, and other marine organisms. The intricate branches help protect smaller creatures from predators and strong currents.',
    src: 'Corals/branching.glb'
  },
  {
    name: 'Massive Coral',
    description: 'Massive Coral refers to a group of hard corals characterized by their large, bulky, and dome-shaped colonies. These corals grow slowly but form dense, solid structures that are vital for reef stability and strength. In Hikkaduwa, Massive Corals are important reef builders, providing a sturdy foundation for the coral ecosystem. Their thick skeletons offer shelter and protection for many reef organisms, including fish, crustaceans, and other invertebrates. These corals can withstand strong wave action better than more delicate types, helping to buffer coastal areas from erosion.',
    src: 'Corals/massive_coral.glb'
  },
  {
    name: 'Mashroom Coral',
    description: 'Mushroom Coral (family Fungiidae) is a unique type of hard coral commonly found in the coral reefs of Hikkaduwa. Unlike many corals that form colonies, Mushroom Corals are usually solitary, free-living corals that resemble the shape of a mushroom cap lying flat on the reef substrate. These corals have a round, dome-like shape with ridges and grooves radiating from the center, giving them a distinctive appearance. Mushroom Corals often move slightly by inflating and deflating their tissues, allowing them to reposition on the reef.',
    src: 'Corals/mushroom_coral.glb'
  },
  {
    name: 'Digitate Coral',
    description: 'Digitate Coral (genus Porites) is a type of hard coral commonly found in the coral reefs of Hikkaduwa. The name “digitate” refers to its finger-like, upright branches that grow vertically from a solid base, resembling outstretched digits or fingers. This coral plays an important role in reef formation by creating dense, sturdy thickets that provide shelter and habitat for a variety of reef fish, invertebrates, and other marine organisms. Its robust structure helps protect the reef from strong waves and currents.',
    src: 'Corals/Digitate.glb'
  },

{
    name: 'Encrusting Coral',
    description: 'Encrusting Coral is a type of hard coral commonly found in the coral reefs of Hikkaduwa. Unlike branching or massive corals, encrusting corals grow as thin, spreading layers that tightly adhere to the surface of rocks, dead coral skeletons, or other hard substrates, forming a crust-like covering. This growth form allows encrusting corals to effectively colonize and stabilize reef surfaces, helping to bind the reef structure together. They often serve as a base for other coral species to grow on and play a key role in reef regeneration and recovery after disturbances.',
    src: 'Corals/EncrustingCoral.glb'
  }

  // Add more fish objects if needed
];

const CoralReefs = () => {
  return (
    <div className="marine-life-section">
      <h2>Explore the Facinating Coral Reefs</h2>
      <p className="loading">Dive into the world of Coral reef!</p>
      <div className="fish-grid">
        {coralList.map((coral, index) => (
          <div className="fish-card" key={index}>
            <model-viewer
              src={coral.src}
              alt={coral.name}
              camera-controls
              auto-rotate
              style={{ width: '100%', height: '250px', borderRadius: '8px', background: 'linear-gradient(to bottom, #3DDAD7, #038C8C)' }}
            ></model-viewer>
            <h3>{coral.name}</h3>
            <p style={{
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: '1.6',
  color: '#444',
  fontFamily: '"Poppins", sans-serif',
  marginTop: '10px'
}}>{coral.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoralReefs;
