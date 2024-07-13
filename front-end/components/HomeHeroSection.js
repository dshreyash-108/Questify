import Image from "next/image";
import React from "react";

const HomeHeroSection = () => {
  return (
    <>
      <div className="relative h-[90vh]  flex items-center justify-center">
        <Image
          src={"/hero-image.png"}
          alt="Hero-Image"
          fill
          className="absolute z-4"
        />
        <h1
          className="text-white font-bold text-8xl z-10 sticky top-52 lg:text-6xl md:text-"
          style={{ textShadow: "4px 4px 30px rgba(0, 0, 0, 0.9)" }}
        >
          VALUE PROP STATEMENT
        </h1>
      </div>
    </>
  );
};

export default HomeHeroSection;
