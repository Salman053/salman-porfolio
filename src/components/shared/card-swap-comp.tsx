import CardSwap, { Card } from "../animated/card-swap";
import React from "react";
import { Code2, Palette, Database, Globe, Rocket, Sparkles } from "lucide-react";

const CardSwapComp = () => {
  return (
    <div style={{ 
      height: "100vh", 
      position: "absolute", 
      // opacity:0.8,
      zIndex: "5", 
      inset: 0, 
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <CardSwap
        cardDistance={30}
        verticalDistance={90}
        delay={5000}
        pauseOnHover={true}
        
      >
        {/* Card 1: Frontend Development */}
        <Card className="professional-card">
          <div className="card-icon">
            <Code2 size={32} />
          </div>
          <h3 className="card-title">Frontend Excellence</h3>
          <p className="card-description">
            Crafting responsive, accessible, and performant user interfaces 
            with React, Next.js, and modern CSS frameworks.
          </p>
          <div className="card-features">
            <span className="feature-tag">React</span>
            <span className="feature-tag">Next.js</span>
            <span className="feature-tag">TypeScript</span>
          </div>
        </Card>

        {/* Card 2: UI/UX Design */}
        <Card className="professional-card">
          <div className="card-icon">
            <Palette size={32} />
          </div>
          <h3 className="card-title">UI/UX Design</h3>
          <p className="card-description">
            Creating intuitive user experiences with clean, modern designs 
            that prioritize usability and aesthetic appeal.
          </p>
          <div className="card-features">
            <span className="feature-tag">Figma</span>
            <span className="feature-tag">Prototyping</span>
            <span className="feature-tag">User Research</span>
          </div>
        </Card>

        {/* Card 3: Backend Development */}
        <Card className="professional-card">
          <div className="card-icon">
            <Database size={32} />
          </div>
          <h3 className="card-title">Backend Development</h3>
          <p className="card-description">
            Building robust server-side solutions with scalable architecture, 
            efficient databases, and secure APIs.
          </p>
          <div className="card-features">
            <span className="feature-tag">Node.js</span>
            <span className="feature-tag">MongoDB</span>
            <span className="feature-tag">REST APIs</span>
          </div>
        </Card>

        {/* Card 4: Full-Stack Solutions */}
        <Card className="professional-card">
          <div className="card-icon">
            <Globe size={32} />
          </div>
          <h3 className="card-title">Full-Stack Solutions</h3>
          <p className="card-description">
            End-to-end web development delivering complete digital solutions 
            from concept to deployment and maintenance.
          </p>
          <div className="card-features">
            <span className="feature-tag">MERN Stack</span>
            <span className="feature-tag">DevOps</span>
            <span className="feature-tag">Deployment</span>
          </div>
        </Card>

        {/* Card 5: Performance Optimization */}
        <Card className="professional-card">
          <div className="card-icon">
            <Rocket size={32} />
          </div>
          <h3 className="card-title">Performance Optimization</h3>
          <p className="card-description">
            Enhancing application speed, efficiency, and user experience 
            through comprehensive performance tuning.
          </p>
          <div className="card-features">
            <span className="feature-tag">Lighthouse</span>
            <span className="feature-tag">Optimization</span>
            <span className="feature-tag">SEO</span>
          </div>
        </Card>

        {/* Card 6: Innovative Solutions */}
        <Card className="professional-card">
          <div className="card-icon">
            <Sparkles size={32} />
          </div>
          <h3 className="card-title">Innovative Solutions</h3>
          <p className="card-description">
            Leveraging cutting-edge technologies and creative problem-solving 
            to deliver unique digital experiences.
          </p>
          <div className="card-features">
            <span className="feature-tag">AI Integration</span>
            <span className="feature-tag">WebGL</span>
            <span className="feature-tag">Animation</span>
          </div>
        </Card>
      </CardSwap>
    </div>
  );
};

export default CardSwapComp;