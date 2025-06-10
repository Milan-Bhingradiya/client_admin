import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export interface IBlog {
  _id: string;
  title: string;
  content: string; // Markdown content
  imageUrl: string;
  createdAt: string;
}

export default function ShowBlog() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://smit-shah-backend-80da1d71856d.herokuapp.com/blog/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data.blog))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <DefaultLayout>Loading...</DefaultLayout>;
  if (!blog) return <DefaultLayout>Blog not found.</DefaultLayout>;

  return (
    <DefaultLayout>
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-0 md:p-8 mt-8 mb-8 overflow-hidden">
        <div className="relative w-full h-64 md:h-96 bg-gray-100">
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-full object-cover object-center"
            style={{ maxHeight: '24rem' }}
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow mb-1 break-words">
              {blog.title}
            </h1>
            <div className="text-gray-200 text-xs">
              {new Date(blog.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="px-4 md:px-8 py-6 overflow-x-auto">
          <article className="prose max-w-none prose-lg prose-slate break-words whitespace-pre-wrap">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog.content}
            </ReactMarkdown>
          </article>
          <Link
            to="/blogs"
            className="inline-block mt-8 text-primary underline text-base hover:text-primary-dark transition"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    </DefaultLayout>
  );
}
