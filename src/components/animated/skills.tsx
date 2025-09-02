import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
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

const SkillDataProvider = ({ src, width, height, index, name }: Props & { name: string }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [isHovered, setIsHovered] = useState(false);

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.15,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const tooltipVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const animationDelay = 0.2;
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      variants={imageVariants as any}
      animate={inView ? "visible" : "hidden"}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      custom={index}
      transition={{ delay: index * animationDelay }}
      className="relative flex flex-col items-center"
    >
      <motion.div
        className="p-3 rounded-xl bg-gradient-to-br from-foreground/10 to-background/80 shadow-lg border border-foreground/10"
        whileHover={{
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.04)",
          backgroundColor: "rgba(255, 255, 255, 0.05)"
        }}
      >
        <Image 
          src={src} 
          width={width} 
          height={height} 
          alt={`${name} logo`} 
          className="transition-all duration-300"
        />
      </motion.div>
      
      {/* Tooltip on hover */}
      {isHovered && (
        <motion.div
          variants={tooltipVariants}
          initial="hidden"
          animate="visible"
          className="absolute -bottom-8 bg-foreground text-background px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap"
        >
          {name}
        </motion.div>
      )}
    </motion.div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Add a 'name' property to your skill data objects
  const Skill_data_with_names = Skill_data.map(skill => ({
    ...skill,
    name: skill.skill_name // Replace with actual skill names
  }));
  
  const Frontend_skill_with_names = Frontend_skill.map(skill => ({
    ...skill,
    name: skill.skill_name // Replace with actual skill names
  }));
  
  const Backend_skill_with_names = Backend_skill.map(skill => ({
    ...skill,
    name: skill.skill_name // Replace with actual skill names
  }));

  const categoryVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <section
      id="skills"
      className="flex flex-col bg-transparent items-center justify-center gap-8 h-full relative overflow-hidden py-16 px-4"
    >
      <SkillText />
      
      {/* Category selector */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {["all", "frontend", "backend", "other"].map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? "bg-foreground text-background"
                : "bg-foreground/10 text-foreground hover:bg-foreground/20"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Skills display with category filtering */}
      <motion.div
        variants={categoryVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl mx-auto"
      >
        {(activeCategory === "all" || activeCategory === "frontend") && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-center text-foreground/80">Frontend Technologies</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
              {Frontend_skill_with_names.map((image, index) => (
                <SkillDataProvider
                  key={index}
                  src={image.Image}
                  width={image.width}
                  height={image.height}
                  index={index}
                  name={image.name}
                />
              ))}
            </div>
          </motion.div>
        )}

        {(activeCategory === "all" || activeCategory === "backend") && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-center text-foreground/80">Backend Technologies</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
              {Backend_skill_with_names.map((image, index) => (
                <SkillDataProvider
                  key={index}
                  src={image.Image}
                  width={image.width}
                  height={image.height}
                  index={index}
                  name={image.name}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Add similar sections for other categories */}
      </motion.div>

      {/* Animated background elements */}
      <div className="absolute -z-10 top-0 left-0 w-full h-full overflow-hidden opacity-20">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-foreground/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 50}px`,
              height: `${20 + Math.random() * 50}px`,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Skills;

const SkillText = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center mb-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl md:text-6xl font-bold text-foreground text-center mb-6"
      >
        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Skills</span>
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl text-foreground font-medium text-center mb-4 max-w-2xl"
      >
        Creating applications with modern technologies
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-lg text-foreground/70 text-center max-w-2xl"
      >
        Never miss a task, deadline or idea with the right tools
      </motion.div>
    </div>
  );
};