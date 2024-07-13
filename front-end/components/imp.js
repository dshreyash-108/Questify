import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import HomeHeroSection from "@/components/HomeHeroSection";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div className="">
      <Navbar />
      <HomeHeroSection />
      <Footer />
    </div>
  );
}
