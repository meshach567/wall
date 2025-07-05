"use client";

import ProfileCard from "@/components/ProfileCard";
import WallInput from "@/components/WaLLInput";
import WallList from "@/components/WallList";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Post {
  id: string;
  author: string;
  text: string;
  created_at: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("id, author, text, created_at")
      .order("created_at", { ascending: false });
    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);

  const handleSubmit = async () => {
    if (name.trim() && message.trim() && message.length <= 280) {
      setLoading(true);
      const { error } = await supabase.from("posts").insert({
        author: name.trim(),
        text: message.trim(),
      });
      setMessage("");
      setName("");
      setLoading(false);
      if (!error) {
        fetchPosts();
      }
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
            {loading ? (
              <div className="text-center text-gray-400">Loading...</div>
            ) : (
              <WallList posts={posts} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
