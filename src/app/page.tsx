"use client";

import ProfileCard from "@/components/ProfileCard";
import WallInput from "@/components/WaLLInput";
import WallList from "@/components/WallList";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/SupabaseAuthClient";
import { get, post, isSuccessResponse } from "@/lib/Fetch";

interface Post {
  id: string;
  user_id: string | null;
  author: string | null;
  body: string | null;
  created_at: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("id, user_id, author, body, created_at")
      .order("created_at", { ascending: false });
    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  };

  // Example of using the fetch utility (alternative to Supabase)
  // const fetchPostsWithFetch = async () => {
  //   setLoading(true);
  //   const response = await get<Post[]>('/api/posts');
  //   if (isSuccessResponse(response) && response.data) {
  //     setPosts(response.data);
  //   } else {
  //     console.error('Failed to fetch posts:', response.error);
  //   }
  //   setLoading(false);
  // };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async () => {
    if (name.trim() && message.trim() && message.length <= 280) {
      setLoading(true);
      const { error } = await supabase.from("posts").insert({
        author: name.trim(),
        body: message.trim(),
      });
      setMessage("");
      setName("");
      setLoading(false);
      if (!error) {
        fetchPosts();
      }
    }
  };

  // Example of using the fetch utility for posting (alternative to Supabase)
  // const handleSubmitWithFetch = async () => {
  //   if (name.trim() && message.trim() && message.length <= 280) {
  //     setLoading(true);
  //     const response = await post('/api/posts', {
  //       author: name.trim(),
  //       body: message.trim(),
  //     });
  //     if (isSuccessResponse(response)) {
  //       setMessage("");
  //       setName("");
  //       fetchPosts();
  //     } else {
  //       console.error('Failed to create post:', response.error);
  //     }
  //     setLoading(false);
  //   }
  // };

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
              onFileChange={handleFileChange}
              selectedFile={selectedFile}
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
