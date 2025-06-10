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
            <Link to={`/blog/${blog._id}`} key={blog._id}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition">
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
              </div>
            </Link>
          ))}
        </div>
      )}
    </DefaultLayout>
  );
}
