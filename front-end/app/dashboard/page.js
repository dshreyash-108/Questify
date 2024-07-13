"use client";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Headphones,
  CodeIcon,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
  Search,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRecoilState } from "recoil";
import { urlState } from "../atom/urlatom";
const tools = [
  {
    label: "Questions and Answers",
    icon: MessageSquare,
    desc: "Efficient learning with smart Q&A for precise information retrieval.",
    color: "text-violet-500",
    bgColor: "text-violet-500/10",
    href: "/conversation",
  },
  //   {
  //     label: "Audio Analysis",
  //     icon: Music,
  //     desc: "Improved learning with audio cues for a comprehensive educational experience.",
  //     color: "text-emerald-500",
  //     bgColor: "text-emerald-500/10",
  //     href: "/music",
  //   },
  //   {
  //     label: "Video Analysis",
  //     icon: ImageIcon,
  //     color: "text-pink-700",
  //     bgColor: "text-pink-700/10",
  //     href: "/image",
  //   },
  {
    label: "Access YouTube Videos",
    icon: VideoIcon,
    desc: "Direct access to diverse educational content through seamless YouTube integration.",
    color: "text-orange-700",
    bgColor: "text-orange-700/10",
    href: "/video",
  },
  {
    label: "Customer Support",
    icon: Headphones,
    desc: "Instant tech support via chatbot, ensuring a smooth learning experience.",
    color: "text-green-700",
    bgColor: "text-green-700/10",
    href: "/code",
  },
];
export default function DashBoardPage() {
  const [url, setURL] = useRecoilState(urlState);
  const router = useRouter();

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <div className="mb-8 space-y-4">
        <div className="text-center mt-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            <span className="text-[#333333]">Explore the Power of</span>
            <span className="text-[#FF0204]"> AI.</span>
          </h1>
        </div>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Elevate Your Learning Experience with AI-Driven Conversations and
          Insights.
        </p>
      </div>

      <div className="space-y-4 flex flex-col items-center">
        {tools.map((tool) => (
          <Card
            onClick={() => {
              router.push(`${tool.href}`);
            }}
            key={tool.href}
            className="p-4 border-black/5 flex items-center w-full md:w-[55rem] justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="">
                <div className="font-semibold inline">{tool.label}</div> -
                <p className="text-gray-400 font-light text-sm md:text-sm inline pl-1">
                  {tool.desc}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-4 sm:mt-6 md:mt-10 lg:mt-14 xl:mt-20 lg:m-[22%] ">
        <div className="border border-black/20 rounded-md flex flex-col md:flex-row justify-center">
          <Search className="my-auto ml-2 h-5 w-5 text-gray-400" />
          <Input
            className="outline-none focus-visible:ring-offset-0 border-0 focus-visible:ring-0 focus-visible:ring-transparent rounded-md focus-visible:outline-none focus-visible:border-0 flex-1 "
            placeholder="Enter the Youtube video URL..."
            value={url}
            onChange={(e) => {
              setURL(e.target.value);
            }}
          />
          <button
            disabled={!url.trim()}
            className={`md:ml-2 md:w-[8rem] mt-2 md:mt-0 ${
              !url.trim()
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#FF0204] text-[#ebe4e4]"
            } px-4 py-2 font-bold`}
            onClick={() => router.push(`/summary`)}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}
