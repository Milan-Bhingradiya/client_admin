import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import MsgCard from './component/MsgCard';

function ShowAllMessages() {
  const [docs, setDocs] = useState<
    {
      description: string;
      createdAt: string;
      email: string;
      title: string;
      _id: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(
          'https://smit-shah-backend-80da1d71856d.herokuapp.com/messages',
        );
        const data = await res.json();
        if (data.messages) {
          setDocs(data.messages);
        } else {
          setDocs([]);
        }
      } catch (error) {
        setDocs([]);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div>
      <DefaultLayout>
        <div className="flex flex-row flex-wrap gap-4 ">
          {docs &&
            docs.map((data) => (
              <MsgCard
                key={data._id}
                title={data.title}
                email={data.email}
                time={new Date(data.createdAt).toLocaleString()}
                message={data.description}
              />
            ))}
        </div>
      </DefaultLayout>
    </div>
  );
}

export default ShowAllMessages;
