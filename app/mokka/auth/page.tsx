'use client'
import { LoginWithCredentialsDto } from '@/modules/shared/auth/application/dtos/request/login-with-credentials.dto';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { IoHomeOutline } from "react-icons/io5";
import { setSession } from '@/modules/shared/auth/store-slice/auth.slice';
import { authDIContainer } from '@/modules/shared/auth/di/auth-container.di';
import { LoginGoogleAuthDto } from '@/modules/shared/auth/application/dtos/request/login-google-auth.dto';


export default function LoginPage() {
  const [isPendingGoogle, setIsPendingGoogle] = useState(false);
  const dispatch = useDispatch()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginWithCredentialsDto>({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const onSubmit = async (data: LoginWithCredentialsDto) => {
    try {
      const response = await authDIContainer.loginUser(data)
      authDIContainer.saveDataSession(response)
      dispatch(setSession(response))
      router.replace('/mokka-panel')
    } catch (error) {
      console.error(error);
    }
  }

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      
      if (!credentialResponse.credential) {
        throw new Error('No se recibió el token de Google')
      }
      setIsPendingGoogle(true)
      const objecGoogleCredentials: LoginGoogleAuthDto={
        googletoken:credentialResponse.credential
      }
      console.log('Google token received:', credentialResponse.credential)
      const response = await authDIContainer.loginWithGoogle(objecGoogleCredentials)
      dispatch(setSession(response))
      router.replace('/mokka-panel')
    } catch (error) {
      console.error(error)
    }finally{
      setIsPendingGoogle(false)
    }
  }
  const handleGoogleError = () => {
    console.error('Google login failed');
  }

  return (
    <aside className="w-1/4 flex items-center justify-center px-4">
      <div className="space-y-4"> 
        <div className="flex justify-start">
          <Link href="/" className="flex items-center text-white gap-2"><IoHomeOutline size={18}/> Go to home</Link>
        </div>
        <h2 className="text-4xl text-white font-medium">Welcome to Mokka. Log in and start creating</h2>
        <form action="" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
           <div className="space-y-2">
            <label htmlFor="email" className="block text-white">Email</label>
            <input 
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              type="text"
              id="email"
              placeholder="example@gmail.com" 
              className="h-10 border border-gray-200 w-full rounded-lg px-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm px-2">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-white">Password</label>
            <input 
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              type="password"
              id="password"
              placeholder="your password"  
              className="h-10 border border-gray-200 w-full rounded-lg px-2"
            />
            {errors.password && (
              <p className="text-red-500 text-sm px-2">{errors.password.message}</p>
            )}
          </div>
          <button 
            disabled={isSubmitting }
            type="submit" 
            className="flex items-center justify-center w-full rounded-lg py-2 bg-pink-800 text-white 
            cursor-pointer hover:bg-pink-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Loading..." : "Log in"}
          </button>
          
        </form>
        <div className="w-full flex items-center justify-center">
          {
            isPendingGoogle ? 
            <div className="text-center text-gray-600 w-full">
              Iniciando sesión con Google...
            </div>
            :
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              text="signin_with"
              ux_mode="popup"
              auto_select={false}
              useOneTap={false}
              width="100%"
            />
          }
          
        </div>
        
        <div className="flex items-center gap-2 text-gray-300">
          <span className="grow block border border-gray-300/50"></span>
          <p>o</p>
          <span className="grow block border border-gray-300/50"></span>
        </div>
        <Link 
          href="/auth/create-account" 
          className="flex items-center justify-center w-full rounded-lg py-2 bg-pink-800 text-white 
          cursor-pointer hover:bg-pink-900 transition-colors"
        >Register with credentials</Link>
      </div>
    </aside>
  )
}
