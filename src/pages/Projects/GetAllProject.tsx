import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';

interface IProject {
  _id: string;
  title: string;
  client: string;
  description: string;
  images: string[];
  industryName: string;
  companyName: string;
  solution: string;
  challenges: string[];
}

function GetAllProject() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [modalImage, setModalImage] = useState<{
    project: IProject;
    idx: number;
  } | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          'https://smit-shah-backend-80da1d71856d.herokuapp.com/getprojects',
        );
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (err) {
        alert('Failed to fetch projects.');
      }
    };
    fetchProjects();
  }, []);

  return (
    <DefaultLayout>
      <div className="  flex-wrap p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white  rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-200 cursor-pointer flex flex-col items-center p-6 border border-gray-200"
            style={{ minHeight: '420px', minWidth: '340px', maxWidth: '420px' }}
            onClick={() => setModalImage({ project, idx: 0 })}
          >
            <img
              src={project.images[0]}
              alt={project.companyName + ' thumbnail'}
              className="w-64 h-64 object-cover rounded-xl mb-4 border-2 border-gray-300 shadow-lg"
              style={{ maxWidth: '100%', maxHeight: '260px' }}
            />
            <div className="text-center font-bold text-gray-900 text-lg truncate w-full mb-2">
              {project.companyName}
            </div>
            <div className="text-gray-700 text-base w-full text-center mb-1">
              <span className="font-semibold">Title:</span> {project.title}
            </div>
            <div className="text-gray-600 text-sm w-full text-center">
              <span className="font-semibold">Industry:</span>{' '}
              {project.industryName}
            </div>
          </div>
        ))}
      </div>
      {modalImage && (
        <ProjectImageModal
          project={modalImage.project}
          startIdx={modalImage.idx}
          onClose={() => setModalImage(null)}
        />
      )}
    </DefaultLayout>
  );
}

// Modal component for swipable/double-tap images
function ProjectImageModal({
  project,
  startIdx,
  onClose,
}: {
  project: IProject;
  startIdx: number;
  onClose: () => void;
}) {
  const images = project.images;
  const [idx, setIdx] = useState(startIdx);
  // Double tap logic
  const [lastTap, setLastTap] = useState<number>(0);
  const handleImageClick = () => {
    const now = Date.now();
    if (now - lastTap < 400) {
      // Double tap detected
      onClose();
    } else {
      setLastTap(now);
    }
  };
  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setIdx((i) => (i > 0 ? i - 1 : i));
      if (e.key === 'ArrowRight')
        setIdx((i) => (i < images.length - 1 ? i + 1 : i));
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [images.length, onClose]);
  // Touch swipe logic
  let touchStartX = 0;
  let touchEndX = 0;
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX - touchStartX > 50 && idx > 0) setIdx(idx - 1);
    if (touchStartX - touchEndX > 50 && idx < images.length - 1)
      setIdx(idx + 1);
  };
  return (
    <div
      className="z-999999 fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      style={{ paddingTop: '32px', paddingBottom: '32px' }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col overflow-y-auto shadow-2xl border-2 border-gray-200"
        onClick={(e) => e.stopPropagation()}
        style={{ marginTop: 0 }}
      >
        <button
          className="sticky top-2 right-2 float-right z-10 text-black text-3xl font-bold bg-white/80 rounded-full px-3 py-1 hover:bg-gray-200 transition"
          style={{ position: 'absolute', top: 8, right: 8 }}
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col items-center p-4">
          <img
            src={images[idx]}
            alt="Project preview"
            className="max-h-[60vh] max-w-[90vw] rounded-xl shadow-2xl border-4 border-white select-none mx-auto block"
            onClick={handleImageClick}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            draggable={false}
            style={{ minHeight: '320px', minWidth: '320px' }}
          />
          <div className="flex justify-between items-center mt-4 w-full">
            <button
              className="text-black bg-gray-200 px-3 py-1 rounded disabled:opacity-30"
              onClick={() => setIdx((i) => (i > 0 ? i - 1 : i))}
              disabled={idx === 0}
            >
              &#8592;
            </button>
            <span className="text-gray-700 text-sm">
              {idx + 1} / {images.length}
            </span>
            <button
              className="text-black bg-gray-200 px-3 py-1 rounded disabled:opacity-30"
              onClick={() => setIdx((i) => (i < images.length - 1 ? i + 1 : i))}
              disabled={idx === images.length - 1}
            >
              &#8594;
            </button>
          </div>
          <div className="text-center text-gray-500 mt-2 text-xs mb-4">
            Double tap image to close
          </div>
          <div className="mt-4 text-left w-full overflow-y-auto">
            <p className="text-sm font-bold mb-1">{project._id}</p>
            <div className="text-gray-700 mb-1">
              <span className="font-semibold">Title:</span> {project.title}
            </div>
            <div className="text-gray-700 mb-1">
              <span className="font-semibold">Company:</span>{' '}
              {project.companyName}
            </div>
            <div className="text-gray-700 mb-1">
              <span className="font-semibold">Client:</span> {project.client}
            </div>
            <div className="text-gray-700 mb-1">
              <span className="font-semibold">Industry:</span>{' '}
              {project.industryName}
            </div>
            <div className="text-gray-700 mb-1">
              <span className="font-semibold">Description:</span>{' '}
              {project.description}
            </div>
            <div className="text-gray-700 mb-1">
              <span className="font-semibold">Solution:</span>{' '}
              {project.solution}
            </div>
            <div className="text-gray-700 mb-1">
              <span className="font-semibold">Challenges:</span>
              <ul className="list-disc ml-6">
                {project.challenges.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetAllProject;
