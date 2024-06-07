import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { firestoreInstance } from '../../utils/firebase';
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';

function GetAllProject() {
  const [docs, setDocs] = useState<
    {
      id: string;
      chellenges: any;
      resultStatistics: any;
      projectGoal: any;
      scopeOfWork: any;
      screens: any;
      researchLine: string;
      projectDesc: string;
      projectCompanyName: string;
      thumbnail: string;
      industryName: string;
    }[]
  >([]);

  useEffect(() => {
    const getAllProject = async () => {
      const collectionref = collection(firestoreInstance, 'projects');
      const q = query(collectionref);

      try {
        const querySnapshot = await getDocs(q);
        const allDocs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          chellenges: doc.data().chellenges || '',
          resultStatistics: doc.data().resultStatistics || '',
          projectGoal: doc.data().projectGoal || '',
          scopeOfWork: doc.data().scopeOfWork || '',
          screens: doc.data().screens || '',
          researchLine: doc.data().researchLine || '',
          projectDesc: doc.data().projectDesc || '',
          projectCompanyName: doc.data().projectCompanyName || '',
          thumbnail: doc.data().thumbnail || '',
          industryName: doc.data().industryName || '',
        }));
        console.log(allDocs);
        setDocs(allDocs);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    getAllProject();
  }, []);

  const [idForDelete, setidForDelete] = useState('');
  const [isModalOpen, setisModalOpen] = useState(false);

  const deleteProject = async () => {
    deleteDoc(doc(firestoreInstance, 'projects', idForDelete))
      .then(() => {
        setisModalOpen(false);
        setDocs(docs.filter((doc) => doc.id !== idForDelete));
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };

  return (
    <DefaultLayout>
      <div className=" shadow-default dark:border-strokedark dark:bg-boxdark">
        {isModalOpen && (
          <div className="fixed z-40 inset-0  flex items-center justify-center bg-slate-700 bg-opacity-50">
            <div className="bg-white rounded-lg p-8 max-w-md">
              <div className="flex justify-end">
                <button
                  className="text-gray-600 hover:text-gray-800"
                  onClick={() => {
                    setisModalOpen(false);
                  }}
                >
                  &times;
                </button>
              </div>
              <div className="md:flex items-center">
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                  <p className="font-bold">Delete your account</p>
                  <p className="text-sm text-gray-700 mt-1">
                    You will lose all of your data by deleting your account.
                    This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                <button
                  onClick={deleteProject}
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                >
                  Delete Account
                </button>
                <button
                  onClick={() => {
                    setisModalOpen(false);
                  }}
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {docs.map((project, index) => {
          return (
            <div
              key={index}
              className="relative m-4 bg-white  dark:border-strokedark dark:bg-boxdark"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className=" absolute right-4 top-4 lucide lucide-trash-2"
                onClick={() => {
                  setidForDelete(project.id);
                  setisModalOpen(true);
                }}
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
              <div className="m-6 mx-auto  shadow-lg rounded-lg overflow-hidden">
                <div className="m-6 ">
                  <h4 className="font-semibold mb-1">ID: {project.id}</h4>
                  <h4 className="font-semibold mb-1">Thumbnail</h4>
                  <img
                    className="w-24 h-24 mb-4 object-cover  border-2 border-gray-200"
                    src={project.thumbnail}
                    alt="Project Thumbnail"
                  />

                  <h4 className="font-semibold mb-1">screens shots</h4>
                  <div className="flex flex-row flex-wrap gap-3">
                    {project.screens.map(
                      (
                        screenshot: string | undefined,
                        index: React.Key | null | undefined,
                      ) => (
                        <img
                          key={index}
                          className="w-24 h-24 mb-4 object-cover  border-2 border-gray-2"
                          src={screenshot}
                          alt="Project Thumbnail"
                        />
                      ),
                    )}
                  </div>
                  <div className=" flex-grow mb-4">
                    <h2 className="text-xl font-bold">
                      {'industry : ' + project.industryName}
                    </h2>
                    <h3 className="text-lg text-gray-700">
                      {'CompanyName: ' + project.projectCompanyName}
                    </h3>
                    <p className="text-gray-500">
                      {'CompanyDesc : ' + project.projectCompanyName}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <div className="mb-4">
                    <h4 className="font-semibold mb-1">Project Description</h4>
                    <p className="text-gray-600">{project.projectDesc}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-1">Scope of Work</h4>
                    <ul className="text-gray-700">
                      {project.scopeOfWork.map((work: any, index: any) => (
                        <li key={index} className="flex justify-between">
                          <span>{work}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-1">Project Goals</h4>
                    <ul className="text-gray-700">
                      {project.projectGoal.map((goal: any, index: any) => (
                        <li key={index} className="flex justify-between">
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-1">Research</h4>
                    <p className="text-gray-700">{project.researchLine}</p>
                  </div>
                  <div className="mb-4 ">
                    <h4 className="font-semibold mb-1">Result Statistics</h4>
                    <ul className="text-gray-700">
                      {project.resultStatistics.map((stat: any, index: any) => (
                        <li key={index} className="flex justify-start gap-20">
                          <span>{stat.number}</span>
                          <span>{stat.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Challenges</h4>
                    <ul className="text-gray-700">
                      {project.chellenges.map((challenge: any, index: any) => (
                        <li key={index} className="flex justify-between">
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DefaultLayout>
  );
}

export default GetAllProject;
