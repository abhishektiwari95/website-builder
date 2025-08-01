"use client"
import React, { use, useEffect } from 'react'
import { useState } from 'react';
import { ThemeProvider as NextThemeProvider } from "next-themes";
import Header from "@/components/custom/Header";
import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';


function Provider({ children }) {
  const [message, setMessage] = useState();
  const [userDetail, setUserDetail] = useState();

  const convex = useConvex();

  useEffect(() => {
    IsAuthenticated();
  }, []);
  const IsAuthenticated = async () => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user'));
      // fetch from db  given the email
      const result = await convex.query(api.users.GetUser, { email: user?.email });
      setUserDetail(result);
      console.log(result);
    }

  }
  return (<div>
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY}>
      <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
        <MessagesContext.Provider
          value={{ message, setMessage }}>

          <NextThemeProvider attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange >
            <Header />

            {children}
          </NextThemeProvider>
        </MessagesContext.Provider>
      </UserDetailContext.Provider>
    </GoogleOAuthProvider>
  </div>

  )
}

export default Provider
