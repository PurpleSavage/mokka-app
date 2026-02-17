'use client'

import {  Toaster } from "sileo";

import AlertDialog from "../components/AlertDialog";

export default function ModalWrapper() {
 
  return (
      <>
        <Toaster 
          position="top-center" 
          offset={16}
          options={{
            fill: "#171717",
            roundness:8,
            styles: {
              description: "text-white/75!",
              title:"text-white!"
            },
            autopilot:{
              expand: 500,
              collapse: 3000,
            }
          }}
        />
        <AlertDialog/>
      </>
    )
}
