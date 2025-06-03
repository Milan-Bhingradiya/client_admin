import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Loading from '../../utils/Loading';

function SetHomePageProject() {
  const [formData, setFormData] = useState({
    project1: '',
    project2: '',
    project3: '',
  });
  const [isLoading, setisLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    // Fetch current home projects on mount
    const fetchHomeProjects = async () => {
      setisLoading(true);
      try {
        const response = await fetch(
          'https://smit-shah-backend-80da1d71856d.herokuapp.com/home-projects',
        );
        const data = await response.json();
        if (data.projects && data.projects.length > 0) {
          setFormData({
            project1: data.projects[0]?._id || '',
            project2: data.projects[1]?._id || '',
            project3: data.projects[2]?._id || '',
          });
        } else {
          setFormData({ project1: '', project2: '', project3: '' });
        }
      } catch (error) {
        setFormData({ project1: '', project2: '', project3: '' });
      }
      setFetched(true);
      setisLoading(false);
    };
    fetchHomeProjects();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const writeData = async () => {
    setisLoading(true);
    try {
      const response = await fetch(
        'https://smit-shah-backend-80da1d71856d.herokuapp.com/set-home-projects',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        },
      );
      const data = await response.json();
      if (response.ok) {
        alert('Updated successfully!');
      } else {
        alert('Error: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      alert('Error updating home projects: ' + error);
    }
    setisLoading(false);
  };

  return (
    <DefaultLayout>
      {isLoading && <Loading />}
      {!isLoading && fetched && (
        <div>
          <label className="mb-3 block text-black dark:text-white m-4">
            Give 3 project IDs that you want to show on the home page
          </label>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              First
            </label>
            <input
              name={'project1'}
              onChange={handleInputChange}
              value={formData.project1 || 'none'}
              type="text"
              placeholder="Project 1 ID"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Second
            </label>
            <input
              name={'project2'}
              onChange={handleInputChange}
              value={formData.project2 || 'none'}
              type="text"
              placeholder="Project 2 ID"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Third
            </label>
            <input
              name={'project3'}
              onChange={handleInputChange}
              value={formData.project3 || 'none'}
              type="text"
              placeholder="Project 3 ID"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <button
            type="button"
            onClick={writeData}
            className="m-4 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          >
            Save
          </button>
        </div>
      )}
    </DefaultLayout>
  );
}

export default SetHomePageProject;
