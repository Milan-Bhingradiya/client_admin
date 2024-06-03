import React, { useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import { firestoreInstance } from '../../utils/firebase';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

function SetHomePageProject() {


    const [formData, setFormData] = useState({
        first: "",
        second: "",
        third: "",

    });


    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData)// Dynamic property update
    };



    const writeData = async () => {
        console.log("just before upload")
        console.log(formData)

        const docRef = doc(firestoreInstance, "homepageprojects", "JTq65eBOyyf8mMUSkR1S");

        await updateDoc(docRef, formData)
            .then(() => {
                console.log("Document updated successfully!");
                alert("Document updated successfully!")
            })
            .catch((error) => {
                console.error("Error updating document:", error);
                alert("Error updating document")
            });
    }




    return (
        <DefaultLayout>
            <label className="mb-3 block text-black dark:text-white m-4">
                Give 3 project's Id that you want to show in home page
            </label>


            <div>
                <label className="mb-3 block text-black dark:text-white">
                    First
                </label>
                <input
                    name={"first"}
                    onChange={handleInputChange}
                    value={formData.first}
                    type="text"
                    placeholder="Default Input"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>

            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Second
                </label>
                <input
                    name={"second"}
                    onChange={handleInputChange}
                    value={formData.second}
                    type="text"
                    placeholder="Default Input"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>


            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Third
                </label>
                <input
                    name={"third"}
                    onChange={handleInputChange}
                    value={formData.third}
                    type="text"
                    placeholder="Default Input"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
            </div>



            <button
                type="button"
                onClick={() => { writeData() }}
                className="i m-4 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong">
                Button
            </button>



        </DefaultLayout>
    )
}

export default SetHomePageProject   