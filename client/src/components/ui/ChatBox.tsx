import {useForm, type SubmitHandler} from 'react-hook-form';
import axios from 'axios';
import { useEffect, useState } from 'react';


function ChatBox() {
  const {register, reset} = useForm();
  const handleSubmit  = () => {
    console.log( "Chat message");
    reset();
  }

  return (
    <div className="w-full md:w-2/3 h-full mr-4 bg-gray-800/50 rounded-xl border border-gray-600/50 flex flex-col justify-between ">
      <div className="border-b border-gray-700 h-[50px]">
        <h1 className="text-lg font-semibold p-2  text-white">Chat Box</h1>
      </div>
      <div className="h-6/7 ">
        <p className="p-4 text-gray-300">Chat functionality coming soon...</p>
      </div>
      <div className=" h-[50px] w-full flex justify-between gap-4 border py-1 px-2 rounded-lg ring-1 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-2">
        <input className="w-full border-none outline-none" type="text" {...register("query")} />
        <button onClick={handleSubmit} className="bg-blue-600 w-1/6 rounded-md cursor-pointer hover:bg-blue-700 transition-colors duration-300 ">Send</button>
      </div>
    </div>
  );
}

export default ChatBox