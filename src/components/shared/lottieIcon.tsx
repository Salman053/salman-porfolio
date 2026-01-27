"use client";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function LottieIcon({
  path, // e.g. "/animations/success.json"
  height = 56,
  loop = true,
}: {
  path: string;
  height?: number;
  loop?: boolean;
}) {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    async function loadAnimation() {
      const res = await fetch(path); // path should start with `/` since it's from /public
      const json = await res.json();
      setAnimationData(json);
    }
    loadAnimation();
  }, [path]);

  if (!animationData) return null;

  return (
    <Lottie animationData={animationData} loop={loop} style={{ height }} />
  );
}
