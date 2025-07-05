import WallPost from "./WallPost";

interface Post {
  author: string;
  text: string;
}

interface WallListProps {
  posts: Post[];
}

export default function WallList({ posts }: WallListProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      {posts.map((post, idx) => (
        <WallPost key={idx} author={post.author} text={post.text} />
      ))}
    </div>
  );
}
