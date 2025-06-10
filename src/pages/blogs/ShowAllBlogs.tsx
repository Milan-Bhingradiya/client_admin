import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link } from 'react-router-dom';

export interface IBlog {
  _id: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
}

export default function ShowAllBlogs() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://smit-shah-backend-80da1d71856d.herokuapp.com/blogs')
      .then((res) => res.json())
      .then((data) => setBlogs(data.blogs || []))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this blog?',
    );
    if (!confirmed) return;

    try {
      const res = await fetch(
        `https://smit-shah-backend-80da1d71856d.herokuapp.com/blog/${id}`,
        {
          method: 'DELETE',
        },
      );
      if (res.ok) {
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      } else {
        alert('Failed to delete blog.');
      }
    } catch {
      alert('Failed to delete blog.');
    }
  };

  return (
    <DefaultLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Blogs</h1>
        <Link to="/addblog" className="bg-primary text-white px-4 py-2 rounded">
          Add Blog
        </Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition relative"
            >
              <Link to={`/blog/${blog._id}`}>
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="font-bold text-lg mb-2">{blog.title}</h2>
                  <p className="text-gray-600 line-clamp-3">{blog.content}</p>
                  <div className="text-xs text-gray-400 mt-2">
                    {new Date(blog.createdAt).toLocaleString()}
                  </div>
                </div>
              </Link>
              <button
                onClick={() => handleDelete(blog._id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                title="Delete"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </DefaultLayout>
  );
}
