"use client";

import ProfileCard from "@/components/ProfileCard";
import WallInput from "@/components/WaLLInput";
import WallList from "@/components/WallList";
import React, { useEffect, useState } from "react";

const DEMO_POSTS = [
  { author: "Anna", text: "Hey Greg, did you debug your coffee maker yet? Last cup tasted like JavaScript errors." },
  { author: "Adelaida", text: "Greg, saw your last coding session—pretty sure you broke Stack Overflow again! 🧱" },
  { author: "Juho", text: "Greg, are you still coding in pajamas, or have you upgraded to full-time sweatpants mode?" },
  { author: "Maija", text: "Greg, rumor has it your computer has more stickers than code running on it. Confirm?" },
  { author: "Alex", text: "Yo Greg, just pulled an all-nighter on the assignment. Turns out sleep deprivation doesn't improve coding skills. Weird!" },
  { author: "Sheryl", text: "Greg, when are we gonna deploy your latest dance moves to production? #AgileDancer" },
];

const STORAGE_KEY = "wall_posts";

export default function Home() {
  const [posts, setPosts] = useState(DEMO_POSTS);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Load posts from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setPosts(JSON.parse(stored));
      } catch {
        setPosts(DEMO_POSTS);
      }
    }
  }, []);

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);

  const handleSubmit = () => {
    if (name.trim() && message.trim() && message.length <= 280) {
      setPosts([{ author: name.trim(), text: message.trim() }, ...posts]);
      setMessage("");
      setName("");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4 w-full flex justify-center md:justify-start">
          <ProfileCard />
        </div>
        {/* Wall */}
        <div className="md:w-3/4 w-full flex flex-col gap-4">
          <div className="bg-blue-600 text-white rounded-t-lg px-6 py-2 font-bold text-xl mb-0 shadow">wall</div>
          <div className="p-6 bg-gray-50 rounded-b-lg shadow flex flex-col gap-4">
            <WallInput
              name={name}
              message={message}
              onNameChange={handleNameChange}
              onMessageChange={handleMessageChange}
              onSubmit={handleSubmit}
            />
            <WallList posts={posts} />
          </div>
        </div>
      </div>
    </main>
  );
}
