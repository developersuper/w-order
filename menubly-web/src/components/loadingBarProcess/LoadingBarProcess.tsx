import React, { useEffect, useState } from "react";

const LoadingBarProcess = ({position = 'fixed'}: {position?: string}) => {
  const [process, setProcess] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      if(process < 100) {
        setProcess(process + 1);
      }
      return () => {
        clearTimeout(timer); 
      }
    }, 10);
  }, [process]);

  return (
    <>
      <div className={`${position}  ${position == 'fixed' ? 'top-0 left-0':''} w-full transition z-10`}>
        <div className="relativve">
          <div className="relative z-20 animate-pulse flex">
            <div className="bg-primary-300 h-1 transition" style={{width: process + '%'}}></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoadingBarProcess;