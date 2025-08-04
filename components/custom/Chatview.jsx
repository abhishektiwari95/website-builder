"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { api } from "@/convex/_generated/api";
import { useConvex, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useContext } from "react";
import Colors from "@/data/Colors";
import { UserDetailContext } from "@/context/UserDetailContext";
import Image from "next/image";
import Lookup from "@/data/Lookup";
import { ArrowRight, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { Link } from "lucide-react";
 
import axios from "axios";
import Prompt from "@/data/Prompt";


const Chatview = () => {
  const { id } = useParams();
  const convex = useConvex();
  const { message, setMessage } = useContext(MessagesContext);
  const [UserInput, setUserInput] = useState();
  const { userDetail, setUserDetail } = useContext(UserDetailContext); 
  const UpdateMessages =useMutation(api.workspace.UpdateMessages);
const [loading,setLoading] = useState(false);
  useEffect(() => {
    id && GetWorkspaceData();
  }, [id]);

  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessage(Array.isArray(result?.messages) ? result.messages : []);
  };

  useEffect(() => {
  if (Array.isArray(message) && message.length > 0) {
    const role = message[message.length - 1].role;
    if (role === "user") {
      GetAiResponse();
    }
  }
}, [message]);

  
// const GetAiResponse = async () => {

//   try {
//     setLoading(true);
//    const PORMPT = JSON.stringify(message) + Prompt.CHAT_PROMPT;

//     const result = await axios.post("/api/ai-chat", { prompt: PORMPT });
//     console.log("AI Response: ", result.data?.result);
//     const AiResp ={
//       role:'ai',
//       content: result.data?.result
//     }
//     setMessage(prev=>[...prev,AiResp])
//     await UpdateMessages ({
//       messages:[...message,AiResp],
//       workspaceId:id
//     })
//   } catch (error) {
//     console.error("AI Chat API error:", error);
//     setLoading(false);
//   }
// };

const GetAiResponse = async () => {
  try {
    setLoading(true);
    const PORMPT = JSON.stringify(message) + Prompt.CHAT_PROMPT;

    const result = await axios.post("/api/ai-chat", { 
      prompt: PORMPT 
    }).catch(error => {
      console.error("API Error:", error.response?.data || error.message);
      throw error;
    });

    const AiResp = {
      role: 'ai',
      content: result.data?.result || "No response from AI"
    };
    
    const updatedMessages = [...message, AiResp];
    
    setMessage(updatedMessages);
    await UpdateMessages({
      messages: updatedMessages,
      workspaceId: id
    });

  } catch (error) {
    console.error("AI Chat API error:", error);
    const errorResp = {
      role: 'ai',
      content: "Error processing request"
    };
    setMessage(prev => [...prev, errorResp]);
  } finally {
    setLoading(false);
  }
};
const onGenerate = (input)=>{
  setMessage(prev =>[...prev,{
    role:'user',
    content: input
  }])
  setUserInput('')
}
  return (
    <div className="relative h-[85vh] flex flex-col">
      <div className="flex-1 overflow-y-scroll scrollbar-hide">
        {Array.isArray(message) &&
          message.map((msg, index) => (
            <div
              key={index}
              className="p-3 rounded-lg mb-2 flex gap-2 items-start"
              style={{
                backgroundColor: Colors.BACKGROUND,
              }}
            >
              {msg?.role == "user" && (
                <Image
                  src={userDetail?.picture}
                  alt="userImage"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              )}
              <h2>{msg.content}</h2>
            
            </div>
          ))}
           {loading&& <div className="p-3 rounded-lg mb-2 flex gap-2 items-start leading-7" 
           style={{ backgroundColor: Colors.CHAT_BACKGROUND }}
           ><Loader2Icon className="animate-spin" />
              <h2>Generating response...</h2></div>}
      </div>
      {/* input section */}
      <div
        className="p-5 border rounded-xl max-w-xl w-full"
        style={{ BackgroundColor: Colors.BACKGROUND }}
      >
        <div className="flex gap-2">
          <textarea
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none text-sm"
            placeholder={Lookup.INPUT_PLACEHOLDER} value={(UserInput)}
            onChange={(event) => setUserInput(event.target.value)}
          ></textarea>
          {UserInput && (
            <ArrowRight
              onClick={() => onGenerate(UserInput)}
              className="bg-blue-500 p-2 h-8 w-8 rounded-md cursor-pointer"
            />
          )}
        </div>
        <div>
          <Link className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default Chatview;
