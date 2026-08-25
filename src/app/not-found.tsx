"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Rocket, Home, MoveLeft, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen bg-[#020617] overflow-hidden flex flex-col items-center justify-center text-white px-6">
      {/* Dynamic Starfield Background */}
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + "px",
              height: Math.random() * 3 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              opacity: Math.random(),
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
        
        {/* Shooting Stars */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`shooting-${i}`}
            className="absolute h-px w-20 bg-gradient-to-r from-transparent via-purple-400 to-white"
            style={{
              left: "-10%",
              top: Math.random() * 100 + "%",
              rotate: "25deg",
            }}
            animate={{
              left: ["-10%", "110%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              repeatDelay: Math.random() * 10 + 5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Nebula Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse delay-700" />

      {/* Content Container */}
      <div className="relative z-10 text-center">
        {/* Animated Spaceship */}
        <motion.div
          className="relative w-48 h-48 mx-auto mb-12"
          animate={{
            y: [-20, 20, -20],
            rotate: [-5, 5, -5],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/ship-drive.svg"
            alt="Spaceship"
            fill
            className="object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]"
          />
          
          {/* Engine Glow */}
          <motion.div 
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-12 bg-orange-500/40 rounded-full blur-xl"
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sm text-purple-300 font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Uncharted Quadrant</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 select-none">
            404
          </h1>
          
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold">Lost in the Cosmos</h2>
            <p className="text-gray-400 max-w-md mx-auto text-lg">
              Our sensors indicate you&apos;ve drifted off course. Signal lost in deep space.
            </p>
          </div>

          <motion.div 
            className="pt-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="group relative inline-flex items-center gap-3 bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-[0_0_30px_rgba(147,51,234,0.4)]"
            >
              <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              <span>Return to Base</span>
              <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Coordinates Decoders */}
      <div className="absolute bottom-8 left-8 text-white/20 font-mono text-xs hidden md:block">
        <p>SECTOR: 7-G</p>
        <p>COORD: LAT 40.4 LONG 0.0</p>
      </div>
      
      <div className="absolute bottom-8 right-8 text-white/20 font-mono text-xs hidden md:block">
        <p>OXYGEN: 84%</p>
        <p>FUEL: NOMINAL</p>
      </div>
    </main>
  );
}
