import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { firestoreInstance } from '../../utils/firebase';
import { collection, getDocs, query } from 'firebase/firestore';

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

  return (
    <DefaultLayout>
      <div className="bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {docs.map((project) => {
          return (
            <div className="shadow-default bg-white  dark:border-strokedark dark:bg-boxdark">
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
