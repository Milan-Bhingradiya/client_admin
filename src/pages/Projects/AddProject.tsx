import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import MultiSelect from '../../components/Forms/MultiSelect';
import ImagePick from './ImagePick';

import Loading from '../../utils/Loading';

// Updated interface to match backend
interface IProject {
  title: string;
  client: string;
  description: string;
  images: string[];
  industryName: string;
  companyName: string;
  solution: string;
  challenges: string[];
}

function AddProject() {
  const func_setselectedscopeOfWork = (list: string[]) => {
    console.log(list);
  };

  // Updated formData to match backend
  const [formData, setFormData] = useState<IProject>({
    title: '',
    client: '',
    description: '',
    images: [],
    industryName: '',
    companyName: '',
    solution: '',
    challenges: [],
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData: IProject) => {
      const updatedArr: string[] = [...(prevFormData[name] as string[])];
      updatedArr[index] = value;
      return {
        ...prevFormData,
        [name]: updatedArr,
      };
    });
  };

  // Change images state to File[]
  const [images, setImages] = useState<File[]>([]);

  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setisLoading(true);
    const form = new FormData();
    form.append('title', formData.title);
    form.append('client', formData.client);
    form.append('description', formData.description);
    form.append('industryName', formData.industryName);
    form.append('companyName', formData.companyName);
    form.append('solution', formData.solution);
    // Append challenges as array
    formData.challenges.filter(Boolean).forEach((challenge) => {
      form.append('challenges[]', challenge);
    });
    // Append images as files
    images.forEach((img) => {
      form.append('images', img); // Multer expects 'images' for each file
    });
    try {
      const response = await fetch(
        'https://smit-shah-backend-80da1d71856d.herokuapp.com/addproject',
        {
          method: 'POST',
          body: form,
        },
      );
      if (response.ok) {
        alert('Project added successfully');
        setFormData({
          title: '',
          client: '',
          description: '',
          images: [],
          industryName: '',
          companyName: '',
          solution: '',
          challenges: [],
        });
        setImages([]);
      } else {
        const err = await response.json();
        alert('Failed to add project: ' + (err.error || 'Unknown error'));
      }
    } catch (error) {
      alert('Error: ' + error);
    }
    setisLoading(false);
  };

  return (
    <DefaultLayout>
      {isLoading && <Loading></Loading>}
      {!isLoading && (
        <div>
          <label className="mb-3 block text-black dark:text-white m-4">
            First img is thumbnail, Upload total 6 images, first is considered
            as thumbnail
          </label>
          <div className=" bg-slate-300 m-2 rounded-lg">
            {/* Pass setImages to ImagePick if needed */}
            <ImagePick setImages={setImages} />
          </div>
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Input Fields
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Project Title name
                </label>
                <input
                  name={'title'}
                  type="text"
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={handleInputChange}
                  value={formData.title}
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Industry name
                </label>
                <input
                  name={'industryName'}
                  type="text"
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={handleInputChange}
                  value={formData.industryName}
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Client Name
                </label>
                <input
                  name={'client'}
                  onChange={handleInputChange}
                  value={formData.client}
                  type="text"
                  placeholder="Client Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Company Name
                </label>
                <input
                  name={'companyName'}
                  onChange={handleInputChange}
                  value={formData.companyName}
                  type="text"
                  placeholder="Company Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Description
                </label>
                <textarea
                  name={'description'}
                  onChange={handleInputChange}
                  value={formData.description}
                  rows={4}
                  placeholder="Description"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Solution
                </label>
                <textarea
                  name={'solution'}
                  onChange={handleInputChange}
                  value={formData.solution}
                  rows={4}
                  placeholder="Solution"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>

              <MultiSelect
                id="multiSelect"
                wrapper={func_setselectedscopeOfWork}
              />
              <label className="mb-3 block text-black dark:text-white">
                Challenges
              </label>
              {[0, 1, 2, 3].map((idx) => (
                <div key={idx}>
                  <label className="mb-3 block text-black dark:text-white">
                    Challenge {idx + 1}
                  </label>
                  <input
                    type="text"
                    name="challenges"
                    onChange={(e) => {
                      handleArrayInputChange(e, idx);
                    }}
                    value={formData.challenges[idx] || ''}
                    placeholder={`Challenge ${idx + 1}`}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              ))}
              <hr className="border-t border-black my-6" />
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              >
                Button
              </button>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
}

export default AddProject;
