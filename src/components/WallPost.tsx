interface WallPostProps {
  author: string;
  text: string;
}

export default function WallPost({ author, text }: WallPostProps) {
  return (
    <div className="flex flex-col border-b border-gray-200 py-2">
      <span className="font-bold">{author}</span>
      <p className="ml-2 inline">{text}</p>
    </div>
  );
}
  