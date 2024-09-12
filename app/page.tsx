"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [stars, setStars] = useState(0);

  useEffect(() => {
    fetch("https://api.github.com/repos/steveoOn/next-fast-voice-assistant")
      .then((response) => response.json())
      .then((data) => setStars(data.stargazers_count));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        This is Fast Voice Assistant&apos;s
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>
      </div>
      <div className="flex flex-col items-center justify-center mt-12">
        <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
          Welcome to Fast Voice Assistant
        </h1>

        <p className="text-lg mb-8">
          A fast, accurate voice assistant that integrates cutting-edge speech recognition, natural language processing, and speech synthesis technologies.
        </p>

        <p className="mb-4">
          <span className="inline-block bg-gray-100 text-slate-700 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded border border-gray-300">
            GitHub Star {stars}
          </span>
        </p>

        <div className="bg-white shadow-lg rounded-xl p-8 mb-10 text-center transform transition duration-500 hover:scale-105">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Experience our app
          </h2>
          <p className="text-gray-600 mb-6">
            Visit the ChatInspire app to experience how our project's API handles voice interactions
          </p>
          <Link
            href="https://chatinspire.app"
            className="text-white bg-blue-500 hover:bg-blue-600 font-semibold py-2 px-4 rounded-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Now
          </Link>
        </div>
      </div>
    </main>
  );
}
