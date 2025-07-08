import WallPost from "./WallPost";

interface Post {
  id: string;
  user_id: string | null;
  author: string | null;
  body: string | null;
  photo_url?: string | null;
  created_at: string;
}

interface WallListProps {
  posts: Post[];
}

export default function WallList({ posts }: WallListProps) {
  return (
    <div>
      {posts.map((post) => (
        <WallPost
          key={post.id}
          author={post.author || ""}
          text={post.body || ""}
          photo_url={post.photo_url}
          created_at={post.created_at}
        />
      ))}
    </div>
  );
}
