import React from 'react';

function MsgCard({ title, email, time, message }:{title:string, email:string, time:string, message:string}) {
  return (
    <div>
      <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
        <div className="p-6">
          <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {title}
          </h5>
          <h6 className="block  font-sans text-lg antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {email}
          </h6>
          <div className="text-sm mb-4">{time}</div>
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MsgCard;
