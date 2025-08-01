"use client";
import React from "react";
import Lookup from "@/data/Lookup";
import { ArrowRight } from "lucide-react";
import { Link } from "lucide-react";
import { useState, useContext } from "react";
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import { Colors } from "@/data/Colors";
import SignInDialog from "./SignInDialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";


function Hero() {
  const [UserInput, setUserInput] = useState();
  const { message, setMessage } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);

  const CreateWorkspace = useMutation(api.workspace.CreareWorkspace);
const router =useRouter();

  const onGenerate = async (input) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    const msg = {
      role: 'user',
      content: input
    }
    setMessage(msg);

    const workspaceId = await CreateWorkspace({
  user: userDetail._id,
  messages: [msg],
});
    console.log(workspaceId);
    router.push('/workspace/' + workspaceId);
  }

  return (
    <div className="flex flex-col items-center mt-36  xl:mt-52 gap-2">
      <h2 className="font-bold text-4xl">{Lookup.HERO_HEADING}</h2>
      <p className="text-gray-400 text-xs">{Lookup.HERO_DESC}</p>
      <div className="p-5 border rounded-xl max-w-xl w-full">
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
      <div className="flex mt-8 flex-wrap max-w-2xl items-center justify-center text-xs">
        {Lookup?.SUGGSTIONS.map((suggestion, index) => (
          <h2 key={index}
            onClick={() => onGenerate(suggestion)}
            className="p-1 px-2 border rounded-full text-xs text-gray-400 hover:text-white">{suggestion}</h2>
        ))}
      </div>
      <SignInDialog openDialog={openDialog} closeDialog={(v) => setOpenDialog(v)} />
    </div>
  );
}
 
//50:00
export default Hero