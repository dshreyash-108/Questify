"use client";

import { Avatar } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
  {
    name: "Amit",
    avatar: "A",
    title: "Software Engineer",
    description: "This is the best application I've ever used!",
  },
  {
    name: "Nilesh",
    avatar: "N",
    title: "Software Engineer",
    description: "No better Chatbot exists!",
  },
  {
    name: "Vedant",
    avatar: "V",
    title: "Software Engineer",
    description: "Best",
  },
  {
    name: "Shreyash",
    avatar: "S",
    title: "Software Engineer",
    description: "Best AI tool in the market!",
  },
];
const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div className="flex ">
                  <div className="flex items-center justify-center">
                    <Avatar className=" rounded-full text-white">
                      {item.avatar}
                    </Avatar>
                  </div>
                  <div className="flex flex-col justify-start items-start">
                    <p className="text-lg">{item.name}</p>
                    <p className="text-zinc-400 text-sm">{item.title}</p>
                  </div>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0 flex items-start">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;
