import { FlickeringGrid } from "../magicui/flickering-grid";

export function FlickeringBackground() {
  return (
    <div className="absolute z-[-1] h-[900px] w-screen overflow-hidden rounded-lg border bg-background">
      <FlickeringGrid
        className=" inset-0 w-full z-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
        // width={800}
      />
    </div>
  );
}