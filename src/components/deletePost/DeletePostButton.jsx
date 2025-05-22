'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Trash2 } from 'lucide-react';

const DeletePostButton = ({ slug, postUserEmail }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/post/${slug}`, {
        method: 'DELETE',
      });

      const result = await res.json();

      if (res.ok) {
        alert('Post deleted successfully');
        router.push('/');
      } else {
        alert(result.message || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Something went wrong');
    }
  };

  if (session?.user?.email !== postUserEmail) return null;

  return (
    <button
      title="Delete post"
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700 ml-4"
    >
      <Trash2 size={20} />
    </button>
  );
};

export default DeletePostButton;
