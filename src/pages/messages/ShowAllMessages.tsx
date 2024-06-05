import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import MsgCard from './component/MsgCard';
import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { firestoreInstance } from '../../utils/firebase';

function ShowAllMessages() {
  const [docs, setDocs] = useState<
    {
      message: string;
      createdAt: any;
      email: string;
      title: string;
      id: string;
    }[]
  >([]);
  useEffect(() => {
    const getAllProject = async () => {
      const collectionRef = collection(firestoreInstance, 'messages');
      const q = query(
        collectionRef,
        where('createdAt', '>=', Timestamp.fromDate(new Date('2024-06-01'))),
      );

      try {
        const querySnapshot = await getDocs(q);
        const allDocs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          email: doc.data().email,
          message: doc.data().message,
          createdAt: doc.data().createdAt,
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
    <div>
      <DefaultLayout>
        <div className="flex flex-row flex-wrap gap-4 ">
          {docs &&
            docs.map((data) => (
              <MsgCard
                key={data.id}
                title={data.title}
                email={data.email}
                time={data.createdAt.toDate().toString()}
                message={data.message}
              ></MsgCard>
            ))}
        </div>
      </DefaultLayout>
    </div>
  );
}

export default ShowAllMessages;
