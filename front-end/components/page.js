"use client";
import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import { useParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { urlState } from "../atom/urlatom";
import YouTube from "react-youtube";

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
  const [summary, setSummary] = useState("");
  const [translatedSummary, setTranslatedSummary] = useState("");

   const extractVideoId = (url) => {
     const match = url.match(/[?&]v=([^?&]+)/);
     return match && match[1];
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
    if (url) {
      // Call the getSummary function with the YouTube video URL
      getSummary(url).then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          setSummary(data.summarized_text);
          setTranslatedSummary(data.translated_text);
        }
      });
    }
  }, [url]); // Dependency array ensures useEffect runs when 'url' changes

  return (
    <div>
      Render your UI using 'summary' and 'translatedSummary'
      {videoId && <YouTube videoId={videoId} />}
      <h1>Summary:</h1>
      <p>{summary}</p>
      <h1>Translated Summary:</h1>
      <p>{translatedSummary}</p>
    </div>
  );
};

export default SummaryPage;
