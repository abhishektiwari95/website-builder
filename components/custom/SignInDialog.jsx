import React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Lookup from '@/data/Lookup'
import { Button } from '@/components/ui/button'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useContext } from 'react';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { v4 as uuid4 } from 'uuid';
import { v } from 'convex/values';
//import { CreateUser } from '@/convex/users';


function SignInDialog({openDialog,closeDialog}) {

  const {userDetail, setUserDetail} = useContext(UserDetailContext);
const createUser =useMutation(api.users.createUser);
const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    console.log(tokenResponse);
    const userInfo = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ` + tokenResponse?.access_token
        }
      }
    );

    console.log(userInfo);
const user= userInfo?.data;
await createUser({
  name: user?.name,
  email: user?.email,
  picture: user?.picture,
  uid: uuid4()
});
if(typeof window !== 'undefined') {
localStorage.setItem('user', JSON.stringify(user));
}

    setUserDetail(userInfo?.data);
    closeDialog(false);
  },
  onError: (errorResponse) => console.log(errorResponse)
});



  return (
   <Dialog open={openDialog} onOpenChange={closeDialog}> 
  
  <DialogContent>
    {/* <DialogHeader>
      <DialogTitle></DialogTitle>
      <DialogDescription >
        <div className="flex flex-col item-center justify-center gap-3">
          <h2 className='font-bold  text-center text-2xl text-white'>{Lookup.SIGNIN_HEADING}</h2>
          <p className='mt-2 text-center'>{Lookup.SIGNIN_SUBHEADING}</p>
          <Button className='bg-blue-500 text-white hover:bg-blue-400 mt-3' onClick={googleLogin}>Sign In Google </Button>
          <p>{Lookup?.SIGNIn_AGREEMENT_TEXT}</p>
        </div>
      </DialogDescription>
    </DialogHeader> */}
    <DialogHeader>
  <DialogTitle>{Lookup.SIGNIN_HEADING}</DialogTitle>
  <DialogDescription>{Lookup.SIGNIN_SUBHEADING}</DialogDescription>
</DialogHeader>

<div className="flex flex-col items-center justify-center gap-3 mt-4">
  <Button className="bg-blue-500 text-white hover:bg-blue-400" onClick={googleLogin}>
    Sign In with Google
  </Button>
  <p className="text-sm text-muted-foreground">{Lookup?.SIGNIn_AGREEMENT_TEXT}</p>
</div>

  </DialogContent>
</Dialog> 
  // <DialogTrigger asChild>  
  )
}

export default SignInDialog
