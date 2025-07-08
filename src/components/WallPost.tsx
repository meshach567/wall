import Image from "next/image";

interface WallPostProps {
  author: string;
  text: string;
  photo_url?: string | null;
  created_at?: string;
}

export default function WallPost({
  author,
  text,
  photo_url,
  created_at,
}: WallPostProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-center mb-2">
        <span className="font-bold text-lg">{author}</span>
        {created_at && (
          <span className="ml-2 text-xs text-gray-400">
            {new Date(created_at).toLocaleString()}
          </span>
        )}
      </div>
      {photo_url && (
        <div className="mb-2">
          <Image
            src={photo_url}
            alt="Post"
            width={400}
            height={256}
            className="rounded-lg object-cover"
            style={{ maxHeight: "16rem", width: "auto" }}
          />
        </div>
      )}
      <div className="text-gray-800">{text}</div>
    </div>
  );
}
