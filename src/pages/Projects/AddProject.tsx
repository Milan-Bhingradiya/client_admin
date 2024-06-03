import React, { useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import MultiSelect from '../../components/Forms/MultiSelect'
import ImagePick from './ImagePick'

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { firestoreInstance, storage } from "../../utils/firebase";
import { v4 as generateId } from 'uuid';
import { mystore } from '../../store/myStore';
import { addDoc, collection } from 'firebase/firestore';


function AddProject() {

  const [selectedscopeOfWork, setselectedscopeOfWork] = useState([])

  const func_setselectedscopeOfWork = (list: any) => {
    setselectedscopeOfWork(list)
    console.log(list)
  }

  const [formData, setFormData] = useState({
    thumbnail: "",
    industryName: "",
    projectCompanyName: "",
    projectCompanyDesc: "",
    projectDesc: "",
    scopeOfWorkLine: "", // Use camelCase for consistency
    scopeOfWork: selectedscopeOfWork, // Use camelCase for consistency
    projectGoalLine: "", // Use camelCase for consistency
    projectGoal: [],  // Use camelCase for consistency
    screens: [],
    researchLine: "",
    resultLine: "",
    chellenges: [],
    resultStatistics: [{ number: '', description: '' }, { number: '', description: '' }, { number: '', description: '' },]
  });



  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData)// Dynamic property update
  };

  const handleArrayInputChange = (event: any, index: number) => {
    const { name, value } = event.target;
    setFormData((prevFormData: any) => {
      const updatedGoals: any[] = [...prevFormData[name]];
      updatedGoals[index] = value;
      return {
        ...prevFormData,
        [name]: updatedGoals
      };
    });
  };

  const handleArrayOfObjectInputChange = (event: any, index: number) => {
    const { name, value } = event.target;
    setFormData((prevFormData: any) => {
      const updatedGoals: any[] = [...prevFormData["resultStatistics"]];
      updatedGoals[index][name] = value;
      return {
        ...prevFormData,
        [name]: updatedGoals
      };
    });
  };


  const imgdata = mystore((state: any) => state.imgdata)
  const [isImgUploaded, setisImgUploaded] = useState(false)

  const uploadimage = async (projectname: string) => {
    console.log("upload img call")

    const files = imgdata // Access all selected files
    // const  files= e.target[0].files;
    if (!files.length) {
      return; // No files selected, handle the case
    }

    const uploadPromises = []; // Array to store upload promises

    for (const file of files) {
      const storageRef = ref(storage, `${projectname}/${generateId()}-${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadPromises.push(new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            // Optionally update a progress bar or UI element here
            console.log(`File ${file.name}: ${progress}% uploaded`);
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                resolve(downloadURL); // Resolve promise with download URL
              })
              .catch((error) => {
                reject(error); // Reject promise on download URL error
              });
          }
        );
      }));
    }

    try {
      const downloadURLs = await Promise.all(uploadPromises);
      // Wait for all uploads
      // setFormData((prev: any) => {
      //   return {
      //     ...prev,
      //     thumbnail: downloadURLs[0] as string,
      //     screens: downloadURLs.splice(1)
      //   }
      // })

      // upload data to firestore..
      formData["thumbnail"] = downloadURLs[0] as string;
      formData["screens"] = downloadURLs.splice(1) as string[];

      writeData()

      return true;
      console.log('All files uploaded successfully:', downloadURLs);
    } catch (error) {
      console.error('Upload failed:', error);
      alert(error)
      return false;
    }
  };



  const handleSubmit = async (e: any) => {

    e.preventDefault()
    console.log("click")
    console.log(imgdata)
    const uploaddone = await uploadimage(formData.projectCompanyName);

    if (uploaddone) {
      // setisImgUploaded(true);

      // submit data aya thumbnail khali jay chhe..
      // console.log("now we call save data")
      // console.log(formData)
      // writeData();
    } else {
      alert(
        "fail to upload img try again"
      )


    }
  }


  const writeData = async () => {
    console.log("just before upload")
    console.log(formData)
    const result = await addDoc(collection(firestoreInstance, "projects"), formData)
    console.log(result)
  }


  return (
    <DefaultLayout>

      <div>

        <label className="mb-3 block text-black dark:text-white m-4">
          First img is thumnnail Upload images only 4
        </label>
        <div className=' bg-slate-300 m-2 rounded-lg'>

          <ImagePick></ImagePick>
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
                Industry name
              </label>
              <input
                name={"industryName"}
                type="text"
                placeholder="Default Input"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                onChange={handleInputChange}
                value={formData.industryName}
              />
            </div>

            <div>
              <label className="mb-3 block text-black dark:text-white">
                Company Name
              </label>
              <input
                name={"projectCompanyName"}
                onChange={handleInputChange}
                value={formData.projectCompanyName}
                type="text"
                placeholder="Default Input"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-3 block text-black dark:text-white">
                Company Desc
              </label>
              <textarea
                name={"projectCompanyDesc"}
                onChange={handleInputChange}
                value={formData.projectCompanyDesc}
                rows={6}
                placeholder="Default textarea"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>

            <div>
              <label className="mb-3 block text-black dark:text-white">
                Project Desc
              </label>
              <textarea
                name={"projectDesc"}
                onChange={handleInputChange}
                value={formData.projectDesc}
                rows={6}
                placeholder="Default textarea"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
            </div>

            <hr className="border-t border-black my-6" />
            <MultiSelect id="multiSelect" wrapper={func_setselectedscopeOfWork} />

            <div>
              <label className="mb-3 block text-black dark:text-white">
                Scope of Work line
              </label>
              <input
                name="scopeOfWorkLine"
                onChange={handleInputChange}
                value={formData.scopeOfWorkLine}
                type="text"
                placeholder="Default Input"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>



            <hr className="border-t border-black my-6" />
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Project Goal Line
              </label>
              <input
                name="projectGoalLine"
                onChange={handleInputChange}
                value={formData.projectGoalLine}
                type="text"
                placeholder="Default Input"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <label className="mb-3 block text-black dark:text-white">
              Project Goal that client want
            </label>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Project Goal 1
              </label>
              <input
                name="projectGoal"
                onChange={(e) => {
                  handleArrayInputChange(e, 0)
                }}
                value={formData.projectGoal[0]}
                type="text"
                placeholder="Default Input"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-3 block text-black dark:text-white">
                Project Goal 2
              </label>
              <input
                name="projectGoal"
                onChange={(e) => {
                  handleArrayInputChange(e, 1)
                }}
                value={formData.projectGoal[1]}
                type="text"
                placeholder="Default Input"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <div>
              <label className="mb-3 block text-black dark:text-white">
                Project Goal 2
              </label>
              <input
                name="projectGoal"
                onChange={(e) => {
                  handleArrayInputChange(e, 2)
                }}
                value={formData.projectGoal[2]}
                type="text"
                placeholder="Default Input"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>


            <div>
              <label className="mb-3 block text-black dark:text-white">
                Research Line
              </label>
              <input
                name="researchLine"

                onChange={handleInputChange}
                value={formData.researchLine}
                type="text"
                placeholder="Default Input"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>




            <hr className="border-t border-black my-6" />
            <label className="mb-3 block text-black dark:text-white">
              Chellenges
            </label>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                first Chellenge
              </label>
              <input
                type="text"
                name="chellenges"
                onChange={(e) => {
                  handleArrayInputChange(e, 0)
                }}
                value={formData.chellenges[0]}
                placeholder="Default Input"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                second Chellenge
              </label>
              <input
                type="text"
                name="chellenges"
                onChange={(e) => {
                  handleArrayInputChange(e, 1)
                }}
                value={formData.chellenges[1]}
                placeholder="Default Input"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                third Chellenge
              </label>
              <input
                type="text"
                name="chellenges"
                onChange={(e) => {
                  handleArrayInputChange(e, 2)
                }}
                value={formData.chellenges[2]}
                placeholder="Default Input"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>



            <hr className="border-t border-black my-6" />

            <div>
              <label className="mb-3 block text-black dark:text-white">
                Result Line
              </label>
              <input
                name={"resultLine"}
                onChange={handleInputChange}
                value={formData.resultLine}
                type="text"
                placeholder="Default Input"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>

            <label className="mb-3 block text-black dark:text-white">
              Result
            </label>
            <div className='flex flex-row'>
              <div>
                {/* left */}
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    first
                  </label>
                  <input
                    name="description"
                    onChange={(e) => {
                      handleArrayOfObjectInputChange(e, 0)
                    }}
                    value={formData.resultStatistics[0]!.description}
                    type="text"
                    placeholder="Default Input"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    second
                  </label>
                  <input
                    name="description"
                    onChange={(e) => {
                      handleArrayOfObjectInputChange(e, 1)
                    }}
                    value={formData.resultStatistics[1]!.description}
                    type="text"
                    placeholder="Default Input"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    third
                  </label>
                  <input
                    name="description"
                    onChange={(e) => {
                      handleArrayOfObjectInputChange(e, 2)
                    }}
                    value={formData.resultStatistics[2]!.description}
                    type="text"
                    placeholder="Default Input"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>

              {/* right */}
              <div className='ml-5'>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    number
                  </label>
                  <input
                    name="number"
                    onChange={(e) => {
                      handleArrayOfObjectInputChange(e, 0)
                    }}
                    value={formData.resultStatistics[0]!.number}
                    type="text"
                    placeholder="Default Input"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    number
                  </label>
                  <input
                    name="number"
                    onChange={(e) => {
                      handleArrayOfObjectInputChange(e, 1)
                    }}
                    value={formData.resultStatistics[1]!.number}
                    type="text"
                    placeholder="Default Input"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    number
                  </label>
                  <input
                    name="number"
                    onChange={(e) => {
                      handleArrayOfObjectInputChange(e, 2)
                    }}
                    value={formData.resultStatistics[2]!.number}
                    type="text"
                    placeholder="Default Input"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
              Button
            </button>




          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default AddProject