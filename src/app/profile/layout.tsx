import React from 'react';
import {useRouter} from "next/router";
const layout = ({children}:{children:React.ReactNode}) => {
  const router = useRouter();
  return (
    <>
     {children}
    </>
   
  )
}

export default layout;
