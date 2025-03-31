import { PostValidated } from "@/types/post";

interface PostCardProps {
  post: PostValidated;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
      <h3 className="text-2xl font-semibold text-gray-900">{post.title}</h3>
      <p className="text-sm text-gray-500">{post.author}</p>
      <p className="mt-2 text-gray-700">{post.content}</p>
      <p className="mt-4 text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
