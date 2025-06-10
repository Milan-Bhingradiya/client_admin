import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { useNavigate } from 'react-router-dom';

// Install with: pnpm add react-mde showdown
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

export default function AddBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');
  const navigate = useNavigate();

  // Showdown converter with line break support
  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
    simpleLineBreaks: true,
    breaks: true,
    ghCompatibleHeaderId: true,
    ghMentions: true,
    emoji: true,
    openLinksInNewWindow: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !image) {
      alert('All fields are required!');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);

    const res = await fetch(
      'https://smit-shah-backend-80da1d71856d.herokuapp.com/addblog',
      {
        method: 'POST',
        body: formData,
      },
    );
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      alert('Blog added!');
      navigate('/blogs');
    } else {
      alert(data.error || 'Failed to add blog');
    }
  };

  return (
    <DefaultLayout>
      <h1 className="text-2xl font-bold mb-6">Add Blog</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border px-4 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ReactMde
          value={content}
          onChange={setContent}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
          minEditorHeight={150}
          minPreviewHeight={150}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Blog'}
        </button>
      </form>
    </DefaultLayout>
  );
}
