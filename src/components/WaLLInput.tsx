import { Button } from "@/components/ui/button";
import React from "react";

interface WallInputProps {
  name: string;
  message: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile?: File | null;
}

export default function WallInput({ name, message, onNameChange, onMessageChange, onSubmit, onFileChange, selectedFile }: WallInputProps) {
  const isDisabled = name.trim().length === 0 || message.trim().length === 0 || message.length > 280;
  return (
    <div className="rounded-lg p-4 mb-4 bg-white">
      <input
        className="w-full mb-2 p-3 border border-gray-200 rounded-[12px] text-lg font-medium placeholder:text-gray-400"
        placeholder="Your name"
        value={name}
        onChange={onNameChange}
        maxLength={40}
      />
      <textarea
        className="w-full h-28 p-3 border border-gray-200 rounded-[12px] focus:ring-0 resize-none bg-transparent text-lg font-medium placeholder:text-gray-400"
        placeholder="Write a message (max 280 chars)"
        value={message}
        onChange={onMessageChange}
        maxLength={280}
        rows={2}
      />
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="mb-2"
        aria-label="Upload image"
      />
      {selectedFile && <div className="text-sm text-gray-500 mb-2">Selected: {selectedFile.name}</div>}
      <div className="flex justify-between items-center mt-2">
        <span className={`text-sm ${message.length > 280 ? 'text-red-500' : 'text-gray-400'}`}>{message.length}/280</span>
        <Button onClick={onSubmit} disabled={isDisabled}>Submit</Button>
      </div>
    </div>
  );
}
