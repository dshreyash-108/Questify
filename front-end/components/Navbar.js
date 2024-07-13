import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import MobileSidebar from "@/components/MobileSidebar";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const Navbar = async () => {
  return (
    <div className="flex items-center p-4 mt-2 mr-2">
      <MobileSidebar />
      {/* <div className=""> */}
      <Link href="/dashboard" className="flex items-center">
        <div className="relative h-8 w-8 mr-4 ml-8">
          <Image fill src={"/logo.png"} alt="logo" />
        </div>
        <h1
          className={cn("text-2xl font-extrabold text-black", font.className)}
        >
          Questify
        </h1>
      </Link>
      {/* </div> */}
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
