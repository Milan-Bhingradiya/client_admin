import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import { firestoreInstance } from '../../utils/firebase'
import { collection, doc, getDocs, query } from 'firebase/firestore'

function GetAllProject() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {

    const getAllProject = async () => {
      const collectionref = collection(firestoreInstance, "projects")
      const q = query(collectionref);

      try {
        const querySnapshot = await getDocs(q);
        const allDocs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(allDocs)
        setDocs(allDocs);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    }

    getAllProject();


  }, [])


  return (
    <DefaultLayout>
      <div>{docs.map((project) => {
        return <div>
         


         <div className="m-6 mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex p-4">
        <img className="w-24 h-24 object-cover rounded-full border-2 border-gray-200" src={project.thumbnail} alt="Project Thumbnail" />
        <div className="ml-4 flex-grow">
          <h2 className="text-xl font-bold">{ "industry : "+ project.industryName}</h2>
          <h3 className="text-lg text-gray-700">{"CompanyName: " +project.projectCompanyName}</h3>
          <p className="text-gray-500">{ "CompanyDesc : " +project.projectCompanyDesc}</p>
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
            {project.scopeOfWork.map((work, index) => (
              <li key={index} className="flex justify-between">
                <span>{work}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h4 className="font-semibold mb-1">Project Goals</h4>
          <ul className="text-gray-700">
            {project.projectGoal.map((goal, index) => (
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
            {project.resultStatistics.map((stat, index) => (
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
            {project.chellenges.map((challenge, index) => (
              <li key={index} className="flex justify-between">
                <span>{challenge}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>


        </div>
      })}</div>
    </DefaultLayout>
  )
}

export default GetAllProject