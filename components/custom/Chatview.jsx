"use client";
import { MessagesContext } from '@/context/MessagesContext';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useContext } from 'react';

const Chatview = () => {
  const {id} = useParams();
const convex = useConvex();
const {message,setMessage} =useContext(MessagesContext);

useEffect(() => {
  id&&GetWorkspaceData();
}, [id]);

// used to Get Workspace data using the workspace id
  const GetWorkspaceData=async()=>{
    const result= await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,});
      setMessage(result?.messages);
      console.log(result)
  }
  return (
    <div>
      chatview
    </div>
  )
}

export default Chatview
