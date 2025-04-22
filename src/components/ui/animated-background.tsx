
import { useEffect, useState } from "react";

type ParticleProps = {
  size: number;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  opacity: number;
  color: string;
};

const AnimatedBackground = () => {
  const [particles, setParticles] = useState<ParticleProps[]>([]);

  useEffect(() => {
    // Create particles
    const createParticles = () => {
      const newParticles: ParticleProps[] = [];
      const colors = ["#86efac", "#93c5fd", "#c4b5fd", "#fecaca"];
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Create 30 particles
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          size: Math.random() * 6 + 2,
          position: {
            x: Math.random() * windowWidth,
            y: Math.random() * windowHeight,
          },
          velocity: {
            x: (Math.random() - 0.5) * 0.5,
            y: (Math.random() - 0.5) * 0.5,
          },
          opacity: Math.random() * 0.5 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      
      setParticles(newParticles);
    };

    // Handle window resize
    const handleResize = () => {
      createParticles();
    };

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      setParticles((prevParticles) => {
        return prevParticles.map((particle) => {
          // Update position
          const nextX = particle.position.x + particle.velocity.x;
          const nextY = particle.position.y + particle.velocity.y;
          
          // Check boundaries and reverse direction if needed
          const newVelocityX = 
            nextX <= 0 || nextX >= window.innerWidth 
              ? -particle.velocity.x 
              : particle.velocity.x;
              
          const newVelocityY = 
            nextY <= 0 || nextY >= window.innerHeight 
              ? -particle.velocity.y 
              : particle.velocity.y;
          
          // Return updated particle
          return {
            ...particle,
            position: {
              x: nextX <= 0 ? 0 : nextX >= window.innerWidth ? window.innerWidth : nextX,
              y: nextY <= 0 ? 0 : nextY >= window.innerHeight ? window.innerHeight : nextY,
            },
            velocity: {
              x: newVelocityX,
              y: newVelocityY,
            },
          };
        });
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    createParticles();
    animate();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            left: `${particle.position.x}px`,
            top: `${particle.position.y}px`,
            transition: "top 1s ease-out, left 1s ease-out",
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
