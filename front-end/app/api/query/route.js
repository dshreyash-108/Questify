import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});
const instructionMessage = {
  role: "system",
  content:
    "You should answer queries that the user will ask you after watching a youtube (This can be for any purposes mostly for educational or learning purposes) . You must answer those queries with the help of knowledge you have regarding the question or the topic. Please have a professional tutor based approach with easy language and provide examples wherever necessary and generate short easy to undertsand and bulletpoint result",
};
//
export async function POST(req) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;
    if (!openai.apiKey) {
      return new NextResponse("OpenAI API key not configured", { status: 500 });
    }
    if (!messages) {
      return new NextResponse("No messages provided", { status: 400 });
    }
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
