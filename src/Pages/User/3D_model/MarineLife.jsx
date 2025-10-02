import React from "react";
import "@google/model-viewer";

const fishList = [
  {
    name: 'Butterfly Fish',
    description: 'The Butterfly Fish is a colorful and eye-catching species commonly seen in the coral reefs of Hikkaduwa. With its bright yellow body, striking patterns, and distinct black markings near the eyes, it is a favorite among snorkelers and divers. These fish are usually found swimming in pairs around the shallow reef areas, feeding on coral polyps and small invertebrates. In Hikkaduwa’s clear waters, the Butterfly Fish adds vibrant beauty to the thriving marine ecosystem, making it a delightful sight for anyone exploring the reef.',
    src: '3D_models/fishes/fish.glb'
  },
  {
    name: 'Angel Fish',
    description: 'The Angel Fish is a graceful and vibrant species often spotted in the coral reefs of Hikkaduwa. Known for its striking colors and elegant, disk-shaped body, it glides smoothly through the reef, creating a stunning underwater display. Angel Fish are commonly seen near coral formations, feeding on small invertebrates, algae, and sponges. In Hikkaduwa’s warm tropical waters, they are a highlight for divers and snorkelers, adding charm and beauty to the rich marine life of the area.',
    src: '3D_models/fishes/angelfish.glb'
  },
  {
    name: 'Blacktip Reef Shark',
    description: 'The Blacktip Reef Shark is a sleek and agile predator frequently seen in the shallow waters of Hikkaduwa’s coral reefs. Recognizable by the distinct black tips on its dorsal and tail fins, this shark is generally harmless to humans and often glides gracefully near the reef edge in search of small fish and crustaceans. In Hikkaduwa, snorkelers and divers may spot them cruising in clear waters, contributing to the area’s healthy marine ecosystem and offering an exciting yet safe encounter with one of the ocean’s most fascinating species.',
    src: '3D_models/fishes/blacktip_reef_shark.glb'
  },
  {
    name: 'Blue Angle Fish',
    description: 'The blue angelfish is a vibrant marine fish known for its striking blue body and yellow highlights, often with a hint of green. Native to the western Atlantic, especially around the Caribbean and Gulf of Mexico, it inhabits coral reefs and rocky areas. These fish can grow up to about 45 cm (18 in) and feed on sponges, algae, and small invertebrates. Juveniles have different patterns—usually with vertical blue and yellow stripes—that change as they mature. Blue angelfish are important reef dwellers but are also highly sought after in the aquarium trade for their beauty.',
    src: '3D_models/fishes/blue_angelfish.glb'
  },
  {
    name: 'Moorish Idol',
    description: 'The Moorish Idol is a strikingly beautiful fish found in the coral reefs of Hikkaduwa, easily recognized by its long, trailing dorsal fin and bold black, white, and yellow stripes. It is often seen swimming in pairs or small groups near reef edges, feeding on sponges, coral polyps, and other small invertebrates. In Hikkaduwa’s clear tropical waters, the Moorish Idol’s graceful movements and vibrant colors make it a favorite sight among divers and snorkelers, adding elegance and charm to the reef’s rich marine life.',
    src: '3D_models/fishes/9026105871bd49069936b6ac569e5c85.glb'
  },
  {
    name: 'bamboo leaf wrasse',
    description: 'The Bamboo Leaf Wrasse is a slender and colorful fish commonly found in the coral reefs of Hikkaduwa. Named for its leaf-like shape and delicate movements, it blends well with the surrounding sea vegetation and coral. This wrasse feeds on small invertebrates and plays an important role in keeping the reef ecosystem balanced. In Hikkaduwa’s vibrant underwater world, the Bamboo Leaf Wrasse adds subtle beauty and is often spotted by attentive snorkelers exploring the reef’s diverse marine life.',
    src: '3D_models/fishes/cc0____bambooleaf_wrasse_p._sieboldi.glb'
  },
  {
    name: 'Snooty wrasse',
    description: 'The Snooty Wrasse is a vibrant and lively fish often found in the coral reefs around Hikkaduwa. Known for its bright colors and distinctive facial features, this wrasse is active during the day, feeding on small invertebrates and crustaceans hidden among the coral. It plays an important role in maintaining the health of the reef by controlling populations of smaller creatures. In the clear waters of Hikkaduwa, the Snooty Wrasse is a charming and colorful part of the rich marine biodiversity that attracts divers and snorkelers alike.',
    src: '3D_models/fishes/cc0___snooty_wrasse_bodianus_oxycephalus.glb'
  },
  {
    name: 'Golden Cuttlefish',
    description: 'The Golden Cuttlefish is a fascinating marine creature often seen in the waters around Hikkaduwa. Known for its unique ability to change colors and patterns, it uses this skill for camouflage and communication. With its broad, flattened body and distinctive cuttlebone inside, the Golden Cuttlefish moves gracefully along the reef and sandy seabeds. It feeds on small fish, crustaceans, and mollusks, making it an important predator in the local ecosystem. In Hikkaduwa’s vibrant marine environment, spotting a Golden Cuttlefish is a special experience for divers and underwater enthusiasts.',
    src: '3D_models/fishes/cc0__golden_cuttlefish_sepia_esculenta.glb'
  },
  {
    name: 'Sea Turtle',
    description: 'The Sea Turtle is a gentle and iconic marine species frequently spotted in the waters around Hikkaduwa. Known for its slow, graceful movements and hard protective shell, it often glides calmly near coral reefs and seagrass beds. Sea Turtles feed on a variety of marine plants and small animals, helping to maintain the balance of the underwater ecosystem. In Hikkaduwa, these turtles are a favorite sight for snorkelers and divers, symbolizing the areas rich biodiversity and the importance of marine conservation.',
    src: '3D_models/fishes/sea_turtle_lowpoly_animated.glb'
  },
  {
    name: 'Seahorse',
    description: 'The Seahorse is a small and delicate marine fish often found in the shallow waters and coral reefs of Hikkaduwa. Recognizable by its horse-like head and curled tail, it moves slowly while clinging to sea grasses or coral with its tail. Seahorses feed on tiny plankton and small crustaceans, playing a subtle but important role in the reef ecosystem. In Hikkaduwa’s clear waters, spotting a seahorse is a special treat for divers and snorkelers, highlighting the diversity and uniqueness of the local marine life.',
    src: '3D_models/fishes/seahorse.glb'
  },
  {
    name: 'Tiger Prawns',
    description: 'Tiger Prawns are large, striking crustaceans commonly found in the coastal waters near Hikkaduwa. Known for their distinctive striped shells that resemble a tiger’s pattern, these prawns thrive in the warm, shallow waters and seagrass beds of the region. They play a vital role in the marine ecosystem as both predators and prey, feeding on smaller organisms while also serving as food for larger fish and sea creatures. In Hikkaduwa, tiger prawns are not only important ecologically but also contribute to the local fishing industry, making them a familiar and valuable species in the area.',
    src: '3D_models/fishes/tiger_prawns_anil.glb'
  },

   {
    name: 'Parrot Fish',
    description: 'The Parrot Fish is a vibrant and important species commonly found in the coral reefs of Hikkaduwa. Named for its beak-like mouth, which it uses to scrape algae and coral, the Parrot Fish plays a key role in maintaining the health of the reef by preventing algae overgrowth. Its bright colors and unique feeding behavior make it a favorite among snorkelers and divers exploring Hikkaduwa’s underwater world. By helping to keep the reef clean, the Parrot Fish supports the diverse marine life that thrives in this tropical ecosystem.',
    src: '3D_models/fishes/parrot_fish.glb'
  },
   {
    name: 'Blacktail Snapper',
    description: 'The Blacktail Snapper is a colorful and active fish commonly found in the coral reefs and coastal waters of Hikkaduwa. Recognizable by its silver body and distinctive black tail, this snapper is often seen swimming in schools near reef edges and rocky areas. It feeds on smaller fish, crustaceans, and other marine organisms, playing an important role in the local food chain. In the clear waters of Hikkaduwa, the Blacktail Snapper is a vibrant part of the diverse marine life that attracts many snorkelers and divers to the region.',
    src: '3D_models/fishes/cc0___blacktail_snapper_lutjanus_fulvus.glb'
  },

  

  
];

