// components/ui/MacbookLoader.tsx
"use client";

import React from "react";
import clsx from "clsx";

type MacbookLoaderProps = {
  size?: number; // width in px
  className?: string;
  label?: string;
};

const MacbookLoader: React.FC<MacbookLoaderProps> = ({
  size = 150,
  className,
  label = "MacBook Air",
}) => {
  return (
    <div
      className={clsx("relative w-full", className)}
      style={{ width: size, height: (size * 96) / 150 }}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ perspective: "500px" }}
      >
        {/* Shadow */}
        <div
          className="absolute left-[40px] top-[160px]"
          style={{
            width: "60px",
            height: "0px",
            transform: "rotateX(80deg) rotateY(0deg) rotateZ(0deg)",
            boxShadow: "0 0 60px 40px rgba(0,0,0,0.3)",
            animation: "shadow 7s ease infinite",
          }}
        />

        {/* Inner */}
        <div
          className="absolute"
          style={{
            width: `${size}px`,
            height: `${(size * 96) / 150}px`,
            transformStyle: "preserve-3d",
            transform: "rotateX(-20deg) rotateY(0deg) rotateZ(0deg)",
            animation: "rotate 7s ease infinite",
          }}
        >
          {/* Screen */}
          <div
            className="absolute rounded-md"
            style={{
              width: `${size}px`,
              height: `${(size * 96) / 150}px`,
              bottom: 0,
              background: "#ddd",
              transformOrigin: "50% 93px",
              animation: "lid-screen 7s ease infinite",
              backgroundImage:
                "linear-gradient(45deg, rgba(0,0,0,0.34) 0%,rgba(0,0,0,0) 100%)",
              backgroundSize: "300px 300px",
              boxShadow: "inset 0 3px 7px rgba(255,255,255,0.5)",
            }}
          >
            <div
              className="absolute rounded-md"
              style={{
                width: `${size}px`,
                height: `${(size * 96) / 150}px`,
                background: "#d3d3d3",
                transform: "translateZ(2px)",
                backgroundImage:
                  "linear-gradient(45deg,rgba(0,0,0,0.24) 0%,rgba(0,0,0,0) 100%)",
              }}
            >
              {/* Camera */}
              <div
                className="absolute rounded-full bg-black"
                style={{
                  width: "3px",
                  height: "3px",
                  left: "50%",
                  top: "4px",
                  marginLeft: "-1.5px",
                }}
              />
              {/* Display */}
              <div
                className="relative"
                style={{
                  width: "130px",
                  height: "74px",
                  margin: "10px",
                  background: "#000",
                  borderRadius: "2px",
                  boxShadow: "inset 0 0 2px rgba(0,0,0,1)",
                }}
              >
                <div
                  className="absolute left-0 top-0"
                  style={{
                    width: "130px",
                    height: "74px",
                    background:
                      "linear-gradient(-135deg, rgba(255,255,255,0) 0%,rgba(255,255,255,0.1) 47%,rgba(255,255,255,0) 48%)",
                    animation: "screen-shade 7s ease infinite",
                    backgroundSize: "300px 200px",
                  }}
                />
              </div>
              {/* Label */}
              <span className="absolute top-[85px] left-[57px] text-[6px] text-gray-600">
                {label}
              </span>
            </div>
          </div>

          {/* Mac Body */}
          <div
            className="absolute rounded-md bg-gray-300"
            style={{
              width: `${size}px`,
              height: `${(size * 96) / 150}px`,
              bottom: 0,
              transformOrigin: "50% bottom",
              transform: "rotateX(-90deg)",
              animation: "lid-macbody 7s ease infinite",
            }}
          >
            <div
              className="absolute rounded-md bg-gray-200"
              style={{
                width: `${size}px`,
                height: `${(size * 96) / 150}px`,
                transformStyle: "preserve-3d",
                transform: "translateZ(-2px)",
                animation: "lid-keyboard-area 7s ease infinite",
              }}
            >
              {/* Touchpad */}
              <div
                className="absolute rounded bg-gray-300"
                style={{
                  width: "40px",
                  height: "31px",
                  left: "50%",
                  top: "50%",
                  margin: "-44px 0 0 -18px",
                  boxShadow: "inset 0 0 3px #888",
                }}
              />
              {/* Keyboard */}
              <div
                className="absolute rounded bg-gray-300"
                style={{
                  width: "130px",
                  height: "45px",
                  left: "7px",
                  top: "41px",
                  boxShadow: "inset 0 0 3px #777",
                  paddingLeft: "2px",
                }}
              >
                {Array.from({ length: 70 }).map((_, i) => (
                  <div
                    key={i}
                    className="float-left rounded-sm bg-gray-800"
                    style={{
                      width: i === 5 ? "45px" : "6px",
                      height: i > 60 ? "3px" : "6px",
                      margin: "1px",
                      transform: "translateZ(-2px)",
                      boxShadow: "0 -2px 0 #222",
                      animation: "keys 7s ease infinite",
                    }}
                  />
                ))}
              </div>
            </div>
            {/* Pads */}
            <div className="absolute left-[20px] top-[20px] h-[5px] w-[5px] rounded-full bg-gray-800" />
            <div className="absolute right-[20px] top-[20px] h-[5px] w-[5px] rounded-full bg-gray-800" />
            <div className="absolute right-[20px] bottom-[20px] h-[5px] w-[5px] rounded-full bg-gray-800" />
            <div className="absolute left-[20px] bottom-[20px] h-[5px] w-[5px] rounded-full bg-gray-800" />
          </div>
        </div>
      </div>

      {/* Keyframes injected inline via <style> */}
      <style jsx>{`
        @keyframes rotate ${`{${rotateKeyframes}}`}
        @keyframes lid-screen ${`{${lidScreenKeyframes}}`}
        @keyframes lid-macbody ${`{${lidMacbodyKeyframes}}`}
        @keyframes lid-keyboard-area ${`{${lidKeyboardKeyframes}}`}
        @keyframes screen-shade ${`{${screenShadeKeyframes}}`}
        @keyframes keys ${`{${keysKeyframes}}`}
        @keyframes shadow ${`{${shadowKeyframes}}`}
      `}</style>
    </div>
  );
};

