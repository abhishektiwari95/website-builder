 

"use client";
import { MessagesContext } from '@/context/MessagesContext';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useContext } from 'react';
import  Colors  from "@/data/Colors";
import { UserDetailContext } from '@/context/UserDetailContext';
import Image from "next/image";
import Lookup from '@/data/Lookup';
import { ArrowRight } from 'lucide-react';
import { useState }from 'react';
import { Link } from "lucide-react";

const Chatview = () => {
  const {id} = useParams();
  const convex = useConvex();
  const {message,setMessage} = useContext(MessagesContext);
  const [UserInput, setUserInput] = useState();
const {userDetail,setUserDetail} = useContext(UserDetailContext);

  useEffect(() => {
    id && GetWorkspaceData();
  }, [id]);

  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessage(Array.isArray(result?.messages) ? result.messages : []);
  }

  return (
    <div className='relative h-[85vh] flex flex-col'>
      <div className='flex-1 overflow-y-scroll' >
        {Array.isArray(message) && message.map((msg, index) => (
          <div key={index} className='p-3 rounded-lg mb-2 flex gap-2 items-start' style={{
            backgroundColor: Colors.BACKGROUND 
          }}>
            {msg?.role == "user" &&
              <Image src={userDetail?.picture} alt='userImage'
                width={35} height={35} className='rounded-full' />}
            <h2>{msg.content}</h2>
          </div>
        ))}
      </div>
      {/* input section */}
      <div className="p-5 border rounded-xl max-w-xl w-full" style={{ BackgroundColor: Colors.BACKGROUND}}>
        <div className="flex gap-2">
          <textarea
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none text-sm"
            placeholder={Lookup.INPUT_PLACEHOLDER}
            onChange={(event) => setUserInput(event.target.value)}></textarea>
          {UserInput && <ArrowRight
            onClick={() => onGenerate(UserInput)}
            className="bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer" />}
        </div>
        <div>
          <Link className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}

export default Chatview;
