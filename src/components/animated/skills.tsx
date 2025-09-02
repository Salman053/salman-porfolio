import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
export const Skill_data = [
  {
    skill_name: "Html 5",
    Image: "/html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Css",
    Image: "/css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Java Script",
    Image: "/js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Python",
    Image: "/python.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Tailwind Css",
    Image: "/tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    Image: "/react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Redux",
    Image: "/redux.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Type Script",
    Image: "/ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next js 13",
    Image: "/next.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Flask",
    Image: "/flask.svg",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Stripe Payment",
    Image: "/stripe.webp",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Node js",
    Image: "/node-js.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Mongo db",
    Image: "/mongodb.png",
    width: 40,
    height: 40,
  },
];

export const Socials = [
  {
    name: "Instagram",
    src: "/instagram.svg",
    link: "https://www.instagram.com/nikhil_maguwala/",
  },
  {
    name: "Github",
    src: "/github_white.jpg",
    link: "https://github.com/nikhilmaguwala",
  },
  {
    name: "Linkedin",
    src: "/linkedin.svg",
    link: "https://www.linkedin.com/in/nikhil-maguwala/",
  },
];

export const Frontend_skill = [
  {
    skill_name: "HTML 5",
    Image: "/html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    Image: "/css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Java Script",
    Image: "/js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind Css",
    Image: "/tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Material UI",
    Image: "/mui.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    Image: "/react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Redux",
    Image: "/redux.png",
    width: 80,
    height: 80,
  },
  // {
  //   skill_name: "Angular",
  //   Image: "/angular.svg",
  //   width: 80,
  //   height: 80,
  // },
  {
    skill_name: "Type Script",
    Image: "/ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next js 13",
    Image: "/next.png",
    width: 80,
    height: 80,
  },
];

export const Backend_skill = [
  {
    skill_name: "Node js",
    Image: "/node-js.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Express js",
    Image: "/express.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Mongo db",
    Image: "/mongodb.png",
    width: 40,
    height: 40,
  },
  {
    skill_name: "Fire base",
    Image: "/Firebase.png",
    width: 55,
    height: 55,
  },
  // {
  //   skill_name: "Postgres SQL",
  //   Image: "/postger.png",
  //   width: 70,
  //   height: 70,
  // },
  {
    skill_name: "My SQL",
    Image: "/mysql.png",
    width: 70,
    height: 70,
  },
  // {
  //   skill_name: "Prisma",
  //   Image: "/prisma.webp",
  //   width: 70,
  //   height: 70,
  // },
  // {
  //   skill_name: "Graphql",
  //   Image: "/graphql.png",
  //   width: 80,
  //   height: 80,
  // },
];

export const Full_stack = [
  // {
  //   skill_name: "React Native",
  //   Image: "/ReactNative .png",
  //   width: 70,
  //   height: 70,
  // },
  // {
  //   skill_name: "Jenkins",
  //   Image: "/jenkins.svg",
  //   width: 70,
  //   height: 70,
  // },
  // {
  //   skill_name: "Docker",
  //   Image: "/docker.webp",
  //   width: 70,
  //   height: 70,
  // },
  // {
  //   skill_name: "Figma",
  //   Image: "/figma.png",
  //   width: 50,
  //   height: 50,
  // },
];

export const Other_skill = [
  {
    skill_name: "ChatGPT",
    Image: "/chatgpt-icon.svg",
    width: 60,
    height: 60,
  },
];

interface Props {
  src: string;
  width: number;
  height: number;
  index: number;
}

const SkillDataProvider = ({ src, width, height, index }: Props) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const animationDelay = 0.3;
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      variants={imageVariants}
      animate={inView ? "visible" : "hidden"}
      custom={index}
      transition={{ delay: index * animationDelay }}
    >
      <Image src={src} width={width} height={height} alt="skill image" />
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="flex flex-col bg-transparent  items-center justify-center gap-3 h-full relative overflow-hidden pb-30 py-10"
      style={{ transform: "scale(0.9" }}
    >
     
      {/* <StarsCanvas /> */}
      {/* <FlickeringBackground/> */}
      <SkillText />

      {/* <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
        {Skill_data.map((image, index) => (
          <SkillDataProvider
            key={index}
            src={image.Image}
            width={image.width}
            height={image.height}
            index={index}
          />
        ))}
      </div> */}

      <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
        {Frontend_skill.map((image, index) => (
          <SkillDataProvider
            key={index}
            src={image.Image}
            width={image.width}
            height={image.height}
            index={index}
          />
        ))}
      </div>
      <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
        {Backend_skill.map((image, index) => (
          <SkillDataProvider
            key={index}
            src={image.Image}
            width={image.width}
            height={image.height}
            index={index}
          />
        ))}
      </div>
      {/* <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
        {Full_stack.map((image, index) => (
          <SkillDataProvider
            key={index}
            src={image.Image}
            width={image.width}
            height={image.height}
            index={index}
          />
        ))}
      </div> */}
      {/* <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
        {Other_skill.map((image, index) => (
          <SkillDataProvider
            key={index}
            src={image.Image}
            width={image.width}
            height={image.height}
            index={index}
          />
        ))}
      </div> */}

      {/* <div className="w-full hidden dark:block h-full absolute">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
            src="/cards-video.webm"
          />
        </div>
      </div> */}
    </section>
  );
};

export default Skills;

import { slideInFromLeft, slideInFromRight } from "./encryption";
import Image from "next/image";

const SkillText = () => {
  return (
    <div className="w-full  h-auto flex flex-col items-center justify-center">
      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-4xl text-foreground font-medium mt-[10px] text-center mb-[15px]"
      >
        Making apps with modern technologies
      </motion.div>
      <motion.div
        variants={slideInFromRight(0.5)}
        className="cursive text-2xl text-foreground/70 mb-10 mt-[10px] text-center"
      >
        Never miss a task, deadline or idea
      </motion.div>
    </div>
  );
};