// --- Keyframe definitions ---
const rotateKeyframes = `
0% { transform: rotateX(-20deg) rotateY(0deg) rotateZ(0deg); }
5% { transform: rotateX(-20deg) rotateY(-20deg) rotateZ(0deg); }
20% { transform: rotateX(30deg) rotateY(200deg) rotateZ(0deg); }
25% { transform: rotateX(-60deg) rotateY(150deg) rotateZ(0deg); }
60% { transform: rotateX(-20deg) rotateY(130deg) rotateZ(0deg); }
80% { transform: rotateX(-20deg) rotateY(375deg) rotateZ(0deg); }
100% { transform: rotateX(-20deg) rotateY(360deg) rotateZ(0deg); }
`;

const lidScreenKeyframes = `
0% { transform: rotateX(0deg); }
20% { transform: rotateX(-90deg); }
30% { transform: rotateX(-5deg); }
48% { transform: rotateX(0deg); }
100% { transform: rotateX(0deg); }
`;

const lidMacbodyKeyframes = `
0%,100% { transform: rotateX(-90deg); }
`;

const lidKeyboardKeyframes = `
0% { background-color: #dfdfdf; }
50% { background-color: #bbb; }
100% { background-color: #dfdfdf; }
`;

const screenShadeKeyframes = `
0% { background-position: -20px 0px; }
20% { background-position: 200px 0; }
50% { background-position: -200px 0; }
100% { background-position: -20px 0px; }
`;

const keysKeyframes = `
0%,100% { box-shadow: 0 -2px 0 #222; }
20% { box-shadow: -1px 1px 0 #222; }
`;

const shadowKeyframes = `
0% { transform: rotateX(80deg); box-shadow: 0 0 60px 40px rgba(0,0,0,0.3); }
25% { transform: rotateX(80deg) rotateY(-20deg) rotateZ(50deg); box-shadow: 0 0 35px 15px rgba(0,0,0,0.1); }
60% { transform: rotateX(80deg) rotateY(0deg) rotateZ(-50deg) translateX(30px); box-shadow: 0 0 60px 40px rgba(0,0,0,0.3); }
100% { box-shadow: 0 0 60px 40px rgba(0,0,0,0.3); }
`;

export default MacbookLoader;
