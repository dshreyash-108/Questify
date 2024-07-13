"use client";
import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { useParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { urlState } from "../../atom/urlatom";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { UserButton } from "@clerk/nextjs";
import YouTube from "react-youtube";
import MobileSidebar from "@/components/MobileSidebar";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import UserAvatar from "@/components/UserAvatar";
import BotAvatar from "@/components/BotAvatar";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useSpeechSynthesis } from "react-speech-kit";

async function getSummary(url) {
  try {
    const BACKEND_URL = "http://localhost:5000";
    const res = await fetch(`${BACKEND_URL}/summarize?youtube_video=${url}`);

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching summary:", error);
    return { error: "Error fetching summary" };
  }
}

const SummaryPage = () => {
  const [url, SetUrl] = useRecoilState(urlState);
  const [videoId, setVideoId] = useState("");
  console.log(url);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [translatedSummary, setTranslatedSummary] = useState("");
  const [messages, setMessages] = useState([]);
  // const [message, setMessage] = useState("");
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const { speak } = useSpeechSynthesis();
  const extractVideoId = (url) => {
    const match = url.match(/[?&]v=([^?&]+)/);
    return match && match[1];
  };
  const handleSpeak = (summary) => {
    +speak({ summary });
  };

  const OnSubmit = async (values) => {
    try {
      const userMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];
      const response = await axios.post("/api/query", {
        messages: newMessages,
      });
      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error) {
      //TODO: Open Premium Modal
      console.log(error);
    } finally {
      router.refresh();
    }
  };
  useEffect(() => {
    if (url) {
      // Extract the video ID from the URL
      const newVideoId = extractVideoId(url);
      setVideoId(newVideoId || ""); // Set the video ID or an empty string if not found
    }
  }, [url]);

  useEffect(() => {
    // Make sure 'url' is defined
    setLoading(true);
    if (url) {
      // Call the getSummary function with the YouTube video URL
      getSummary(url).then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          setSummary(data.summarized_text);
          setTranslatedSummary(data.translated_text);
          setLoading(false);
        }
      });
    }
  }, [url]); // Dependency array ensures useEffect runs when 'url' changes

  const [language, setLanguage] = useState("English");
  console.log(translatedSummary);
  return (
    <div className="mb-10">
      <div className="h-full relative flex flex-col md:flex-row">
        {" "}
        {/* Updated flex classes */}
        <div className="m-4">
          <MobileSidebar />
        </div>
        <main className="md:pl-72 flex-grow">
          <div className="flex justify-between items-end mb-4 md:mb-0 md:mt-5 md:mr-4">
            {" "}
            {/* Updated flex and justify-between classes */}
            <div>
              {" "}
              {/* Add any additional content you want to the left of UserButton */}
              {/* Your additional content */}
            </div>
            <UserButton />
          </div>
          {/* The rest of your content */}
        </main>
      </div>

      <div className="mx-16 flex gap-x-6">
        <div className="w-[70%]">
          {videoId && <YouTube videoId={videoId} />}
          <div className="mt-10 ">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(OnSubmit)}
                className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
              >
                <FormField
                  name="prompt"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="m-0 p-0">
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          disabled={isLoading}
                          placeholder="Ask me Questions...I'll try to explain"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  className="col-span-12 lg:col-span-2"
                  disabled={isLoading}
                >
                  Generate
                </Button>
              </form>
            </Form>
          </div>

          <div className="flex flex-col reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={String(message.content)}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">{String(message.content)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full ml-10">
          <h1 className="text-[2.30em]  font-semibold">
            <span className="text-[#FF0204]">Summary</span>
            <span className="text-[#333333]">:</span>
          </h1>
          {loading && (
            <div className="p-8 rounded-lg items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          <h6 className="text-justify">
            {language == "English" ? summary : translatedSummary}
          </h6>
          <div className="mt-4">
            {language === "Hindi" ? (
              <Button
                className={`bg-[#FF0204]`}
                onClick={() => setLanguage("English")}
              >
                Convert to English
              </Button>
            ) : (
              <Button
                className={`bg-[#FF0204]`}
                onClick={() => setLanguage("Hindi")}
              >
                Convert to Hindi
              </Button>
            )}
            <Button
              className={`bg-[#FF0204] ml-10 w-36`}
              onClick={() => router.push("/dashboard")}
            >
              Go Back
            </Button>
          </div>
          {/* <Button
            className={`bg-[#FF0204] ml-10 w-36`}
            onClick={() => handleSpeak(summary)}
          >
            Text to Speech
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
