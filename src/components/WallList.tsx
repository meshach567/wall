import WallPost from "./WallPost";

interface Post {
  id: string;
  user_id: string | null;
  author: string | null;
  body: string | null;
  created_at: string;
}

interface WallListProps {
  posts: Post[];
}

export default function WallList({ posts }: WallListProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      {posts.map((post) => (
        <WallPost key={post.id} author={post.author || ""} text={post.body || ""} />
      ))}
    </div>
  );
}
