"use client";

import React from "react";
import { motion } from "framer-motion";

interface HeadingProps {
  title: React.ReactNode;
  description?: string;
  badge?: string;
  className?: string;
  align?: "center" | "left";
  children?: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  badge,
  className = "",
  align = "center",
  children,
}) => {
  const isCentered = align === "center";

  return (
    <div
      className={`mb-16 flex flex-col ${
        isCentered ? "items-center text-center" : "items-start text-left"
      } ${className}`}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary shadow-[0_0_15px_rgba(14,165,233,0.1)] backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2 mr-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
          </span>
          {badge}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`font-heading text-4xl font-bold text-white md:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-6 max-w-4xl [&>span]:font-sans [&>span]:italic`}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`max-w-2xl text-lg text-text-secondary md:text-xl leading-relaxed`}
        >
          {description}
        </motion.p>
      )}

      {children && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10"
        >
          {children}
        </motion.div>
      )}
      
      {/* Decorative gradient underline for left-aligned headings */}
      {!isCentered && (
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 h-1 rounded-full bg-gradient-to-r from-primary to-transparent"
        />
      )}
    </div>
  );
};

export default Heading;