const MarineLife = () => {
  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(to bottom, #E0F7FA, #FFFFFF);
        }
        nav {
          background: linear-gradient(to right, #013A63, #026873);
          color: white;
          padding: 1rem 2rem;
          display: flex;
          justify-content: center;
          gap: 25px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.2);
        }
        nav a {
          color: white;
          text-decoration: none;
          padding: 8px 14px;
          border-radius: 6px;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        nav a:hover {
          background-color: rgba(255,255,255,0.2);
          transform: scale(1.05);
        }
        .marine-life-section {
          padding: 40px 60px;
          text-align: center;
        }
        .marine-life-section h2 {
          color: #013A63;
          font-size: 2.2rem;
          margin-bottom: 10px;
        }
        .marine-life-section p.intro {
          color: #026873;
          font-size: 1rem;
          margin-bottom: 40px;
        }
        .fish-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr); /* ✅ exactly 3 per row */
          gap: 30px;
          justify-items: center;
        }
        .fish-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          width: 100%;
          max-width: 380px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .fish-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }
        model-viewer {
          width: 100%;
          height: 280px;
          background: linear-gradient(to bottom, #3DDAD7, #038C8C);
        }
        .fish-card h3 {
          margin: 15px 0 10px;
          color: #013A63;
          font-size: 1.3rem;
        }
        .fish-card p {
          font-size: 0.95rem;
          color: #555;
          line-height: 1.6;
          padding: 0 16px 20px;
          text-align: justify;
        }
        @media (max-width: 1000px) {
          .fish-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 650px) {
          .fish-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* ✅ Navigation */}
       <nav>
        <a href="/virtualTour">Virtual Tour</a>
        <a href="/MarineLife">Marine Life</a>
        <a href="/CoralReefs">Coral Reefs</a>
        <a href="/">Home</a>
      </nav>

      {/* ✅ Section */}
      <section className="marine-life-section">
        <h2>🌊 Explore Marine Life</h2>
        <p className="intro">
          Dive into the world of fascinating marine creatures — rotate, zoom, and explore them in 3D!
        </p>

        <div className="fish-grid">
          {fishList.map((fish, index) => (
            <div className="fish-card" key={index}>
              <model-viewer
                src={fish.src}
                alt={fish.name}
                camera-controls
                auto-rotate
                rotation-per-second="20deg"
                shadow-intensity="1"
                ar
              ></model-viewer>
              <h3>{fish.name}</h3>
              <p>{fish.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default MarineLife;