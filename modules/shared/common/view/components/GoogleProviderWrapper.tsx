'use client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ReactNode } from 'react';


interface GoogleProviderWrapperProps{
    children:ReactNode
}
const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
export default function GoogleProviderWrapper({children}:GoogleProviderWrapperProps) {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
        {children}
    </GoogleOAuthProvider>
  )
}
