import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ENVIRONMENTS, LENGTHS, type Environment, type MediaType, type World } from "@/lib/cineguide/data";
import { getJourney, type Piece } from "@/lib/cineguide/recommend";
import { BridgeStage, DragonStage, EnvironmentStage, FlightStage, IntroStage, LengthStage, PortalStage, WorldStage } from "@/components/cineguide/Stages";
import { JourneyStage } from "@/components/cineguide/Journey";

export const Route = createFileRoute("/cineguide")({
  head: () => ({
    meta: [
      { title: "CINEGUIDE — The 12-Piece Discovery Journey" },
      { name: "description", content: "A magical, wizard-guided journey through six media universes ending in 12 hand-picked discoveries." },
      { property: "og:title", content: "CINEGUIDE — The 12-Piece Discovery Journey" },
      { property: "og:description", content: "Choose your universe, world and atmosphere, name your dragon, and discover 12 stories." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CineGuide,
});

type Stage = "intro" | "portals" | "world" | "environment" | "length" | "bridge" | "dragon" | "flight" | "journey";

function CineGuide() {
  const [stage, setStage] = useState<Stage>("intro");
  const [media, setMedia] = useState<MediaType>();
  const [world, setWorld] = useState<World>();
  const [environment, setEnvironment] = useState<Environment>();
  const [length, setLength] = useState<number>();
  const [dragonName, setDragonName] = useState("");
  const [reference, setReference] = useState("");
  const [pieces, setPieces] = useState<Piece[]>([]);
  const env = ENVIRONMENTS.find((e) => e.id === environment);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [stage]);
  useEffect(() => {
    if (stage === "journey" && media && world && environment && length)
      getJourney({ media, world, environment, length, dragonName: dragonName || undefined, reference: reference || undefined }).then(setPieces);
  }, [stage, media, world, environment, length, dragonName, reference]);

  const toDragon = useCallback(() => setStage("dragon"), []);
  const toJourney = useCallback(() => setStage("journey"), []);
  const onLength = useCallback((n: number) => setLength(n), []);

  return (
    <div className="cg-scene">
      {stage === "intro" && <IntroStage onBegin={() => setStage("portals")} />}
      {stage === "portals" && <PortalStage value={media} onBack={() => setStage("intro")} onPick={(m) => {
        if (m !== media) setLength(undefined);
        setMedia(m); setStage("world");
      }} />}
      {stage === "world" && <WorldStage value={world} onChange={setWorld} onBack={() => setStage("portals")} onNext={() => setStage("environment")} />}
      {stage === "environment" && <EnvironmentStage value={environment} onChange={setEnvironment} onBack={() => setStage("world")} onNext={() => setStage("length")} />}
      {stage === "length" && <LengthStage media={media!} env={env} value={length} onChange={onLength} onBack={() => setStage("environment")} onNext={() => setStage("bridge")} />}
      {stage === "bridge" && <BridgeStage env={env} label={`${length} ${LENGTHS[media!].unit}`} onDone={toDragon} />}
      {stage === "dragon" && <DragonStage env={env} name={dragonName} reference={reference} onName={setDragonName} onReference={setReference} onBack={() => setStage("length")} onNext={() => setStage("flight")} />}
      {stage === "flight" && <FlightStage env={env} name={dragonName} onDone={toJourney} />}
      {stage === "journey" && <JourneyStage env={env} pieces={pieces} dragonName={dragonName} onBack={() => setStage("dragon")} />}
    </div>
  );
}
